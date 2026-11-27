import React from "react";
import { Mail } from "lucide-react";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="bg-bg-2 border-t border-grey/70 py-6 px-5 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/75">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>

        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-full bg-brand-2 text-bg-2 flex items-center justify-center hover:bg-brand-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="w-9 h-9 rounded-full bg-brand-2 text-bg-2 flex items-center justify-center hover:bg-brand-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <p className="font-mono text-xs text-white/70">
          {profile.title} · {profile.location}
        </p>
      </div>
    </footer>
  );
}
