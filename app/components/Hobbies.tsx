export default function Hobbies() {
  const hobbies = ["Musique alternative", "Littérature fantastique", "Création plastique"]
  return (
    <aside id="skills" className="card" style={{ marginTop: '1rem' }}>
      <h3 className="h3">Loisirs</h3>
      <div className="skill-grid">
        {hobbies.map((s) => <div className="skill" key={s}>{s}</div>)}
      </div>
    </aside>
  )
}
