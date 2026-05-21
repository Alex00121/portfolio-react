import { motion } from 'framer-motion'
import type { Product } from '../data/products'
import ProductCard from './ProductCard'
import { ShoppingBag } from 'lucide-react'

interface ProductGridProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const card = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-24 flex flex-col items-center gap-4 text-gray-400">
        <ShoppingBag className="w-14 h-14 opacity-30" />
        <p className="font-semibold text-lg">Aucun produit dans cette catégorie</p>
        <p className="text-sm">Essayez une autre catégorie</p>
      </div>
    )
  }

  return (
    <motion.div
      key={products.map((p) => p.id).join(',')}
      variants={grid}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={card}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </motion.div>
      ))}
    </motion.div>
  )
}
