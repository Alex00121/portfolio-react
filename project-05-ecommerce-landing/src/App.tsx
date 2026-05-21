import { useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategoryFilter from './components/CategoryFilter'
import ProductGrid from './components/ProductGrid'
import CartDrawer, { type CartItem } from './components/CartDrawer'
import { products } from './data/products'
import type { Category, Product } from './data/products'

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('Tous')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const catalogRef = useRef<HTMLElement>(null)

  function handleAddToCart(product: Product) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { product, qty: 1 }]
    })
  }

  function handleQtyChange(id: number, delta: number) {
    setCartItems((prev) =>
      prev
        .map((i) => i.product.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    )
  }

  function handleRemove(id: number) {
    setCartItems((prev) => prev.filter((i) => i.product.id !== id))
  }

  function scrollToCatalog() {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0)

  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <Hero onShopNow={scrollToCatalog} />

      {/* Catalog section */}
      <section ref={catalogRef} id="catalogue" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-heading tracking-tight mb-2">Nos produits</h2>
          <p className="text-gray-500">
            {activeCategory === 'Tous'
              ? `${products.length} articles disponibles`
              : `${products.filter((p) => p.category === activeCategory).length} articles dans ${activeCategory}`}
          </p>
        </div>

        <div className="mb-8">
          <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        </div>

        <ProductGrid
          products={products}
          activeCategory={activeCategory}
          onAddToCart={handleAddToCart}
        />
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 text-center text-sm text-gray-400">
        <p className="font-semibold text-heading mb-1">ShopWave</p>
        <p>© 2026 ShopWave. Tous droits réservés.</p>
      </footer>

      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onQtyChange={handleQtyChange}
        onRemove={handleRemove}
      />
    </div>
  )
}
