import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  setDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  serverTimestamp, 
  query, 
  where, 
  getDocFromServer 
} from "firebase/firestore";
import firebaseConfig from "../firebase-applet-config.json";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Google Sheets API provider scope configuration
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/spreadsheets");

// Caching access token in memory purely
let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Initialize Auth Listener - required to detect the logged-in state of the administrator
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign-In with popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Failed to retrieve an OAuth access token from Google Sign-in.");
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error("Google Authentication error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Log Out
export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// Check if access token is available in memory cached
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

// Structured Firestore Error Handler as specified in the rules
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error("Firestore Exception:", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validation test connection on load
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
  } catch (error) {
    if (error instanceof Error && error.message.includes("offline")) {
      console.warn("Please check your Firebase configuration: client is offline.");
    }
  }
}

// Interface for Inquiry Submission
export interface InquiryData {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  goal: string;
  message: string;
  source: "contact" | "booking";
}

// Create Inquiry Record in Firestore (Public API)
export async function submitInquiry(data: InquiryData): Promise<string> {
  const uniqueId = "inq_" + Date.now() + "_" + Math.random().toString(36).substring(2, 11);
  const path = `inquiries/${uniqueId}`;
  
  try {
    const docRef = doc(db, "inquiries", uniqueId);
    await setDoc(docRef, {
      id: uniqueId,
      name: data.name,
      phone: data.phone,
      email: data.email || "",
      city: data.city || "",
      goal: data.goal,
      message: data.message,
      source: data.source,
      syncedToSheets: false,
      createdAt: serverTimestamp()
    });
    return uniqueId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    throw error;
  }
}

// Fetch Un-synced Inquiries from Firestore (Admin API)
export async function fetchUnsyncedInquiries(): Promise<any[]> {
  const path = "inquiries";
  try {
    const q = query(
      collection(db, "inquiries"),
      where("syncedToSheets", "==", false)
    );
    const snapshot = await getDocs(q);
    // Map data
    const inquiries = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }) as any);
    
    // Sort in memory by createdAt to avoid compound index mandate
    inquiries.sort((a: any, b: any) => {
      const timeA = a.createdAt?.seconds || 0;
      const timeB = b.createdAt?.seconds || 0;
      return timeA - timeB;
    });
    
    return inquiries;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    throw error;
  }
}

// Sync unsynced inquiries to the user's specific spreadsheet
export async function syncInquiriesToGoogleSheets(
  accessToken: string,
  inquiries: any[]
): Promise<{ successKeys: string[]; failedKeys: string[] }> {
  const spreadsheetId = "1SEo7_8QVEs1sYMa30IAN5Ss7_kqr209xvI-EFQJbj_A";
  
  if (inquiries.length === 0) {
    return { successKeys: [], failedKeys: [] };
  }

  // Format spreadsheet rows neatly
  const rows = inquiries.map((inq) => {
    const dateStr = inq.createdAt ? new Date(inq.createdAt.seconds * 1000).toLocaleString("en-US", {
      timeZone: "Asia/Kolkata" // Indian Standard Time
    }) : new Date().toLocaleString();
    
    return [
      inq.id,
      dateStr,
      inq.name,
      inq.phone,
      inq.email || "—",
      inq.city || "—",
      inq.goal,
      inq.message,
      inq.source === "booking" ? "Consultation Modal" : "Contact Page"
    ];
  });
  
  try {
    // Append to Sheet1 (range A:I)
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:I:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: rows,
        }),
      }
    );
    
    if (!response.ok) {
      const errText = await response.text();
      // If Sheet1 append fails, try the generic A:I append which appends to the default tab
      if (response.status === 400) {
        const retryResponse = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:I:append?valueInputOption=USER_ENTERED`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              values: rows,
            }),
          }
        );
        if (!retryResponse.ok) {
          const retryErr = await retryResponse.text();
          throw new Error(`Google Sheets API Error (${retryResponse.status}): ${retryErr}`);
        }
      } else {
        throw new Error(`Google Sheets API Error (${response.status}): ${errText}`);
      }
    }
    
    // Update successful items' sync status in Firestore
    const successKeys: string[] = [];
    const failedKeys: string[] = [];
    
    for (const inq of inquiries) {
      try {
        const docRef = doc(db, "inquiries", inq.id);
        await updateDoc(docRef, { syncedToSheets: true });
        successKeys.push(inq.id);
      } catch (err) {
        console.error("Firestore status marking failed for ID:", inq.id, err);
        failedKeys.push(inq.id);
      }
    }
    
    return { successKeys, failedKeys };
  } catch (error) {
    console.error("Google Sheets synchronization crashed:", error);
    throw error;
  }
}
