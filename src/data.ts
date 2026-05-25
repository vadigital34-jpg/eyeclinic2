import { Service, Doctor, Technology, VisionTip, BlogPost, Testimonial, FAQ } from "./types";

export const SERVICES: Service[] = [
  {
    id: "checkup",
    title: "Comprehensive Eye Checkup",
    shortDesc: "Complete digital diagnostic eye screening for glasses, contact lenses, glaucoma, and macular wellness.",
    longDesc: "Our modern clinical eye examinations use advanced high-definition diagnostic sensors to evaluate not just your prescription, but the full biological health of your physical eyes. Recommended yearly for all age groups.",
    iconName: "Eye",
    treatments: ["Refraction assessment", "Digital retinal imaging", "Intraocular pressure testing", "Slit-lamp screening"]
  },
  {
    id: "cataract",
    title: "Cataract Treatment",
    shortDesc: "Micro-incision sutureless cataract surgery with state-of-the-art premium intraocular lens (IOL) implants.",
    longDesc: "Restore optical clarity through high-precision micro-incision phacoemulsification. Our ultra-customized lens implants (monofocal, multifocal, and toric) cure clouding and significantly decrease reliance on vision aids.",
    iconName: "Glasses",
    treatments: ["Custom phacoemulsification", "Premium multifocal IOLs", "Toric astigmatism correction", "Laser-assisted therapy"]
  },
  {
    id: "lasik",
    title: "Advanced LASIK Surgery",
    shortDesc: "Blade-free customized laser vision correction to permanently treat nearsightedness, farsightedness, and astigmatism.",
    longDesc: "Unshackle yourself from spectacles with standard blade-free Wavefront guided Femto-LASIK. Experience 10-minute outpatient therapy with quick overnight healing and rapid clarity improvements.",
    iconName: "Zap",
    treatments: ["Custom Wavefront analysis", "All-laser Femto-LASIK", "PRK & surface treatment", "Post-op care programs"]
  },
  {
    id: "retina",
    title: "Retina Care",
    shortDesc: "Expert evaluation, management, and laser treatment for diabetic retinopathy and age-related macular degeneration.",
    longDesc: "Our retina center utilizes state-of-the-art Optical Coherence Tomography (OCT) scanning to safely capture cell layers and combat conditions like diabetic leakage, retinal tearing, and visual macular warping.",
    iconName: "Activity",
    treatments: ["Diabetic retinopathy screening", "Macular degeneration management", "High-frequency OCT scans", "Retinal laser photocoagulation"]
  },
  {
    id: "glaucoma",
    title: "Glaucoma Care & Management",
    shortDesc: "Preventative therapies and early detection protocols to protect optic pathways from fluid pressure damage.",
    longDesc: "Glaucoma represents the silent thief of eyesight. We perform structural corneal thickness reviews, visual field examinations, and gentle IOP regulation to shield your optical nervous path from degradation.",
    iconName: "ShieldAlert",
    treatments: ["Visual field analysis", "Selective laser trabeculoplasty", "Topical pressure drops", "Optic nerve fiber scans"]
  },
  {
    id: "pediatric",
    title: "Pediatric Eye Care",
    shortDesc: "Specialized gentle eyes testing, amblyopia therapy, and school screening protocols for children.",
    longDesc: "Children need targeted visual analysis. Dr. Sarah Lin specializes in evaluating alignment, lazy eye syndrome (amblyopia), tracking difficulties, and pediatric corrective prescriptions within a pleasant, non-clinical environment.",
    iconName: "Users",
    treatments: ["Amblyopia (lazy eye) diagnostics", "Pediatric accommodation exams", "Strabismus visual screens", "Specialized child frames fitting"]
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "carter",
    name: "Dr. Elizabeth Carter, MD",
    title: "Lead Ophthalmologist & LASIK Specialist",
    imgUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    qualification: "MD, Board Certified Ophthalmology",
    experience: "15+ Years Medical Experience",
    specialization: "Refractive Surgery, Wavefront LASIK, Retinal Care Specialist",
    bio: "Dr. Elizabeth Carter has performed over 8,000 successful refractive and corneal adjustments. A graduate of Harvard Medical School, she leads our research panel on customized all-laser vision correction treatments and sits on the American Board of Ophthalmology.",
    languages: ["English", "Spanish"]
  },
  {
    id: "vance",
    name: "Dr. Marcus Vance, MD",
    title: "Senior Ophthalmic Surgeon",
    imgUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    qualification: "MD, FACS, Board Certified Surgeon",
    experience: "12+ Years Surgical Experience",
    specialization: "Micro-Sutureless Cataract, Glaucoma Implants, Cornea Grafting",
    bio: "Dr. Marcus Vance is an internationally recognized leader of micro-surgical phacoemulsification techniques. Having trained extensively at Johns Hopkins, he focuses on restoring crystal sight with premium lens customization and advanced fluid pressure maintenance therapies.",
    languages: ["English", "German"]
  },
  {
    id: "lin",
    name: "Dr. Sarah Lin, OD",
    title: "Director of Pediatric Optometry",
    imgUrl: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=600",
    qualification: "OD, Doctor of Optometry",
    experience: "8+ Years Care Experience",
    specialization: "Pediatric Eye Care, Binocular Vision, Strabismus Correction",
    bio: "Dr. Sarah Lin combines visual diagnostic expertise with a warm, comforting demeanor designed to ease younger hearts. An honor graduate of UC Berkeley School of Optometry, she manages custom refractive orthokeratology, alignment therapies, and functional visual milestones.",
    languages: ["English", "Mandarin"]
  }
];

