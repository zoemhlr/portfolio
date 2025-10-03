export interface Project {
  id: number
  title: string
  meta: string
  img: string
  github?: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Maison Midori',
    meta: 'Java',
    img: '/maison-midori.png',
    github: 'https://github.com/EpitechWebAcademiePromo2025/W-WEB-842-PAR-4-1-java-zoe.mahler',
  },
  {
    id: 2,
    title: 'Gamaza',
    meta: 'Projet en équipe (rôle: UX/UI-Frontend, React, TailwindCSS)',
    img: '/gamaza.png',
    github: 'https://github.com/EpitechWebAcademiePromo2025/W-WEB-502-PAR-2-1-ecommerce-aymeric.trinh'
  },
  {
    id: 3,
    title: 'Omega',
    meta: 'Design',
    img: '/omega.png',
    github: 'https://github.com/EpitechWebAcademiePromo2025/W-MUL-130-PAR-2-1-maquette-zoe.mahler'
  }
]
