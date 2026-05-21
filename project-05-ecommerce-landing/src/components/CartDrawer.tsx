import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import type { Product } from '../data/products'

export interface CartItem {
  product: Product
  qty: number
}

interface CartDrawerProps {
  isOpen: boolean
  items: CartItem[]
  onClose: () => void
  onQtyChange: (id: number, delta: number) => void
  onRemove: (id: number) => void
}

export default function CartDrawer({ isOpen, items, onClose, onQtyChange, onRemove }: CartDrawerProps) {
  const subtotal = items.reduce((sum, { product, qty }) => sum + product.price * qty, 0)
  const shipping = subtotal >= 49 ? 0 : 4.99
  const total = subtotal + shipping

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-bold text-heading">Mon panier</h2>
                {items.length > 0 && (
                  <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.reduce((s, i) => s + i.qty, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 active:scale-95"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center gap-4 py-20 text-gray-400">
                  <ShoppingBag className="w-14 h-14 opacity-20" />
                  <p className="font-semibold">Votre panier est vide</p>
                  <button
                    onClick={onClose}
                    className="text-sm text-accent font-medium hover:underline"
                  >
                    Continuer les achats →
                  </button>
                </div>
              ) : (
                items.map(({ product, qty }) => (
                  <div key={product.id} className="flex gap-4 p-3 rounded-xl border border-gray-100 bg-gray-50">
                    <div className={`w-16 h-16 flex-shrink-0 rounded-xl bg-gradient-to-br ${product.gradient}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-accent font-medium">{product.category}</p>
                      <p className="text-sm font-semibold text-heading leading-snug truncate">{product.name}</p>
                      <p className="text-sm font-bold text-heading mt-1">{(product.price * qty).toFixed(2)} €</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => onRemove(product.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg">
                        <button
                          onClick={() => onQtyChange(product.id, -1)}
                          className="p-1.5 hover:bg-gray-100 rounded-l-lg transition-colors duration-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">{qty}</span>
                        <button
                          onClick={() => onQtyChange(product.id, 1)}
                          className="p-1.5 hover:bg-gray-100 rounded-r-lg transition-colors duration-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-gray-100 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Livraison</span>
                    <span className={shipping === 0 ? 'text-emerald-600 font-medium' : ''}>
                      {shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} €`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-400">
                      Encore {(49 - subtotal).toFixed(2)} € pour la livraison gratuite
                    </p>
                  )}
                  <div className="flex justify-between font-bold text-heading text-base pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-accent text-white font-semibold py-4 rounded-xl hover:bg-indigo-700 transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-200">
                  Finaliser la commande
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full text-sm text-gray-500 hover:text-accent font-medium transition-colors duration-200 text-center"
                >
                  Continuer les achats
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
