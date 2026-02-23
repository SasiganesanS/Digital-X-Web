// src/data/projects.js

// Import your project images here
import honeybeeImg from "../assets/project-cover/honeybee1.jpeg";
import skillbridgeImg from "../assets/project-cover/skillBridge1.jpeg";
import tipyImg from "../assets/project-cover/tipy1.jpeg";

export const projects = [
  {
    id: 1,
    title: "Honeybee",
    description: "Anonymous Learning Management Platform (Web Application)",
    tags: "UI/UX Design + Full-Stack Dev",
    result: "100% controlled & anonymous communication across the platform",
    image: honeybeeImg,
    bgColor: "bg-blue-100",
    overview: {
      headline: "Smart & Anonymous Learning Management System",
      paragraph:
        "Honeybee is a structured learning management platform designed to simplify course delivery while maintaining complete anonymity between teachers and students. Built with a powerful admin-driven architecture, the platform enables seamless course creation, batch management, secure communication, and controlled one-to-one interactions. By centralizing administration, automating batch assignments, and regulating teacher–student interactions, Honeybee eliminates unstructured communication, privacy risks, and manual coordination—creating a safe, scalable, and efficient digital learning ecosystem.",
      challenges: [
        "Manual management of teachers, students, and courses",
        "Lack of structured batch-based learning workflows",
        "Privacy concerns in direct teacher–student interactions",
        "Difficulty coordinating one-to-one doubt sessions",
        "No centralized visibility into payments and student status",
      ],
      solutions: [
        "Designed an admin-first learning management architecture",
        "Built secure invite-based onboarding for teachers and students",
        "Enabled fully anonymous teacher–student communication",
        "Introduced admin-approved one-to-one session workflows",
        "Integrated payment tracking and fee management system",
      ],
      image: honeybeeImg,
      liveLink: "",
    },
    features: [
      {
        id: 1,
        icon: "🎓",
        title: "Course & Batch Management",
        description:
          "Create courses and organize students and teachers into structured batches.",
      },
      {
        id: 2,
        icon: "🔗",
        title: "Secure Invite-based Onboarding",
        description:
          "Unique login links for teachers and admin-created students — no open registration.",
      },
      {
        id: 3,
        icon: "🕶️",
        title: "Anonymous Teacher–Student Interaction",
        description:
          "Privacy-first communication without sharing personal identities between teachers and students.",
      },
      {
        id: 4,
        icon: "📅",
        title: "Availability & Session Requests",
        description:
          "Students request one-to-one sessions based on teacher-published availability slots.",
      },
      {
        id: 5,
        icon: "✅",
        title: "Admin-controlled One-to-One Sessions",
        description:
          "All private sessions require admin approval and are issued secure meeting links.",
      },
      {
        id: 6,
        icon: "💳",
        title: "Payment & Fee Tracking",
        description:
          "Centralized dashboard showing paid and pending student fees at a glance.",
      },
    ],
    results: [
      {
        id: 1,
        metric: "60%",
        text: "Reduction in manual coordination between admins, teachers, and students",
      },
      {
        id: 2,
        metric: "50%",
        text: "Faster course and batch setup compared to traditional LMS workflows",
      },
      {
        id: 3,
        metric: "100%",
        text: "Controlled and anonymous communication across the entire platform",
      },
      {
        id: 4,
        metric: "Zero",
        text: "Unauthorized teacher–student interactions outside admin supervision",
      },
    ],
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
      "JWT Authentication",
      "Socket.io",
      "Tailwind CSS",
    ],
  },
  {
    id: 2,
    title: "SkilledBridge",
    description: "Nursing Workforce & Shift Management System (Mobile & Web Application)",
    tags: "Mobile App + Web Dashboard",
    result: "45% reduction in manual scheduling effort for hospital staff",
    image: skillbridgeImg,
    bgColor: "bg-pink-100",
    overview: {
      headline: "Intelligent Nursing Management System",
      paragraph:
        "SkilledBridge is a smart nursing management platform designed to streamline workforce coordination within hospitals. Built as a mobile application for nurses and a web-based dashboard for managers and hospital owners, SkilledBridge unifies shift planning, nurse onboarding, leave management, and real-time staffing visibility into a single system. By replacing manual scheduling, scattered communication, and last-minute staffing chaos, SkilledBridge enables hospitals to manage nursing operations with clarity, efficiency, and complete operational control.",
      challenges: [
        "Manual and error-prone nurse shift scheduling",
        "Difficulty in tracking nurse availability and leave requests",
        "Last-minute shift vacancies and understaffing issues",
        "Lack of real-time visibility across departments",
        "Inefficient nurse onboarding and shift communication",
      ],
      solutions: [
        "Designed a centralized nursing workforce management platform",
        "Enabled QR-based nurse onboarding per department",
        "Automated shift allocation, swapping, and leave workflows",
        "Implemented real-time vacancy alerts and internal reallocations",
        "Built role-based dashboards for managers and hospital owners",
      ],
      image: skillbridgeImg,
      liveLink: "",
    },
    features: [
      {
        id: 1,
        icon: "📱",
        title: "QR-based Nurse Onboarding",
        description:
          "Quick and secure nurse sign-up using department-specific QR codes.",
      },
      {
        id: 2,
        icon: "🗓️",
        title: "Smart Shift Allocation",
        description:
          "Assign general and extra shifts with flexible scheduling controls.",
      },
      {
        id: 3,
        icon: "🔄",
        title: "Shift Swap & Leave Management",
        description:
          "Nurses can request swaps or leaves with manager approval workflows.",
      },
      {
        id: 4,
        icon: "🚨",
        title: "Real-time Vacancy Alerts",
        description:
          "Instantly notify managers of vacant shifts and staffing gaps.",
      },
      {
        id: 5,
        icon: "🏥",
        title: "Cross-department Nurse Allocation",
        description:
          "Allocate available nurses internally across departments when needed.",
      },
      {
        id: 6,
        icon: "📊",
        title: "Dashboard & Calendar View",
        description:
          "Clear visual overview of shifts, departments, and nurse availability.",
      },
    ],
    results: [
      {
        id: 1,
        metric: "45%",
        text: "Reduction in manual scheduling effort for hospital staff",
      },
      {
        id: 2,
        metric: "35%",
        text: "Faster response to shift vacancies and emergencies",
      },
      {
        id: 3,
        metric: "100%",
        text: "Visibility across nurse shifts and department operations",
      },
      {
        id: 4,
        metric: "Zero",
        text: "Missed shifts due to miscommunication or manual errors",
      },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "AWS",
      "Amazon Cognito",
      "DynamoDB",
    ],
  },

  {
    id: 3,
    title: "Tipy",
    description: "Textile CAD Software (Desktop Application)",
    tags: "Full-Stack Dev + Desktop App",
    result: "40% faster design-to-production",
    image: tipyImg,
    bgColor: "bg-purple-100",
    overview: {
      headline: "Intelligent CAD Software for Textile Manufacturing Excellence",
      paragraph:
        "Tipy is a purpose-built desktop CAD application engineered for the textile manufacturing industry. Installed via a secure executable file, Tipy seamlessly connects fabric design, production planning, material calculations, and order execution into a single, unified system. By combining design intelligence with production visibility, Tipy empowers textile businesses to move from concept to delivery with greater accuracy, efficiency, and control — eliminating manual errors, disconnected tools, and operational blind spots.",
      challenges: [
        "Complex textile designs with multiple patterns and color combinations",
        "Accurate yarn and material estimation before production",
        "Limited visibility across production stages",
        "Untracked yarn usage and wastage",
        "Disconnected design, production, and billing processes",
      ],
      solutions: [
        "Built a high-performance desktop CAD system for textile workflows",
        "Enabled live fabric previews during design creation",
        "Automated design sheets and yarn calculations",
        "Implemented stage-wise production and wastage tracking",
        "Integrated order management and invoicing",
      ],
      image: tipyImg,
    },
    features: [
      {
        id: 1,
        icon: "🎨",
        title: "Fabric Design Visualization",
        description:
          "Live preview of patterns, colors, and fabric structures — see exactly how the final fabric will look before production begins.",
      },
      {
        id: 2,
        icon: "🧵",
        title: "Warp & Weft Configuration",
        description:
          "Precise control over thread counts and fabric construction for complete design accuracy.",
      },
      {
        id: 3,
        icon: "📐",
        title: "Automated Yarn Calculations",
        description:
          "Instant calculation of yarn quantity and color-wise requirements, eliminating manual estimation errors.",
      },
      {
        id: 4,
        icon: "📊",
        title: "Stage-wise Production Tracking",
        description:
          "Track orders across all manufacturing stages in real time with full operational visibility.",
      },
      {
        id: 5,
        icon: "♻️",
        title: "Wastage Management",
        description:
          "Record yarn loss and returns at every production stage to control costs and reduce waste.",
      },
      {
        id: 6,
        icon: "🧾",
        title: "Order Management & Invoicing",
        description:
          "Manage orders end-to-end, monitor progress, and generate accurate invoices directly from the system.",
      },
    ],
    results: [
      {
        id: 1,
        metric: "40%",
        text: "Faster design-to-production planning compared to manual workflows",
      },
      {
        id: 2,
        metric: "30%",
        text: "Reduction in yarn wastage through stage-wise tracking",
      },
      {
        id: 3,
        metric: "100%",
        text: "Order traceability from design to final delivery",
      },
      {
        id: 4,
        metric: "Zero",
        text: "Manual calculation errors across production and billing",
      },
    ],
    techStack: ["React", "MySQL", "Electron.js", "Node.js"],
  },
];
