import { useEffect, useState } from 'react'
import './App.css'

function Copy({ text }) {
  const [copied, setCopied] = useState(false)
  return (
    <button className="copy" onClick={() => {
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    }}>{copied ? 'Copié ✓' : 'Copier'}</button>
  )
}

function Code({ children }) {
  return <pre className="code"><code>{children}</code></pre>
}

function App() {
  const steps = [
    {
      title: '👶 Étape 1 — Inès, on code un petit site !',
      body: (
        <>
          <p className="lead">Inès, c’est comme construire une petite cabane magique ✨. On utilise Vite pour créer super vite un site.</p>
          <Code>{`npm create vite@latest mon-site -- --template react
cd mon-site
npm install
npm run dev`}</Code>
          <Copy text={`npm create vite@latest mon-site -- --template react`} />
          <p className="note">Astuce: ouvre le lien sur le terminal pour voir ton site tout neuf 🏡.</p>
        </>
      )
    },
    {
      title: '🕵️ Étape 2 — On regarde ce qu’on a fait',
      body: (
        <>
          <p className="lead">Tape <code>npm run dev</code> et ouvre l’adresse locale. Si tu vois ta page, youpi 🎉!</p>
          <p>Tu peux changer le texte et sauvegarder: la page se met à jour toute seule (comme par magie 🧙‍♂️).</p>
        </>
      )
    },
    {
      title: '🚀 Étape 3 — On emballe et on met sur Internet',
      body: (
        <>
          <p className="lead">On fait une boîte cadeau (le dossier <code>dist</code>) puis on la dépose chez Netlify.</p>
          <Code>{`npm run build`}</Code>
          <p>
            Va sur <a href="https://app.netlify.com/drop" target="_blank">Netlify Drop</a> et glisse-dépose le dossier <code>dist</code>. Ton site devient public en quelques secondes ⚡.
          </p>
        </>
      )
    },
    {
      title: '🛒 Étape 4 — On achète un joli nom',
      body: (
        <>
          <p className="lead">Choisis un nom mignon, comme <code>mon-super-site.fr</code> 🌈.</p>
          <p>Prends-le chez un vendeur de noms (Gandi, OVHcloud, Namecheap…). Garde l’accès au “DNS”.</p>
        </>
      )
    },
    {
      title: '🔗 Étape 5 — On relie le nom à notre site',
      body: (
        <>
          <p className="lead">Chez ton vendeur de nom, ajoute deux petits réglages (DNS) pour Netlify:</p>
          <ul className="bullets">
            <li><strong>www</strong> → CNAME vers <code>ton-site.netlify.app</code> (remplace par le nom Netlify de ton site).</li>
            <li><strong>apex</strong> (<code>monsite.com</code>) → A record vers <code>75.2.60.5</code>.</li>
          </ul>
          <p className="note">Ça peut prendre un peu de temps (quelques minutes à 24h). Ensuite, Netlify met le cadenas SSL tout seul 🔒.</p>
          <p>
            Envie d’un autre hébergeur plus tard ? Vercel marche pareil: <strong>apex</strong> → A <code>76.76.21.21</code>, <strong>www</strong> → CNAME <code>cname.vercel-dns.com</code>.
          </p>
        </>
      )
    },
    {
      title: '🎉 Étape 6 — Bravo champion !',
      body: (
        <>
          <p className="lead">Ton site a un vrai nom et il vit sur Internet 🥳.</p>
          <p>Tu peux montrer ta création à tout le monde. Ensuite, amuse-toi à changer couleurs, textes, et ajoute des images !</p>
          <p>Besoin d’aide ? Regarde les docs: <a href="https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/" target="_blank">Netlify</a> • <a href="https://vercel.com/guides/a-record-and-caa-with-vercel" target="_blank">Vercel</a>.</p>
        </>
      )
    }
  ]

  const [i, setI] = useState(0)

  useEffect(() => {
    const s = Number(localStorage.getItem('dns-teaching-step') || 0)
    setI(Number.isFinite(s) ? Math.min(Math.max(s, 0), steps.length - 1) : 0)
  }, [])
  useEffect(() => {
    localStorage.setItem('dns-teaching-step', String(i))
  }, [i])

  const percent = Math.round(((i + 1) / steps.length) * 100)

  return (
    <div className="wrap">
      <nav className="top">
        <div className="brand">DNS Teaching (mode enfant)</div>
        <div className="progress">
          <div className="bar" style={{ width: percent + '%' }} />
          <span>Étape {i + 1}/{steps.length}</span>
        </div>
      </nav>

      <main>
        <h1>Bonjour Inès 👋</h1>
        <p className="intro">Tu veux apprendre à héberger ton site ? Super idée ! On va t’accompagner pas à pas: on code, on le met en ligne, on achète un joli nom, et on relie ce nom à ton site. Clique sur “Suivant” pour commencer ✨</p>

        <section className="step">
          <header className="step-header">
            <div className="badge">{i + 1}</div>
            <h2>{steps[i].title}</h2>
          </header>
          <div className="step-body">
            {steps[i].body}
          </div>
          <div className="actions">
            <button className="next" onClick={() => setI(Math.max(i - 1, 0))} disabled={i === 0}>← Revenir</button>
            <button className="next" onClick={() => setI(Math.min(i + 1, steps.length - 1))}>{i === steps.length - 1 ? 'Terminé 🎈' : 'Suivant →'}</button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
