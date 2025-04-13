import { FC } from 'react'
import { MenuCategory } from '../data/menuData'

type Props = {
  categories: MenuCategory[]
  selectedCategory: string | null
  onSelect: (category: string | null) => void
}

const CategoryFilter: FC<Props> = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="mb-4 flex flex-wrap gap-3">
      <button
        onClick={() => onSelect(null)}
        className={`rounded px-4 py-2 ${
          selectedCategory === null ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.category)}
          className={`rounded px-4 py-2 ${
            selectedCategory === cat.category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {cat.category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
