import React, { useState, useEffect } from "react";
import { 
  X, 
  Database, 
  LogOut, 
  RefreshCw, 
  Trash2, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle,
  FileSpreadsheet,
  Search,
  Users
} from "lucide-react";
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  fetchUnsyncedInquiries, 
  syncInquiriesToGoogleSheets,
  db
} from "../firebase";
import { 
  collection, 
  getDocs, 
  deleteDoc, 
  doc 
} from "firebase/firestore";
import { User } from "firebase/auth";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [allInquiries, setAllInquiries] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const ADMIN_EMAIL = "aaradhyaayurwellness@gmail.com";
  const SPREADSHEET_LINK = "https://docs.google.com/spreadsheets/d/1SEo7_8QVEs1sYMa30IAN5Ss7_kqr209xvI-EFQJbj_A/edit?usp=sharing";

  useEffect(() => {
    if (!isOpen) return;
    
    // Initialize Auth Listener as defined in the workspace-integration skill
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setLoading(false);
        loadInquiries();
      },
      () => {
        setUser(null);
        setToken(null);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isOpen]);

  // Load inquiries from Firestore
  const loadInquiries = async () => {
    try {
      const colRef = collection(db, "inquiries");
      const snapshot = await getDocs(colRef);
      const docs = snapshot.docs.map(d => ({
        ...d.data(),
        id: d.id
      }) as any);

      // Sort in memory by date (descending to show newest first in table)
      docs.sort((a: any, b: any) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });

      setAllInquiries(docs);
    } catch (err: any) {
      console.error("Failed to load inquiries:", err);
      setStatusMessage({ text: "Failed to download inquiries from database.", type: "error" });
    }
  };

  if (!isOpen) return null;

  const handleLogin = async () => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        await loadInquiries();
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setStatusMessage({ text: "Authentication collapsed. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setAllInquiries([]);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Perform synchronization logic
  const handleSync = async () => {
    if (!token) return;
    setIsSyncing(true);
    setStatusMessage(null);

    // Filter only un-synced inquiries
    const unsynced = allInquiries.filter(inq => !inq.syncedToSheets);

    if (unsynced.length === 0) {
      setStatusMessage({ text: "All inquiries are already synchronized with Google Sheets!", type: "info" });
      setIsSyncing(false);
      return;
    }

    try {
      const { successKeys } = await syncInquiriesToGoogleSheets(token, unsynced);
      setStatusMessage({ 
        text: `Successfully synchronized ${successKeys.length} inquiry details to Google Sheets!`, 
        type: "success" 
      });
      // Re-load to see the updated synced status
      await loadInquiries();
    } catch (err: any) {
      console.error("Sheets synchronization error:", err);
      setStatusMessage({ 
        text: "Sync Failed: " + (err.message || "Google Sheets API rejection. Please verify Google Drive file access permissions match the account."), 
        type: "error" 
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Safe delete with double-confirmation modal (Destructive Action Rule)
  const handleDelete = async (id: string, name: string) => {
    const isDoubleConfirmed = window.confirm(
      `🔒 SECURITY CHECK: Are you absolutely certain you want to permanently delete the inquiry from "${name}"? This action modifies the database and is irreversible.`
    );
    if (!isDoubleConfirmed) return;

    try {
      const docRef = doc(db, "inquiries", id);
      await deleteDoc(docRef);
      setStatusMessage({ text: "Inquiry permanently deleted.", type: "success" });
      await loadInquiries();
    } catch (err: any) {
      console.error("Delete failed:", err);
      setStatusMessage({ text: "Delete failed: " + (err.message || "Insufficient permissions."), type: "error" });
    } finally {
      setConfirmDeleteId(null);
    }
  };

  // Filtering based on search query
  const filteredInquiries = allInquiries.filter(inq => {
    const query = searchQuery.toLowerCase();
    return (
      (inq.name || "").toLowerCase().includes(query) ||
      (inq.phone || "").toLowerCase().includes(query) ||
      (inq.email || "").toLowerCase().includes(query) ||
      (inq.message || "").toLowerCase().includes(query) ||
      (inq.goal || "").toLowerCase().includes(query) ||
      (inq.city || "").toLowerCase().includes(query)
    );
  });

  const unsyncedCount = allInquiries.filter(inq => !inq.syncedToSheets).length;

  return (
    <div id="admin-panel-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#020803]/90 backdrop-blur-md"
        onClick={() => {
          window.location.hash = "";
          onClose();
        }}
      />

      <div className="relative w-full max-w-5xl bg-stone-950 text-white rounded-2xl overflow-hidden shadow-2xl border border-gold-300/15 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4.5 border-b border-gold-300/10 bg-forest-950/60">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-gold-300 animate-pulse" />
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-gold-200 leading-tight">Administrative Portal</h3>
              <p className="text-[10px] text-stone-400 capitalize">Aradhya Ayur Wellness database &amp; Sheets alignment</p>
            </div>
          </div>
          <button 
            onClick={() => {
              window.location.hash = "";
              onClose();
            }}
            className="p-1 rounded-full text-stone-400 hover:text-gold-200 hover:bg-white/5 transition-colors"
            id="close-admin-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Panel */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">
          
          {loading ? (
            <div className="py-24 text-center">
              <span className="inline-block w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-stone-400 text-xs mt-3 font-semibold tracking-wider uppercase">Validating authentication...</p>
            </div>
          ) : !user ? (
            // Sign in view if not logged in
            <div className="py-12 max-w-sm mx-auto text-center space-y-6">
              <div className="h-16 w-16 bg-gold-400/10 border border-gold-300/20 text-gold-300 flex items-center justify-center rounded-full mx-auto shadow-lg shadow-gold-500/5">
                <Database className="w-7 h-7" />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-serif text-xl text-gold-200">Staff Credentials Check</h4>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Authentication requires login with the designated wellness expert email account to access inquiries and synchronize records.
                </p>
              </div>

              {/* Status information */}
              {statusMessage && (
                <div className="p-3.5 rounded-lg border border-red-900/30 bg-red-950/30 text-red-200 text-xs font-medium">
                  {statusMessage.text}
                </div>
              )}

              {/* Official Google Styled Button as mandated by workspace skill guidelines */}
              <button 
                onClick={handleLogin}
                className="gsi-material-button w-full flex items-center justify-center transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                id="google-sheets-signin-btn"
                style={{
                  background: "#ffffff",
                  border: "1px solid #dadce0",
                  borderRadius: "8px",
                  color: "#3c4043",
                  fontFamily: '"Google Sans",Roboto,Arial,sans-serif',
                  fontSize: "14px",
                  fontWeight: "500",
                  height: "44px",
                  letterSpacing: "0.25px",
                  padding: "0 12px",
                  position: "relative",
                  width: "100%"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: "block", width: "18px", height: "18px" }}>
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  </svg>
                  <span>Sign in with Google Account</span>
                </div>
              </button>
            </div>
          ) : user.email !== ADMIN_EMAIL ? (
            // Unauthorized Account View
            <div className="py-12 max-w-sm mx-auto text-center space-y-6 animate-in fade-in duration-300">
              <div className="h-14 w-14 bg-red-500/10 border border-red-300/20 text-red-400 flex items-center justify-center rounded-full mx-auto">
                <AlertCircle className="w-7 h-7" />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-serif text-lg text-red-300">Access Restricted</h4>
                <p className="text-stone-300 text-xs leading-relaxed">
                  Google account <strong className="text-white">{user.email}</strong> is unauthorized.<br />
                  Database records and Spreadsheet mutations are strictly gated for the executive email: <strong className="text-gold-200">{ADMIN_EMAIL}</strong>.
                </p>
              </div>

              <button 
                onClick={handleSignOut}
                className="w-full py-2.5 px-4 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign in with Another Account
              </button>
            </div>
          ) : (
            // Authenticated Admin Dashboard View
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Status Message */}
              {statusMessage && (
                <div className={`p-4 border rounded-xl flex items-start gap-3 ${
                  statusMessage.type === "success" 
                    ? "bg-emerald-950/40 border-emerald-500/25 text-emerald-300"
                    : statusMessage.type === "info"
                    ? "bg-stone-900 border-stone-800 text-gold-300"
                    : "bg-red-950/40 border-red-500/25 text-red-300"
                }`}>
                  {statusMessage.type === "success" ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-xs sm:text-sm font-medium leading-relaxed">{statusMessage.text}</p>
                </div>
              )}

              {/* Top Quick Stats Desk */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Active user credentials state */}
                <div className="p-4 bg-forest-950/60 border border-gold-300/10 rounded-xl space-y-1">
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Active Administrator</div>
                  <div className="text-gold-100 font-serif text-sm font-medium truncate">{user.email}</div>
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-stone-400">Authenticated &amp; Secure</span>
                  </div>
                </div>

                {/* Database leads counter */}
                <div className="p-4 bg-forest-950/60 border border-gold-300/10 rounded-xl space-y-1 relative">
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Inquiries Database</div>
                  <div className="text-white font-serif text-2xl font-bold">{allInquiries.length} Inquiries</div>
                  <div className="text-[10px] text-stone-400">Saved securely in Firestore</div>
                </div>

                {/* Sheets synchronization counter */}
                <div className="p-4 bg-forest-950/60 border border-gold-300/10 rounded-xl space-y-1 relative">
                  <div className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Un-synchronized Leads</div>
                  <div className="text-gold-300 font-serif text-2xl font-bold flex items-baseline gap-2">
                    <span>{unsyncedCount} Pending</span>
                    {unsyncedCount > 0 && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
                  </div>
                  <div className="text-[10px] text-stone-400">Require spreadsheet sync</div>
                </div>

              </div>

              {/* Action Board (Sync button, Sheets Link, Sign out) */}
              <div className="p-5 bg-gradient-to-r from-forest-900 to-forest-950 border border-gold-300/15 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1.5 text-center md:text-left">
                  <h4 className="font-serif text-gold-200 text-base font-semibold uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                    Google Sheets Synchronizer
                  </h4>
                  <p className="text-[11px] text-stone-300 leading-relaxed max-w-lg">
                    Appends pending inquiry details (Name, WhatsApp, Location, Focus wellness topic, Challenges) to your master spreadsheet instantly.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <a 
                    href={SPREADSHEET_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-lg border border-gold-300/20 hover:bg-gold-500/5 text-stone-200 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    Open Google Sheet
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button 
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="py-2.5 px-5 rounded-lg bg-gradient-to-r from-emerald-500 hover:from-emerald-400 to-emerald-600 hover:to-emerald-500 text-stone-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                  >
                    {isSyncing ? (
                      <span className="inline-block w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    Sync {unsyncedCount > 0 ? `${unsyncedCount} leads` : ""} to sheets
                  </button>
                </div>
              </div>

              {/* Search and Table block */}
              <div className="space-y-3.5">
                
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold-300" />
                    <span className="font-serif text-gold-200 text-sm uppercase tracking-wider font-semibold">Submitted Inquiries List</span>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-stone-500" />
                    <input 
                      type="text" 
                      placeholder="Search name, phone, topics..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-1.8 bg-stone-900/60 border border-gold-300/10 focus:border-gold-300/40 rounded-lg text-stone-200 placeholder-stone-500 text-xs focus:outline-none focus:ring-0 transition-colors"
                    />
                  </div>
                </div>

                {/* Table frame */}
                <div className="border border-gold-300/10 rounded-xl overflow-hidden bg-stone-900/30 overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-forest-950/80 text-stone-300 uppercase tracking-wider text-[10px] font-semibold border-b border-gold-300/10">
                        <th className="py-3 px-4">Submitted At</th>
                        <th className="py-3 px-4">Visitor Particulars</th>
                        <th className="py-3 px-4">WhatsApp No.</th>
                        <th className="py-3 px-4">Focus Wellness Topic</th>
                        <th className="py-3 px-4">Wellness Challenge / Notes</th>
                        <th className="py-3 px-4 text-center">Sheets Sync</th>
                        <th className="py-3 px-4 text-right">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold-300/5">
                      {filteredInquiries.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-stone-500 text-xs">
                            No inquiries recorded in this portal matching your request.
                          </td>
                        </tr>
                      ) : (
                        filteredInquiries.map((inq) => {
                          const formattedDate = inq.createdAt 
                            ? new Date(inq.createdAt.seconds * 1000).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit"
                              })
                            : "N/A";
                          
                          return (
                            <tr key={inq.id} className="hover:bg-white/2 transition-colors text-stone-300 align-top">
                              {/* Date & Source */}
                              <td className="py-4.5 px-4 whitespace-nowrap">
                                <span className="font-semibold text-stone-200 block">{formattedDate}</span>
                                <span className={`text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 mt-1 block w-fit rounded ${
                                  inq.source === "booking" 
                                    ? "bg-gold-400/10 text-gold-300 border border-gold-300/20" 
                                    : "bg-forest-500/10 text-emerald-300 border border-emerald-400/20"
                                }`}>
                                  {inq.source === "booking" ? "Booking Modal" : "Contact page"}
                                </span>
                              </td>
                              {/* Name, Email, Location */}
                              <td className="py-4.5 px-4">
                                <div className="font-medium text-white">{inq.name}</div>
                                {inq.email && <div className="text-[10px] text-stone-400 mt-0.5 truncate max-w-[150px]">{inq.email}</div>}
                                {inq.city && <div className="text-[10px] text-gold-300/70 mt-0.5">📍 {inq.city}</div>}
                              </td>
                              {/* WhatsApp Direct Line */}
                              <td className="py-4.5 px-4 whitespace-nowrap">
                                <a 
                                  href={`https://wa.me/91${inq.phone.replace(/[^0-9]/g, "")}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-stone-300 hover:text-emerald-400 font-semibold underline underline-offset-2 flex items-center gap-1.5"
                                >
                                  💬 {inq.phone}
                                </a>
                              </td>
                              {/* Goal label */}
                              <td className="py-4.5 px-4">
                                <div className="text-gold-200 font-medium leading-relaxed max-w-[160px]">{inq.goal}</div>
                              </td>
                              {/* Message detail */}
                              <td className="py-4.5 px-4 text-stone-300">
                                <p className="leading-relaxed text-stone-400 text-xs line-clamp-3 hover:line-clamp-none transition-all duration-300 max-w-[280px]" style={{ whiteSpace: "pre-line" }}>
                                  {inq.message}
                                </p>
                              </td>
                              {/* Synced banner */}
                              <td className="py-4.5 px-4 text-center whitespace-nowrap">
                                <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold px-2 py-0.8 rounded-full ${
                                  inq.syncedToSheets 
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-400/30" 
                                    : "bg-amber-500/10 text-amber-400 border border-amber-400/30"
                                }`}>
                                  {inq.syncedToSheets ? "Synced ✔" : "Pending ✖"}
                                </span>
                              </td>
                              {/* Delete button (destructive) */}
                              <td className="py-4.5 px-4 text-right">
                                <button
                                  onClick={() => handleDelete(inq.id, inq.name)}
                                  className="p-2 rounded text-stone-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                                  title="Delete inquiry from Database"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

              </div>

              {/* Bottom bar with signout */}
              <div className="flex justify-between items-center pt-4 border-t border-gold-300/10 text-[11px] text-stone-500">
                <span>Caution: spreadsheet write operations alter public data sheets securely.</span>
                <button 
                  onClick={handleSignOut}
                  className="px-3.5 py-1.8 bg-stone-900 border border-stone-800 hover:border-gold-300/30 text-stone-300 hover:text-gold-200 uppercase font-bold text-[10px] tracking-widest rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                  Sign Out
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
