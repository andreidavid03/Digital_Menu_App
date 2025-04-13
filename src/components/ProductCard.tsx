import { FC } from 'react'

type Product = {
  id: string
  name: string
  description: string
  price: number
  available: boolean
}

type Props = {
  product: Product
  onToggleAvailability?: (id: string) => void
  onAddToCart?: (product: Product) => void
}

const ProductCard: FC<Props> = ({ product, onToggleAvailability, onAddToCart }) => {
  return (
    <div className="flex flex-col justify-between rounded-lg bg-white p-4 shadow-md transition hover:scale-[1.01]">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <span
            className={`size-3 rounded-full ${product.available ? 'bg-green-500' : 'bg-red-500'}`}
            title={product.available ? 'Available' : 'Not Available'}
          ></span>
        </div>
        <p className="mb-2 text-sm text-gray-600">{product.description}</p>
        <p className="text-lg font-bold">{product.price} RON</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          className={`rounded px-4 py-2 text-sm ${
            product.available
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'cursor-not-allowed bg-gray-300 text-gray-600'
          }`}
          onClick={() => product.available && onAddToCart?.(product)}
          disabled={!product.available}
        >
          Add to Order
        </button>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={product.available}
            onChange={() => onToggleAvailability?.(product.id)}
            className="accent-blue-500"
          />
          Available
        </label>
      </div>
    </div>
  )
}

export default ProductCard
