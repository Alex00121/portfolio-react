import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Star, Check } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '../data/products'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="w-3.5 h-3.5"
          fill={star <= Math.round(rating) ? '#f59e0b' : 'none'}
          stroke={star <= Math.round(rating) ? '#f59e0b' : '#d1d5db'}
        />
      ))}
    </div>
  )
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [added, setAdded] = useState(false)

  function handleAdd() {
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      {/* Image area */}
      <div className={`relative h-52 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
        {product.badge && (
          <span className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/30">
            {product.badge}
          </span>
        )}
        <div className="w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <ShoppingCart className="w-8 h-8 text-white/70" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-medium text-accent uppercase tracking-wide mb-1">{product.category}</p>
        <h3 className="font-semibold text-heading text-sm leading-snug mb-2">{product.name}</h3>

        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-extrabold text-heading">
            {product.price.toFixed(2)} €
          </span>

          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 ${
              added
                ? 'bg-emerald-500 text-white'
                : 'bg-accent text-white hover:bg-indigo-700'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  Ajouté
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Ajouter
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  )
}
