import { ProjectCaseStudy } from "@/types/portfolio";

export const projects: ProjectCaseStudy[] = [
  {
    slug: "taskflow",
    title: "TaskFlow",
    subtitle: "Software Architecture & Application Engineering",
    summary:
      "End-to-end task and project management application engineered with a Flutter client, Laravel REST API, and PostgreSQL data modeling.",
    role: "Software Architecture & Application Engineering",
    overview:
      "TaskFlow is a task and project management product built to demonstrate production-oriented software engineering across mobile and backend layers.",
    problem:
      "Managing tasks and team workflows requires clear data modeling, strict validation rules, and reliable authentication across client and server.",
    solution:
      "Built a structured Flutter application integrated with a Laravel REST API and PostgreSQL database, organized around clean architectural boundaries.",
    myRole: [
      "Designed the application architecture and client-server data flow.",
      "Implemented Flutter application features, state management, and API integration.",
      "Worked on Laravel API endpoints, PostgreSQL schema modeling, and validation rules.",
    ],
    engineering: [
      "Structured Flutter application with clean separation between UI, state, and data layers.",
      "Implemented Laravel REST APIs with authentication, authorization, and business-rule validation.",
      "Modeled relational entities in PostgreSQL for tasks, users, and project workflows.",
    ],
    challenges: [
      "Keeping client validation and backend business rules synchronized across workflows.",
      "Designing maintainable API contracts that support iterative feature growth.",
    ],
    outcome: [
      "Delivered an end-to-end application demonstrating clean architecture, API integration, and relational data modeling.",
    ],
    techStack: [
      "Flutter",
      "Dart",
      "Laravel",
      "PostgreSQL",
      "REST APIs",
      "Clean Architecture",
    ],
    links: {
      github: "https://github.com/Aboody241",
    },
    screenshots: [],
    featured: true,
  },
  {
    slug: "tawsylah",
    title: "Tawsylah",
    subtitle: "Production Mobile Application",
    summary:
      "Production delivery mobile application involving Flutter feature development, Laravel API integration, authentication flows, and release troubleshooting.",
    role: "Production Mobile Application",
    overview:
      "Tawsylah is a real-world delivery product where I contributed to mobile feature implementation, backend integration, and production release delivery.",
    problem:
      "Maintaining and shipping features on an active production mobile app requires working within existing system constraints, third-party integrations, and release pipelines.",
    solution:
      "Implemented and maintained Flutter application flows integrated with Laravel APIs, addressing authentication, business logic, and release-specific issues.",
    myRole: [
      "Developed and maintained Flutter UI and business logic within an existing production codebase.",
      "Integrated Laravel REST APIs, authentication flows, and third-party services.",
      "Investigated release-specific issues and supported Google Play deployment.",
    ],
    engineering: [
      "Integrated mobile client workflows with existing Laravel API contracts.",
      "Handled authentication state, error recovery, and third-party service integration.",
      "Debugged build and release-configuration issues prior to store deployment.",
    ],
    challenges: [
      "Diagnosing release-only issues that do not reproduce in debug builds.",
      "Coordinating changes safely with team members inside an active production system.",
    ],
    outcome: [
      "Contributed verified features and release fixes to a live production mobile application.",
    ],
    techStack: [
      "Flutter",
      "Dart",
      "Laravel",
      "REST APIs",
      "Google Play",
      "Third-Party APIs",
    ],
    links: {
      github: "https://github.com/Aboody241",
    },
    screenshots: [],
    featured: true,
  },
  {
    slug: "brainbox-ai",
    title: "BrainBox-AI",
    subtitle: "AI Integration & Real-time Streaming",
    summary:
      "AI co-work chatbot engineered with Feature-First Clean Architecture, typed Result-based error flow, centralized design system, and real-time streaming chat.",
    role: "AI Integration & Real-time Streaming",
    overview:
      "BrainBox-AI is an AI co-work chatbot application built in Flutter with a focus on foundational architecture, reusable UI systems, and responsive AI chat experiences.",
    problem:
      "AI chat applications quickly accumulate tangled state, inconsistent UI components, and brittle error handling when built without clear architectural boundaries.",
    solution:
      "Designed a Feature-First Clean Architecture with explicit dependency boundaries, centralized routing, dependency injection, Result-based error flow, and a centralized design system.",
    myRole: [
      "Designed and implemented the foundational Feature-First architecture and dependency boundaries.",
      "Built centralized routing, dependency injection, typed error handling, and Result-based error flow.",
      "Created the centralized design system and core reusable Flutter chat components.",
    ],
    engineering: [
      "Enforced Result-based error flow and typed error handling across async AI/network operations.",
      "Built a token-driven design system (colors, typography, spacing, radius, elevation, icons).",
      "Structured real-time chat state and reusable message components with clear module boundaries.",
    ],
    challenges: [
      "Balancing strict architectural boundaries with responsive real-time chat state updates.",
    ],
    outcome: [
      "Established a scalable, maintainable codebase with reusable components and predictable error handling.",
    ],
    techStack: [
      "Flutter",
      "Dart",
      "Clean Architecture",
      "Feature-First",
      "Dependency Injection",
      "Design Systems",
    ],
    links: {
      github: "https://github.com/Aboody241",
    },
    screenshots: [],
    featured: true,
  },
  {
    slug: "4p-smart-office",
    title: "4P Smart Office",
    subtitle: "System Integration & Real-time Applications",
    summary:
      "Connected smart-office mobile application integrating Flutter with REST APIs, WebSockets, and device/simulator state synchronization.",
    role: "System Integration & Real-time Applications",
    overview:
      "4P Smart Office is a connected-systems application focused on real-time device status updates and multi-service integration from a Flutter client.",
    problem:
      "Smart-environment applications must coordinate asynchronous events across APIs, WebSocket channels, and device or simulator endpoints while keeping UI state accurate.",
    solution:
      "Implemented Flutter integration layers communicating with backend APIs and WebSocket streams to handle real-time state updates across connected components.",
    myRole: [
      "Built Flutter application modules for real-time status monitoring and control.",
      "Integrated REST APIs and WebSocket communication for live state updates.",
      "Tested integration flows against both external services and device simulators.",
    ],
    engineering: [
      "Managed real-time WebSocket event streams alongside standard HTTP/REST requests.",
      "Handled multiple device and connection states cleanly in the application layer.",
      "Separated real service integrations from simulator test harnesses without exposing private endpoints.",
    ],
    challenges: [
      "Keeping UI state consistent during WebSocket reconnects and asynchronous device updates.",
    ],
    outcome: [
      "Delivered reliable real-time communication and multi-state handling across connected components.",
    ],
    techStack: [
      "Flutter",
      "Dart",
      "WebSockets",
      "REST APIs",
      "IoT Integration",
      "Real-time State",
    ],
    links: {
      github: "https://github.com/Aboody241",
    },
    screenshots: [],
    featured: true,
  },
];
