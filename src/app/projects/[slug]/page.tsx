import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-1 text-white">
      <Header />
      <main className="flex-1 py-12 md:py-20 px-5 sm:px-8 lg:px-12">
        <article className="max-w-4xl mx-auto space-y-10">
          <div>
            <Link
              href="/#works"
              className="inline-flex items-center gap-2 font-mono text-sm text-brand-1 hover:text-brand-2 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Back to Works</span>
            </Link>

            <p className="font-mono text-sm text-brand-2 mb-2">
              {project.role}
            </p>
            <h1 className="text-3xl sm:text-5xl font-normal text-white mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs bg-bg-2 text-brand-1 border border-grey px-3 py-1.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-bg-2 border border-grey/80 rounded-2xl p-6 space-y-3">
              <h2 className="font-mono text-lg text-brand-1">1. Overview</h2>
              <p className="text-white/85 leading-relaxed">{project.overview}</p>
            </section>

            <section className="bg-bg-2 border border-grey/80 rounded-2xl p-6 space-y-3">
              <h2 className="font-mono text-lg text-brand-1">2. Problem</h2>
              <p className="text-white/85 leading-relaxed">{project.problem}</p>
            </section>
          </div>

          <section className="bg-bg-2 border border-grey/80 rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="font-mono text-lg text-brand-1">3. Solution</h2>
            <p className="text-white/85 leading-relaxed">{project.solution}</p>
          </section>

          <section className="bg-bg-2 border border-grey/80 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="font-mono text-lg text-brand-1">4. My Role</h2>
            <ul className="space-y-2.5 text-white/85">
              {project.myRole.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="font-mono text-brand-1">&gt;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-bg-2 border border-grey/80 rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="font-mono text-lg text-brand-1">5. Engineering</h2>
            <ul className="space-y-2.5 text-white/85">
              {project.engineering.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="font-mono text-brand-1">&gt;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-bg-2 border border-grey/80 rounded-2xl p-6 space-y-3">
              <h2 className="font-mono text-lg text-brand-1">6. Challenges</h2>
              <ul className="space-y-2 text-white/85 text-sm sm:text-base">
                {project.challenges.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="font-mono text-brand-1">&gt;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-bg-2 border border-grey/80 rounded-2xl p-6 space-y-3">
              <h2 className="font-mono text-lg text-brand-1">7. Outcome</h2>
              <ul className="space-y-2 text-white/85 text-sm sm:text-base">
                {project.outcome.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="font-mono text-brand-1">&gt;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {project.links.github && (
            <div className="pt-2">
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-brand-1 text-bg-2 font-mono text-sm font-medium px-6 py-3 hover:bg-brand-2 transition-colors"
              >
                <GitHubIcon className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
