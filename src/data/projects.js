// src/data/projects.js

// Import your project images here
import honeybeeImg from "../assets/project-cover/honeybee1.jpeg";
import skillbridgeImg from "../assets/project-cover/skillBridge1.jpeg";
import tipyImg from "../assets/project-cover/tipy1.jpeg";

export const projects = [
  {
    id: 1,
    title: "Honeybee",
    description: "Student Management Platform",
    tags: "UI/UX Design + Frontend",
    result: "4x user engagement increase",
    image: honeybeeImg,
    bgColor: "bg-blue-100",
    overview: {
      headline: "Revolutionizing Student Management",
      paragraph:
        "Honeybee is a comprehensive student management platform designed to streamline educational operations. We transformed the traditional approach to student data management by creating an intuitive, modern interface that connects students, teachers, and administrators seamlessly.",
      challenges: [
        "Complex data relationships between students, courses, and instructors",
        "Need for real-time updates across multiple user types",
        "Ensuring data privacy and security compliance",
        "Creating an intuitive interface for non-technical users",
      ],
      solutions: [
        "Implemented role-based access control for secure data management",
        "Built real-time notification system using WebSockets",
        "Designed mobile-first responsive interface",
        "Integrated automated reporting and analytics dashboard",
      ],
      image: honeybeeImg,
      liveLink: "https://example.com/honeybee",
    },
    features: [
      {
        id: 1,
        icon: "📊",
        title: "Real-time Analytics",
        description:
          "Track student performance and engagement with live data visualization and automated reports.",
      },
      {
        id: 2,
        icon: "🔔",
        title: "Smart Notifications",
        description:
          "Automated alerts for assignments, grades, and important announcements across all platforms.",
      },
      {
        id: 3,
        icon: "📱",
        title: "Mobile-First Design",
        description:
          "Fully responsive interface optimized for smartphones and tablets for on-the-go access.",
      },
      {
        id: 4,
        icon: "🔒",
        title: "Secure Access",
        description:
          "Enterprise-grade security with role-based permissions and encrypted data storage.",
      },
      {
        id: 5,
        icon: "📚",
        title: "Course Management",
        description:
          "Comprehensive tools for creating, managing, and tracking courses and curriculum.",
      },
      {
        id: 6,
        icon: "💬",
        title: "Integrated Communication",
        description:
          "Built-in messaging system for seamless communication between all stakeholders.",
      },
    ],
    results: [
      {
        id: 1,
        metric: "4x",
        text: "Increase in user engagement within the first semester of deployment",
      },
      {
        id: 2,
        metric: "85%",
        text: "Reduction in administrative workload through automation",
      },
      {
        id: 3,
        metric: "10,000+",
        text: "Active users across multiple educational institutions",
      },
      {
        id: 4,
        metric: "98%",
        text: "User satisfaction rating from students and faculty",
      },
    ],
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "Socket.io",
      "Tailwind CSS",
      "Express.js",
      "JWT Authentication",
    ],
  },
  {
    id: 2,
    title: "SkillBridge",
    description: "Learning Ecosystem",
    tags: "Design + SEO Integration",
    result: "60% organic traffic growth",
    image: skillbridgeImg,
    bgColor: "bg-pink-100",
    overview: {
      headline: "Connecting Learners with Opportunities",
      paragraph:
        "SkillBridge is an innovative learning ecosystem that bridges the gap between education and employment. We created a platform that not only provides quality educational content but also connects learners directly with potential employers through skill-based matching.",
      challenges: [
        "Low organic visibility in a competitive edtech market",
        "Need for personalized learning paths",
        "Integrating job matching with learning progress",
        "Creating engaging, interactive course content",
      ],
      solutions: [
        "Implemented comprehensive SEO strategy with content optimization",
        "Built AI-powered recommendation engine for personalized courses",
        "Developed skill-matching algorithm connecting learners with jobs",
        "Created interactive learning modules with gamification",
      ],
      image: skillbridgeImg,
      liveLink: "https://example.com/skillbridge",
    },
    features: [
      {
        id: 1,
        icon: "🎯",
        title: "Personalized Learning",
        description:
          "AI-driven course recommendations based on career goals and learning style.",
      },
      {
        id: 2,
        icon: "🔍",
        title: "SEO Optimized",
        description:
          "Advanced SEO implementation ensuring high visibility in search results.",
      },
      {
        id: 3,
        icon: "🤝",
        title: "Job Matching",
        description:
          "Smart algorithm connecting learners with relevant job opportunities.",
      },
      {
        id: 4,
        icon: "🎮",
        title: "Gamified Learning",
        description:
          "Interactive challenges and rewards to boost engagement and retention.",
      },
      {
        id: 5,
        icon: "📈",
        title: "Progress Tracking",
        description:
          "Comprehensive analytics showing skill development and learning journey.",
      },
      {
        id: 6,
        icon: "🏆",
        title: "Certifications",
        description: "Industry-recognized certificates upon course completion.",
      },
    ],
    results: [
      {
        id: 1,
        metric: "60%",
        text: "Growth in organic traffic within 6 months of SEO optimization",
      },
      {
        id: 2,
        metric: "5,000+",
        text: "Successful job placements through the platform",
      },
      {
        id: 3,
        metric: "92%",
        text: "Course completion rate due to engaging content",
      },
      {
        id: 4,
        metric: "300%",
        text: "Increase in user time spent on platform",
      },
    ],
    techStack: [
      "Next.js",
      "Python",
      "PostgreSQL",
      "TensorFlow",
      "Redis",
      "GraphQL",
      "AWS",
    ],
  },
  {
    id: 3,
    title: "Tipy",
    description: "CAD Software",
    tags: "Full-Stack Dev + Branding",
    result: "Seamless design workflow",
    image: tipyImg,
    bgColor: "bg-purple-100",
    overview: {
      headline: "Modern CAD Software for Creative Professionals",
      paragraph:
        "Tipy is a next-generation CAD software that simplifies complex design workflows. We built a powerful yet intuitive tool that empowers designers and engineers to bring their ideas to life faster and more efficiently than ever before.",
      challenges: [
        "Handling complex 3D rendering in the browser",
        "Ensuring real-time collaboration features",
        "Creating an intuitive interface for technical software",
        "Building a scalable architecture for large design files",
      ],
      solutions: [
        "Implemented WebGL for high-performance 3D rendering",
        "Built real-time collaboration using operational transformation",
        "Designed clean, modern UI with extensive user testing",
        "Optimized file handling with lazy loading and caching",
      ],
      image: tipyImg,
      liveLink: "https://example.com/tipy",
    },
    features: [
      {
        id: 1,
        icon: "🎨",
        title: "3D Rendering",
        description:
          "High-performance WebGL-based rendering for complex 3D models.",
      },
      {
        id: 2,
        icon: "👥",
        title: "Real-time Collaboration",
        description:
          "Multiple users can work on the same design simultaneously.",
      },
      {
        id: 3,
        icon: "⚡",
        title: "Lightning Fast",
        description:
          "Optimized performance for handling large, complex design files.",
      },
      {
        id: 4,
        icon: "🎭",
        title: "Custom Branding",
        description:
          "Professional brand identity with modern visual design system.",
      },
      {
        id: 5,
        icon: "💾",
        title: "Cloud Storage",
        description:
          "Automatic saving and version control with cloud synchronization.",
      },
      {
        id: 6,
        icon: "📤",
        title: "Export Options",
        description:
          "Support for multiple file formats and industry standards.",
      },
    ],
    results: [
      {
        id: 1,
        metric: "50%",
        text: "Faster design workflow compared to traditional CAD software",
      },
      {
        id: 2,
        metric: "2,000+",
        text: "Active professional users across design and engineering firms",
      },
      {
        id: 3,
        metric: "99.9%",
        text: "Uptime ensuring reliable access for critical projects",
      },
      {
        id: 4,
        metric: "4.8/5",
        text: "Average user rating with exceptional feedback",
      },
    ],
    techStack: [
      "React",
      "Three.js",
      "WebGL",
      "Node.js",
      "Redis",
      "Docker",
      "Kubernetes",
      "AWS S3",
    ],
  },
];
