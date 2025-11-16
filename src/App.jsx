import Hero from './components/Hero'
import Tutor from './components/Tutor'
import Lessons from './components/Lessons'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="min-h-screen w-full bg-white">
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-extrabold tracking-tight text-indigo-700">FluentTeens</a>
          <nav className="hidden sm:flex items-center gap-6 text-sm font-semibold text-gray-700">
            <a href="#tutor" className="hover:text-indigo-700">Tutor</a>
            <a href="#lessons" className="hover:text-indigo-700">Lessons</a>
            <a href="#progress" className="hover:text-indigo-700">Progress</a>
          </nav>
          <a href="#tutor" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold">Start Learning</a>
        </div>
      </header>

      <main>
        <Hero />
        <Tutor />
        <Lessons />
        <section id="progress"><Dashboard /></section>
      </main>

      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-6 py-8 text-sm text-gray-600">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p>Safe, ad‑free learning environment. Privacy‑first for young learners.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-900">Privacy</a>
              <a href="#" className="hover:text-gray-900">Terms</a>
              <a href="#" className="hover:text-gray-900">Parent Guide</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
