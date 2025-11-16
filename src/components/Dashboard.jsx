import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch(`${baseUrl}/progress/demo`).then(r => r.json()).then(setStats).catch(() => setStats({ error: true }))
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Progress Dashboard</h2>
        <p className="text-gray-600 mt-2">Track vocabulary growth, practice time, and pronunciation quality.</p>

        {!stats ? (
          <p className="mt-6 text-gray-500">Loading progress...</p>
        ) : stats.error ? (
          <p className="mt-6 text-red-600">Unable to load progress right now.</p>
        ) : (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Activities Completed" value={stats.vocabulary_growth} suffix=" total" color="indigo" />
            <Card title="Messages Exchanged" value={stats.messages_exchanged} suffix=" chats" color="emerald" />
            <Card title="Pronunciation Score" value={Math.round((stats.avg_pronunciation_similarity || 0) * 100)} suffix="%" color="violet" />
            <Card title="Current Level" value="Adaptive" suffix="" color="rose" />
          </div>
        )}
      </div>
    </section>
  )
}

function Card({ title, value, suffix, color }) {
  const colors = {
    indigo: 'from-indigo-500 to-purple-500',
    emerald: 'from-emerald-500 to-teal-500',
    violet: 'from-violet-500 to-fuchsia-500',
    rose: 'from-rose-500 to-orange-500'
  }
  return (
    <div className={`rounded-xl p-6 text-white bg-gradient-to-br ${colors[color]} shadow`}>
      <p className="text-sm/5 opacity-90">{title}</p>
      <p className="mt-2 text-3xl font-extrabold">{value}<span className="text-lg font-semibold ml-1">{suffix}</span></p>
    </div>
  )
}

export default Dashboard
