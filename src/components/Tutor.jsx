import { useEffect, useRef, useState } from 'react'
import { Mic, MicOff, Send } from 'lucide-react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Tutor() {
  const [listening, setListening] = useState(false)
  const [supported, setSupported] = useState(true)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{ role: 'tutor', text: 'Hi! Tell me about your day in two sentences.' }])
  const recognitionRef = useRef(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setSupported(false)
      return
    }
    const recog = new SpeechRecognition()
    recog.lang = 'en-US'
    recog.interimResults = true
    recog.onresult = (e) => {
      let final = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i]
        if (result.isFinal) final += result[0].transcript
      }
      if (final) setInput(prev => (prev ? prev + ' ' : '') + final)
    }
    recog.onend = () => setListening(false)
    recognitionRef.current = recog
  }, [])

  const toggleMic = () => {
    if (!recognitionRef.current) return
    if (listening) {
      recognitionRef.current.stop()
      setListening(false)
    } else {
      setInput('')
      setListening(true)
      recognitionRef.current.start()
    }
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text) return
    const newMsgs = [...messages, { role: 'user', text }]
    setMessages(newMsgs)
    setInput('')
    try {
      const res = await fetch(`${baseUrl}/tutor/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'tutor', text: data.reply, notes: data.grammar_notes }])
    } catch (e) {
      setMessages((prev) => [...prev, { role: 'tutor', text: "I'm having trouble connecting right now. Try again soon." }])
    }
  }

  return (
    <section id="tutor" className="py-12 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Interactive AI Tutor</h2>
        <p className="text-gray-600 mt-2">Talk or type. Get friendly tips on grammar and pronunciation in real time.</p>

        <div className="mt-6 rounded-xl border bg-gray-50 p-4">
          <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white'} rounded-lg px-4 py-2 shadow max-w-[80%]`}>
                  <p className="text-sm">{m.text}</p>
                  {m.notes && m.notes.length > 0 && (
                    <ul className="mt-2 text-xs text-indigo-700 list-disc pl-4">
                      {m.notes.map((n, i) => (
                        <li key={i}>{n}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button onClick={toggleMic} className={`flex items-center gap-2 rounded-lg px-3 py-2 border ${listening ? 'bg-red-50 text-red-700 border-red-300' : 'bg-white text-gray-700'} `} disabled={!supported}>
              {listening ? <MicOff size={18} /> : <Mic size={18} />}
              {supported ? (listening ? 'Stop' : 'Speak') : 'Speech not supported'}
            </button>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type here..." className="flex-1 rounded-lg border px-3 py-2 bg-white" />
            <button onClick={sendMessage} className="rounded-lg bg-indigo-600 text-white px-4 py-2 font-semibold flex items-center gap-2">
              <Send size={18} /> Send
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tutor
