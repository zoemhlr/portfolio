export default function Skills() {
  const skills = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Figma', 'Python', 'Symfony']
  return (
    <aside id="skills" className="card" style={{ marginTop: '1rem' }}>
      <h3 className="h3">Compétences</h3>
      <div className="skill-grid">
        {skills.map((s) => <div className="skill" key={s}>{s}</div>)}
      </div>
    </aside>
  )
}
