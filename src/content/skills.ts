import { SkillGroup, TechBadge } from "@/types/portfolio";

export const skillGroups: SkillGroup[] = [
  {
    id: "application-engineering",
    title: "Application Engineering",
    subtitle: "Flutter · Dart · Swift · SwiftUI · BLoC/Cubit · Provider",
    items: [
      "Flutter & Dart",
      "BLoC / Cubit & Provider",
      "Swift & SwiftUI (iOS)",
      "Clean Architecture & Feature-First",
      "Centralized Design Systems",
    ],
    iconName: "mobile",
  },
  {
    id: "backend-systems",
    title: "Backend & Systems Integration",
    subtitle: "Laravel · REST APIs · Firebase · Supabase · WebSockets",
    items: [
      "Laravel & PHP REST APIs",
      "Firebase & Supabase",
      "WebSockets & HTTP/JSON",
      "React / TypeScript Dashboards",
      "Python & TensorFlow (AI)",
    ],
    iconName: "server",
  },
];

export const techBadges: TechBadge[] = [
  { name: "FLUTTER", color: "#54C5F8", category: "Mobile", iconSrc: "/icons/flutter.png" },
  { name: "LARAVEL", color: "#FF4D4D", category: "Backend", iconSrc: "/icons/Laravel.svg" },
  { name: "SWIFT", color: "#FF785A", category: "Mobile", iconSrc: "/icons/swift.png" },
  { name: "PYTHON", color: "#FFD43B", category: "Language", iconSrc: "/icons/python.png" },
  { name: "REACT / TS", color: "#28A9E0", category: "Web", iconSrc: "/icons/react.svg" },
];

