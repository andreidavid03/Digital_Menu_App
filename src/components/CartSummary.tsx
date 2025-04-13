import { FC } from 'react'
import { Product } from '../data/menuData'

type CartItem = Product & { quantity: number }

type Props = {
  cart: CartItem[]
}

const CartSummary: FC<Props> = ({ cart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="mt-10 rounded-md bg-gray-100 p-4">
      <h2 className="mb-3 text-xl font-bold">🛒 Order Summary</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="mb-4 space-y-2">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between text-sm">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>{(item.price * item.quantity).toFixed(2)} RON</span>
            </li>
          ))}
        </ul>
      )}
      <div className="text-right text-lg font-semibold">Total: {total.toFixed(2)} RON</div>
    </div>
  )
}

export default CartSummary
