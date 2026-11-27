import type { Metadata } from "next";
import { Ubuntu, IBM_Plex_Mono } from "next/font/google";
import { IntroOverlay } from "@/components/ui/IntroOverlay";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://abdullah-se.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Abdullah Essam — General Software Engineer",
  description:
    "Software Engineering portfolio of Abdullah Essam. Building reliable software applications across mobile, backend, and connected systems.",
  openGraph: {
    title: "Abdullah Essam — General Software Engineer",
    description:
      "Building reliable software through thoughtful engineering, practical problem-solving, and continuous learning.",
    type: "website",
  },
};

const introGuardScript = `
(function () {
  try {
    var seen = sessionStorage.getItem('portfolio_intro_seen') === '1';
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!seen && !reduced) {
      document.documentElement.dataset.intro = 'playing';
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ubuntu.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introGuardScript }} />
      </head>
      <body className="bg-bg-1 text-white font-sans antialiased">
        <IntroOverlay />
        {children}
      </body>
    </html>
  );
}

