export type Category = 'Tous' | 'Vêtements' | 'Électronique' | 'Maison' | 'Sport'

export interface Product {
  id: number
  name: string
  category: Exclude<Category, 'Tous'>
  price: number
  rating: number
  reviewCount: number
  gradient: string
  badge?: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Veste Minimaliste Oversize',
    category: 'Vêtements',
    price: 89.99,
    rating: 4.8,
    reviewCount: 312,
    gradient: 'from-slate-700 to-slate-900',
    badge: 'Nouveau',
  },
  {
    id: 2,
    name: 'T-Shirt Coton Bio Premium',
    category: 'Vêtements',
    price: 34.99,
    rating: 4.6,
    reviewCount: 521,
    gradient: 'from-stone-400 to-stone-600',
  },
  {
    id: 3,
    name: 'Jean Coupe Slim Modern',
    category: 'Vêtements',
    price: 69.99,
    rating: 4.5,
    reviewCount: 204,
    gradient: 'from-blue-700 to-blue-900',
  },
  {
    id: 4,
    name: 'Casque Audio Sans-Fil Pro',
    category: 'Électronique',
    price: 179.99,
    rating: 4.9,
    reviewCount: 887,
    gradient: 'from-indigo-500 to-purple-700',
    badge: 'Bestseller',
  },
  {
    id: 5,
    name: 'Montre Connectée Sport',
    category: 'Électronique',
    price: 249.99,
    rating: 4.7,
    reviewCount: 635,
    gradient: 'from-gray-800 to-gray-950',
  },
  {
    id: 6,
    name: 'Clavier Mécanique RGB',
    category: 'Électronique',
    price: 129.99,
    rating: 4.6,
    reviewCount: 419,
    gradient: 'from-violet-600 to-indigo-800',
  },
  {
    id: 7,
    name: 'Lampe de Bureau LED Design',
    category: 'Maison',
    price: 59.99,
    rating: 4.4,
    reviewCount: 178,
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    id: 8,
    name: 'Plaid Laine Mérinos XL',
    category: 'Maison',
    price: 79.99,
    rating: 4.7,
    reviewCount: 263,
    gradient: 'from-rose-300 to-pink-500',
    badge: 'Top vente',
  },
  {
    id: 9,
    name: 'Carafe en Verre Borosilicaté',
    category: 'Maison',
    price: 44.99,
    rating: 4.3,
    reviewCount: 142,
    gradient: 'from-teal-400 to-cyan-600',
  },
  {
    id: 10,
    name: 'Tapis de Yoga Antidérapant',
    category: 'Sport',
    price: 49.99,
    rating: 4.8,
    reviewCount: 731,
    gradient: 'from-emerald-400 to-green-700',
  },
  {
    id: 11,
    name: 'Gourde Inox Isotherme 750ml',
    category: 'Sport',
    price: 32.99,
    rating: 4.6,
    reviewCount: 489,
    gradient: 'from-sky-400 to-blue-600',
    badge: 'Éco',
  },
  {
    id: 12,
    name: 'Kettlebell Fonte 16 kg',
    category: 'Sport',
    price: 64.99,
    rating: 4.9,
    reviewCount: 197,
    gradient: 'from-zinc-600 to-zinc-900',
  },
]

export const categories: Category[] = ['Tous', 'Vêtements', 'Électronique', 'Maison', 'Sport']
