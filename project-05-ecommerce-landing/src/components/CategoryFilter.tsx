import { categories, type Category } from '../data/products'

interface CategoryFilterProps {
  active: Category
  onChange: (cat: Category) => void
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95 ${
            active === cat
              ? 'bg-accent text-white shadow-md shadow-indigo-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
