import { 
  Sparkles, 
  Leaf, 
  MapPin, 
  HeartHandshake, 
  BookHeart, 
  Activity, 
  Apple, 
  GraduationCap, 
  Target, 
  Users, 
  Award, 
  CheckCircle, 
  ChevronRight 
} from "lucide-react";

export interface Founder {
  name: string;
  titles: string[];
  image: string;
  fallbackImage: string;
  bio: string;
  aboutMini: string;
  achievements: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
  theme: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  improvementContext: string;
  timeframe: string;
  gender: 'male' | 'female';
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  summary: string;
  date: string;
  readTime: string;
  content: string;
}

export const FOUNDERS: Founder[] = [
  {
    name: "Ganesh Shelar",
    titles: [
      "B.Tech (Food Bio-Technology)",
      "MBA (Operations)",
      "Ayurveda Health Consultant",
      "Wellness Coach"
    ],
    image: "/assets/input_file_2.png",
    fallbackImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    aboutMini: "Blending advanced modern food biotechnology with the timeless wisdom of classical Ayurveda to coach families on deep, restorative daily habits.",
    bio: "With a strong base in Food Bio-Technology and an MBA in Operations, Ganesh possesses a unique scientific perspective on lifestyle medicine. He translates the complex mechanics of nutrition, digestion, and daily circadian rhythms (Dincharya) into actionable modern wellness routines. Rather than treating physical complaints as isolated incidents, Ganesh focuses on revitalizing the body's natural intelligence (Ojas) through bio-aligned living.",
    achievements: [
      "Expertise in Bio-Technology & Ayurvedic Nutrition synergy",
      "Guiding families through structural lifestyle transformations",
      "Pioneer in preventive daily routine design (Dincharya & Ritucharya)"
    ]
  },
  {
    name: "Surekha Shelar",
    titles: [
      "Wellness Consultant",
      "Lifestyle Mentor",
      "Ayurveda Health Advisor"
    ],
    image: "/assets/input_file_1.png",
    fallbackImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
    aboutMini: "A dedicated practitioner guiding individuals to discover balance through natural lifestyle mentorship and gentle, holistic habit shifts.",
    bio: "Surekha is the cornerstone of personalized care at Aradhya Ayur Wellness. She excels in helping families establish deep structural roots in clean, mindful dietary habits, stress mitigation, and seasonal lifestyle changes. Surekha believes that genuine wellbeing arises from small, conscious changes made consistently over time. Her empathetic counseling has helped hundreds of people rebuild self-care habits.",
    achievements: [
      "Deeply empathetic family lifestyle mentorship",
      "Custom kitchen-pharmacy and spice-balancing education",
      "Passionate advocate for women's and children's holistic physical health"
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: "lifestyle-coaching",
    title: "Lifestyle Coaching",
    description: "Align your daily routine (Dincharya) with biological laws to optimize sleep, vitality, and mental clarity.",
    longDescription: "Our signature coaching evaluates your sleeping patterns, waking habits, energy flow, and mental stress. We co-create a personalized wellness routine incorporating classical Ayurvedic guidelines tuned for modern lifestyles, helping you experience stable vitality and sustained daily focus.",
    iconName: "Activity",
    theme: "Gold"
  },
  {
    id: "nutrition-guidance",
    title: "Nutrition Guidance",
    description: "Tailored nutritional education matching your unique body constitution (Prakriti) and digestive fire (Agni).",
    longDescription: "Nutrition is not a one-size-fits-all formula. We teach you how to choose foods, spices, and cooking styles that match your digestive capacity, fostering excellent nutrient assimilation, reducing bloating, and naturally clarifying your physical structure.",
    iconName: "Apple",
    theme: "Forest"
  },
  {
    id: "wellness-education",
    title: "Wellness Education",
    description: "Deep-dive workshops and learning resources empowering communities to take charge of their health.",
    longDescription: "Educated decisions form the backbone of permanent health. We deliver clean, academic yet highly accessible lectures and instructional guides covering seasonal wellness practices, spice-board science, and non-invasive family health management.",
    iconName: "GraduationCap",
    theme: "Gold"
  },
  {
    id: "healthy-habit-development",
    title: "Healthy Habit Development",
    description: "Micro-habits counseling using modern behavior science overlaid with authentic Ayurvedic wisdom.",
    longDescription: "We assist you in designing realistic cues, clean workflows, and consistent positive rewards to install high-performance habits like digital detoxes, morning hydration rituals, and calming mindfulness pauses without causing friction or mental guilt.",
    iconName: "Sparkles",
    theme: "Forest"
  },
  {
    id: "family-wellness-programs",
    title: "Family Wellness Programs",
    description: "Comprehensive home-health guidelines designed to cultivate collective immunity and natural vitality.",
    longDescription: "Designed to help multiple generations under one roof. We guide parents and children in physical vitality, proper kitchen nutrition, seasonal spices, and group habits, establishing a strong domestic ecosystem of joy and mutual health support.",
    iconName: "Users",
    theme: "Gold"
  },
  {
    id: "preventive-wellness-support",
    title: "Preventive Wellness Support",
    description: "Build robust physiological resilience to seasonal pathogens and everyday stressors naturally.",
    longDescription: "By identifying subtle imbalances before they materialize as complaints, we design natural protocols including herbal infusions, protective foods, and breathing exercises to keep your natural immunity high throughout seasonal shifts.",
    iconName: "Leaf",
    theme: "Forest"
  },
  {
    id: "weight-management-guidance",
    title: "Weight Management Guidance",
    description: "Achieve and sustain your optimal weight without crash diets, using metabolic metabolic alignment.",
    longDescription: "We address the metabolic root-cause of weight imbalances. By strengthening your core digestive flame (Agni) and purifying physiological paths, we guide you to a natural, steady, and beautifully balanced weight that honors your natural body shape.",
    iconName: "Target",
    theme: "Gold"
  },
  {
    id: "immunity-vitality-support",
    title: "Immunity & Vitality Support",
    description: "Replenish your deep reserve of vital essence (Ojas) and experience deep, enduring strength.",
    longDescription: "Ideal for recovering from high-stress burnout. Our personalized program introduces gentle adaptogens, deep rest strategies, and nourishing dietary practices designed to deeply rebuild, revitalize, and reconnect you to your natural inner strength.",
    iconName: "Award",
    theme: "Forest"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh Kulkarni",
    location: "Pune, Maharashtra",
    quote: "Working with Mr. Ganesh Shelar has completely shifted how I view my mornings. His lifestyle coaching didn't involve heavy medications. He simply explained how my late dinners were damaging my metabolic fire. Integrating his Dincharya protocol has returned my deep sleep and cured my persistent afternoon lethargy.",
    improvementContext: "Improved sleep deepness & eliminated afternoon fatigue through natural bio-rhythms coaching",
    timeframe: "3 Months Program",
    gender: 'male'
  },
  {
    id: "2",
    name: "Meera Deshmukh",
    location: "Mumbai, Maharashtra",
    quote: "Surekha Ji is an absolute blessing! Her gentle, encouraging approach felt so supportive. She educated me on incorporating simple kitchen herbs into my daily meals. My digestion feels lighter than ever, and I have found an inner calm that I hadn't felt in years.",
    improvementContext: "Resolved chronic bloating & restored calm focus via spice nutrition guidance",
    timeframe: "4 Months Program",
    gender: 'female'
  },
  {
    id: "3",
    name: "Anand Shinde",
    location: "Solapur, Maharashtra",
    quote: "As a busy store owner, my eating times were erratic, leaving me constantly exhausted and overweight. Ganesh and Surekha designed a structured 'Family Wellness Program' that fit perfectly into my tight schedule. My entire household now practices mindful eating. I have naturally stabilized my weight and regained massive energy.",
    improvementContext: "Stabilized weight naturally and elevated daily energy levels through meal coordination",
    timeframe: "6 Months Program",
    gender: 'male'
  },
  {
    id: "4",
    name: "Priyanka Patil",
    location: "Satara, Maharashtra",
    quote: "I took their 'Immunity and Vitality Support' guidance during a time of extreme corporate stress. Instead of promising quick cures, they taught me deep lifestyle pacing and habit creation. The results are permanent. I feel highly secure in my resilience, focused in my tasks, and physically alive.",
    improvementContext: "Overcame high-stress burnout & rebuilt physical immunity with Ayurvedic food rituals",
    timeframe: "2 Months Consultation",
    gender: 'female'
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: "agni-the-metabolic-fire",
    title: "Agni: The Foundation of Lifelong Health",
    category: "Nutrition Articles",
    summary: "Discover why Ayurveda considers digestion to be the cornerstone of physical existence and how you can nurture your metabolic fire.",
    date: "June 08, 2026",
    readTime: "5 min read",
    content: `In classical Ayurvedic wisdom, the state of your health is determined directly by the strength of your "Agni" — the central digestive and metabolic fire. 

If Agni is balanced, your body successfully digests wholesome food, assimilates vitamins, and flushes toxins. If Agni is sluggish, even the healthiest home-cooked meals turn into "Ama" — toxic, sticky undigested residue that blocks our channels (Srotas) and compromises our immunity.

### How to Nurture Your Agni Daily:
1. **Never Drink Ice Water with Meals:** Cold water acts like throwing ice onto a campfire, instantly extinguishing your digestive digestive capacity. Opt for warm water or a light ginger tea.
2. **Eat Only When Sincerely Hungry:** Eating out of habit or emotional comfort before your previous meal is digested leads to a backlog of toxins.
3. **The Power of Ginger & Lemon:** Chew a tiny slice of fresh ginger sprinkled with salt and lemon juice 15 minutes before lunch. This signals your stomach to release optimal digestive enzymes.`
  },
  {
    id: "dinacharya-ayurvedic-routine",
    title: "Mastering Dinacharya: The Ayurvedic Morning Ritual",
    category: "Healthy Lifestyle Tips",
    summary: "Transform your mornings with simple, time-tested practices that synchronize your nervous system with nature's rhythm.",
    date: "May 28, 2026",
    readTime: "7 min read",
    content: `How you spend the first hour of your day sets the tone for your entire nervous system. "Dinacharya" represents a sequence of daily self-care habits designed to anchor your mind and purify your sense organs.

Integrating even two or three of these habits can yield an unbelievable change in your mental clarity and physical vitality.

### Easy Practices to Install Tomorrow:
1. **The Copper Cup Hydration (Ushapan):** Drink room-temperature water kept overnight in a pure copper vessel immediately upon waking. This gently wakes the colon and supports natural detoxification.
2. **Gentle Tongue Scraping (Jihva Nirlekhan):** Use a copper tongue scraper to clear the white coating (toxins) from your tongue. This freshens your mouth, enhances taste sensitivity, and stimulates organ digests.
3. **Oil Pulling (Gandusha):** Swish organic sesame or coconut oil in your mouth for 5 to 10 minutes. This strengthens your gums, balances oral microbes, and clears heavy salivary waste.`
  },
  {
    id: "shata-avari-wellness",
    title: "Understanding Satmya: Developing Personal food Instincts",
    category: "Ayurveda Awareness",
    summary: "Learn why a particular diet might work wonderfully for someone else but leave you exhausted, and how to define your custom blueprint.",
    date: "May 15, 2026",
    readTime: "6 min read",
    content: `Modern dieting has made us look outward for rules—counting proteins, tracking calories, or strictly omitting key foods. Ayurveda, however, rests on the pillar of "Satmya" — what is naturally accustomed and wholesome to your specific ecology.

### The Three Pillars of Food Compatibility:
- **Prakriti (Your Constitution):** A person with excessive heat element (Pitta) will naturally feel unstable eating dry, spicy, or fermented foods. Meanwhile, a person with cold, damp elements (Kapha) will thrive on bitter herbs and light, warm, roasted foods.
- **Desha (Your Environment):** Eating cold, raw salads might be pleasant in a tropical climate, but is counterproductive in Solapur's dry summers or during monsoon seasons.
- **Kala (The Time of Day):** The sun outside mirrors the digestive strength inside. Your largest, most nourishing meal should be taken at mid-day (12 PM - 1:30 PM), when the sun is at its peak.`
  }
];
