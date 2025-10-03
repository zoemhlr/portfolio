"use client"

import { useRef, useState } from "react"
import emailjs from "@emailjs/browser"

export default function Contact() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const formRef = useRef<HTMLFormElement | null>(null)

  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ""
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ""
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    const start = Date.now()

    try {
      const templateParams = {
        from_name: name,
        from_email: email,
        message,
        reply_to: email
      }

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

      const elapsed = Date.now() - start
      const remaining = 3000 - elapsed
      if (remaining > 0) await new Promise(r => setTimeout(r, remaining))

      setStatus("success")
      setMessage("")
      setEmail("")
      setName("")
      setTimeout(() => setOpen(false), 2500)
    } catch {
      const elapsed = Date.now() - start
      const remaining = 3000 - elapsed
      if (remaining > 0) await new Promise(r => setTimeout(r, remaining))
      setStatus("error")
    }
  }

  const handleClose = () => {
    setOpen(false)
    setStatus("idle")
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-card">
        <h3 className="h3">Contact</h3>

        <p className="contact-description">
          J'aimerais beaucoup avoir de vos nouvelles. Cliquez sur le bouton ci-dessous pour m'envoyer un e-mail directement.
        </p>

        {!open && (
          <button className="btn black" onClick={() => setOpen(true)}>
            Me Contacter
          </button>
        )}

        <div
          data-testid="contact-form-wrapper"
          className={`contact-form-wrapper ${open ? "open" : ""}`}
        >
          {status === "sending" && (
            <div className="spinner-wrapper" data-testid="spinner">
              <div className="spinner">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="spinner-dot" style={{ animationDelay: `${i * 0.28}s` }} />
                ))}
              </div>
            </div>
          )}

          {status !== "sending" && (
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <textarea
                name="message"
                placeholder="Votre message…"
                required
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <div className="form-buttons">
                <button type="submit" className="btn black">Envoyer</button>
                <button type="button" className="btn white" onClick={handleClose}>Annuler</button>
              </div>
            </form>
          )}

          {(status === "success" || status === "error") && (
            <p className={`status-message ${status}`}>
              {status === "success" ? "Votre message a été envoyé avec succès ! Merci." : "Une erreur est survenue. Veuillez réessayer."}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
