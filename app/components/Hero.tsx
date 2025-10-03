export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="avatar">
          <img
            src="/profile.jpg"
            alt="photo de profil de Zoé Mahler"
          />
        </div>

        <div>
          <h1 className="title">Zoé Mahler</h1>
          <p className="subtitle">Développeuse Frontend.</p>
          <div className="hero-actions">
            <a
              className="btn black"
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ouvrir le CV de Zoé Mahler dans un nouvel onglet"
            >
              Voir le CV
            </a>

            <a
              className="btn white"
              href="https://github.com/zoemhlr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Voir le profil GitHub de Zoé Mahler"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <aside className="aside"></aside>
    </section>
  )
}