export const TECHNOLOGIES: Technology[] = [
  {
    id: "oct",
    name: "High-Definition 3D OCT Retinal Scanner",
    tagline: "Ultra-precise non-contact layered eye screening",
    description: "Our Optical Coherence Tomography (OCT) operates much like a non-invasive ultrasound, but utilizes light waves instead of sound to map the biological micro-layers of your retina with sub-micron resolution. It detects macular degradation and early glaucoma years before normal exams.",
    useCase: "Early deep-tissue detection of macular issues, macular holes, diabetic edema, and sub-surface optic path damage.",
    imgUrl: "/src/assets/images/clinic_machine_1779729478414.png"
  },
  {
    id: "femto",
    name: "Wavefront guided Femto LDV Laser System",
    tagline: "All-Laser customizable blade-free precision",
    description: "This Swiss-engineered advanced cold laser generates billions of pulses per second, enabling our corneal specialists to configure protective micro-layer separations with micromembrane accuracy. Wavefront technology measures eye contours unique as your fingerprints.",
    useCase: "Blade-less premium LASIK flaps, ultra-custom refraction adjustments, and fast pain-free vision enhancements.",
    imgUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"
  }
];

export const VISION_TIPS: VisionTip[] = [
  {
    id: "tip1",
    title: "The 20-20-20 Protective Rule",
    category: "screen",
    benefit: "Reduces focal muscle fatigue and digital dry-eye syndrome.",
    action: "Every 20 minutes spent facing a digital display, fix your gaze on an object at least 20 feet away for 20 continuous seconds to permit focusing relaxation."
  },
  {
    id: "tip2",
    title: "UV Shield Protection",
    category: "prevention",
    benefit: "Inhibits early development of cataracts and macular harm.",
    action: "Always carry sunglasses that block 99% to 100% of UVA and UVB radiation, even on overcast days when visual glare may seem minor."
  },
  {
    id: "tip3",
    title: "Macular Lutein Nutrition",
    category: "diet",
    benefit: "Protects retinal pigment layers from oxidative light damage.",
    action: "Incorporate lutein-rich foods into meals: leafy kales, organic spinach, broccoli, premium eggs, and citrus fruits packed with Vitamin C and E."
  },
  {
    id: "tip4",
    title: "Observe Blink Frequency",
    category: "screen",
    benefit: "Maintains natural tear layer integrity and prevents irritation.",
    action: "Consciously try to perform full blinks while reading computer screens, which normally halves your natural blink rhythm from 15 down to 5 times per minute."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog1",
    title: "Understanding Cataracts: Early Symptoms, Causes, and Modern Cures",
    excerpt: "Experiencing cloudy vision, screen halos, or issues reading at night? Learn how laser phacoemulsification safely cures cataracts in under 15 minutes.",
    date: "May 14, 2026",
    readTime: "5 mins read",
    author: "Dr. Marcus Vance",
    category: "Cataract",
    tags: ["Cataract", "Eye Health", "Outpatient Surgery"]
  },
  {
    id: "blog2",
    title: "Is Custom Femto-LASIK Right for You? The Pre-evaluation Guidelines",
    excerpt: "Tired of foggy spectacles or dirty contact lenses? Discover the biological criteria that eye specialists look for to confirm your safety for custom laser vision refinement.",
    date: "April 28, 2026",
    readTime: "7 mins read",
    author: "Dr. Elizabeth Carter",
    category: "LASIK",
    tags: ["LASIK", "Refractive Laser", "Specs Free"]
  },
  {
    id: "blog3",
    title: "Digital Eye Strain: Safeguarding Vision in the Remote Work Generation",
    excerpt: "With screen-time hours peaking, desk employees suffer from dry, red, tired optics. Read our ophthalmologist-approved list of practical workplace setups.",
    date: "April 10, 2026",
    readTime: "4 mins read",
    author: "Dr. Sarah Lin",
    category: "Preventative",
    tags: ["Digital Health", "Dry Eyes", "Ergonomics"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test1",
    name: "Robert Henderson",
    age: 68,
    location: "Boston, MA",
    treatment: "Cataract Surgery",
    rating: 5,
    text: "Thanks to Dr. Vance, the cataract surgery was absolutely painless and incredibly fast. For the first time in twenty years, I can read the morning newspaper clearly without needing reading glasses!",
    verified: true
  },
  {
    id: "test2",
    name: "Amanda Jenkins",
    age: 29,
    location: "Cambridge, MA",
    treatment: "Femto-LASIK Laser",
    rating: 5,
    text: "I was super nervous about laser surgery, but Dr. Carter explained everything step-by-step. The 10 minutes went like a breeze, and I woke up the very next day with 20/15 clarity. Absolute magic!",
    verified: true
  },
  {
    id: "test3",
    name: "Victoria Powell",
    age: 38,
    location: "Newton, MA",
    treatment: "Pediatric Lazy Eye Care",
    rating: 5,
    text: "Dr. Lin is phenomenal with kids! She turned my son's amblyopia physical therapy into a fun game he wants to play. His eyes alignment has corrected wonderfully over the last six months.",
    verified: true
  }
];

export const FAQS: FAQ[] = [
  {
    id: "faq1",
    question: "How long does a thorough eye examination take, and what should I bring?",
    answer: "A comprehensive optical screening lasts between 45 to 60 minutes. It standardly evaluates refraction, pressure fields, and underlying retinal health. Please carry your existing lenses/spectacles, a list of current medications, and your insurance cards.",
    category: "exams"
  },
  {
    id: "faq2",
    question: "Does blade-free LASIK laser treatment hurt, and when can I return to work?",
    answer: "No, laser treatment is virtually painless! We apply local anesthetic numbing drops prior to starting. Patients typically report a light structural pressure sensation but no actual pain. Most clients safely return to standard computer tasks and work within 24 to 48 hours.",
    category: "lasik"
  },
  {
    id: "faq3",
    question: "What is cataract surgery, and how long do the custom intraocular lens implants last?",
    answer: "Cataract surgery involves gently vacuuming out your cloudy crystallized lens and replacing it with a clear artificial intraocular implant (IOL). Premium IOLs are made of durable biocompatible polymers designed to last a lifetime without ever needing replacement.",
    category: "surgery"
  },
  {
    id: "faq4",
    question: "What should I do if I experience sudden eye pain, chemical splashes, or quick vision loss?",
    answer: "These represent critical ocular emergencies! Immediately rinse eyes with clean water for 15 minutes if chemically splashed. Do not rub the affected eye. Call our 24/7 Priority Emergency care Line at +1 (800) 555-9911 or head straight to the nearest emergency medical emergency center.",
    category: "emergency"
  }
];
