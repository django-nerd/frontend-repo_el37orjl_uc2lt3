import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-gradient-to-b from-white via-indigo-50 to-white">
      <div className="absolute inset-0 opacity-90">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 container mx-auto px-6 py-16 flex flex-col items-center text-center">
        <span className="inline-block rounded-full bg-indigo-100 text-indigo-700 px-4 py-1 text-sm font-semibold mb-4">AI English for Ages 10–15</span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          Learn English with your own AI Tutor
        </h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg text-gray-600">
          Speak, write, and read with confidence. Real‑time feedback on pronunciation and grammar, adaptive lessons, and fun activities.
        </p>
        <div className="mt-8 flex gap-4">
          <a href="#tutor" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow">
            Try the AI Tutor
          </a>
          <a href="#lessons" className="bg-white/80 hover:bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold shadow border">
            Explore Lessons
          </a>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white" />
    </section>
  )
}

export default Hero
