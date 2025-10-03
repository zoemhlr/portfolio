"use client"

import { useState } from "react"
import { projects } from "../data/projects"

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="projects" className="projects-section">
      <h3 className="h3 projects-title">Projets</h3>

      <div className="projects-grid">
        {projects.map((p) => (
          <article
            key={p.id}
            role="article"
            aria-labelledby={`p-${p.id}`}
            className="project-card"
          >
            <div>
              <div id={`p-${p.id}`} className="project-title">
                {p.title}
              </div>
              <div className="project-meta">{p.meta}</div>
              {p.description && (
                <p className="project-description">{p.description}</p>
              )}
            </div>

            <div
              className={`project-image-wrapper ${hovered === p.id ? "hovered" : ""}`}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="project-image-inner">
                <img src={p.img} alt={p.title} className="project-image" />
                <div
                  aria-hidden={hovered !== p.id}
                  className="project-overlay"
                >
                  <a
                    href={p.github ?? "#"}
                    target={p.github ? "_blank" : undefined}
                    rel={p.github ? "noopener noreferrer" : undefined}
                    aria-label={p.github ? `Open ${p.title} on GitHub` : `No GitHub link`}
                    className={`btn black ${hovered === p.id ? "visible" : ""}`}
                  >
                    Github
                  </a>
                </div>
              </div>
            </div>

            <div className="project-links">
              {p.demo && (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn white"
                >
                  Live
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
