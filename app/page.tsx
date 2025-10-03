import Header from './components/Header'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Hobbies from './components/Hobbies'
import Projects from './components/Projects'
import ContactForm from './components/Contact'
import Footer from './components/Footer'

export default function Page() {
  return (
    <>
      <Header />

      <div className="container">

        <Hero />
        <section className="section">
          <div className="col-8">
            <div className="card">
              <h3 className="h3">Bienvenue sur mon portfolio</h3>
              <p>
                Étudiante à la web@caémie by Epitech, je suis passionnée de développement Frontend. 
                J'ai également de l'expérience en développement Backend grâce à ma formation et mon expérience professionnelle.
              </p>
            </div>

            <div className="spacer" />
            <Projects />
          </div>

          <div className="col-4">
            <div className="cards-row">
              <Experience />
              <Education />
            </div>

            <div className="spacer" />

            <div className="cards-row">
              <Skills />
              <Hobbies />
            </div>
          </div>
        </section>

        <section className="section-contact">
          <ContactForm />
        </section>
      </div>

      <Footer />
    </>
  )
}

