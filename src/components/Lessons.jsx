import { useState } from 'react'

const sampleLessons = [
  { id: 'vocab-space', title: 'Space Vocabulary', level: 'A2', activities: 5, color: 'from-indigo-500 to-purple-500' },
  { id: 'grammar-past', title: 'Past Tense Practice', level: 'A2-B1', activities: 6, color: 'from-rose-500 to-orange-500' },
  { id: 'reading-club', title: 'Reading Club: Short Story', level: 'B1', activities: 4, color: 'from-emerald-500 to-teal-500' },
]

function Lessons() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="lessons" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Activity‑Based Lessons</h2>
        <p className="text-gray-600 mt-2">Build vocabulary, grammar, reading, writing, and speaking through interactive tasks.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {sampleLessons.map((l) => (
            <button key={l.id} onClick={() => setSelected(l)} className={`rounded-xl p-6 text-left shadow bg-gradient-to-br ${l.color} text-white transition hover:scale-[1.01]`}>
              <h3 className="text-xl font-bold">{l.title}</h3>
              <p className="text-sm mt-2 opacity-90">Level: {l.level}</p>
              <p className="text-sm">{l.activities} activities</p>
            </button>
          ))}
        </div>

        {selected && (
          <div className="mt-8 rounded-xl bg-white border p-6">
            <h4 className="text-lg font-semibold">{selected.title}</h4>
            <p className="text-gray-600 mt-1">Try a quick practice question below.</p>
            <QuickQuiz lesson={selected} />
          </div>
        )}
      </div>
    </section>
  )
}

function QuickQuiz({ lesson }) {
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async () => {
    const res = await fetch(`${baseUrl}/lessons/activity/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_id: 'demo',
        lesson_id: lesson.id,
        activity_id: 'quick-1',
        answers: { a1: answer }
      })
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <div className="mt-4">
      <label className="text-sm text-gray-700">Write one sentence using the word "journey".</label>
      <div className="mt-2 flex gap-2">
        <input value={answer} onChange={(e) => setAnswer(e.target.value)} className="flex-1 rounded-lg border px-3 py-2" placeholder="Your sentence" />
        <button onClick={submit} className="rounded-lg bg-indigo-600 text-white px-4 py-2 font-semibold">Submit</button>
      </div>
      {result && (
        <div className="mt-3 rounded-lg bg-indigo-50 border border-indigo-200 p-3 text-sm text-indigo-800">
          Score: <span className="font-semibold">{result.score}%</span>
          <div className="mt-1">{result.feedback.map((f, i) => (<p key={i}>• {f}</p>))}</div>
        </div>
      )}
    </div>
  )
}

export default Lessons
