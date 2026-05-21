import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

interface HeroProps {
  onShopNow: () => void
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero({ onShopNow }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white pt-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/2 left-10 w-48 h-48 bg-pink-100 rounded-full blur-2xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={item} className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-accent text-sm font-semibold px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4" />
            Nouvelle collection printemps 2026
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-heading tracking-tight leading-none mb-6"
          >
            Le style qui{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              vous définit
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Découvrez une sélection premium de vêtements, électronique, articles de maison et sport.
            Qualité irréprochable, livraison rapide, satisfaction garantie.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onShopNow}
              className="group flex items-center gap-2 bg-accent text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-700 transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-200"
            >
              Explorer le catalogue
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button className="flex items-center gap-2 bg-white text-heading font-semibold px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-accent hover:text-accent transition-all duration-200 active:scale-95">
              Voir les promotions
            </button>
          </motion.div>

          <motion.div variants={item} className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['bg-indigo-400', 'bg-pink-400', 'bg-amber-400', 'bg-emerald-400'].map((c, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-white`} />
                ))}
              </div>
              <span><strong className="text-heading">12 400+</strong> clients satisfaits</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-200" />
            <div>⭐ <strong className="text-heading">4.8/5</strong> de note moyenne</div>
            <div className="hidden sm:block w-px h-6 bg-gray-200" />
            <div>🚚 Livraison <strong className="text-heading">gratuite</strong> dès 49 €</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
