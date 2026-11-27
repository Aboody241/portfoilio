"use client";

import React, { useState } from "react";
import { Mail, Send } from "lucide-react";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { ModuleTitle } from "@/components/ui/ModuleTitle";
import { Button } from "@/components/ui/Button";
import { profile } from "@/content/profile";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 px-5 sm:px-8 lg:px-12 bg-bg-2"
    >
      <div className="max-w-4xl mx-auto">
        <ModuleTitle
          title="Contact"
          subtitle="Open to software engineering and application development opportunities"
        />

        <div className="flex justify-center mb-10">
          <div className="inline-block border-2 border-brand-1 rounded-tl-3xl rounded-br-3xl px-8 py-3">
            <h3 className="font-mono text-xl sm:text-3xl text-brand-1">
              Send Me A Message
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="contact-name"
                className="block font-mono text-sm text-brand-1 mb-2"
              >
                Your name *
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-transparent border-b border-brand-2/60 focus:border-brand-1 py-2.5 text-white placeholder:text-white/45 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block font-mono text-sm text-brand-1 mb-2"
              >
                Your email *
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent border-b border-brand-2/60 focus:border-brand-1 py-2.5 text-white placeholder:text-white/45 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block font-mono text-sm text-brand-1 mb-2"
            >
              Your message *
            </label>
            <textarea
              id="contact-message"
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about the role, project, or engineering problem"
              className="w-full bg-transparent border-b border-brand-2/60 focus:border-brand-1 py-2.5 text-white placeholder:text-white/45 focus:outline-none transition-colors resize-y"
            />
          </div>

          <div className="flex flex-col items-center gap-4 pt-2">
            <Button type="submit" variant="primary">
              <span>Send Message</span>
              <Send className="w-4 h-4" aria-hidden="true" />
            </Button>

            {submitted && (
              <p className="font-mono text-xs text-brand-2 text-center">
                Opening your email client. You can also reach out via GitHub or
                email directly below.
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm font-mono text-white/80">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-brand-1 transition-colors"
              >
                <GitHubIcon className="w-4 h-4 text-brand-1" />
                <span>github.com/Aboody241</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 hover:text-brand-1 transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-1" aria-hidden="true" />
                <span>{profile.email}</span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
