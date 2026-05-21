import { ShoppingCart, Zap, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface NavbarProps {
  cartCount: number
  onCartOpen: () => void
}

export default function Navbar({ cartCount, onCartOpen }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-accent" fill="#6366f1" />
          <span className="text-xl font-extrabold text-heading tracking-tight">
            Shop<span className="text-accent">Wave</span>
          </span>
        </div>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {['Accueil', 'Catalogue', 'Promotions', 'À propos'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-accent transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Cart + hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCartOpen}
            className="relative p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 active:scale-95"
            aria-label="Panier"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center bg-accent text-white text-xs font-bold rounded-full">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4">
          {['Accueil', 'Catalogue', 'Promotions', 'À propos'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-accent transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
