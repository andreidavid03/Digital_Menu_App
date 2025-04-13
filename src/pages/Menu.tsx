import { useState } from 'react'
import { menuData, MenuCategory, Product } from '../data/menuData'
import ProductCard from '../components/ProductCard'
import CartSummary from '../components/CartSummary'
import CategoryFilter from '../components/CategoryFilter'

type CartItem = Product & { quantity: number }

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [productState, setProductState] = useState<MenuCategory[]>(menuData)
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | ''>('')

  const handleToggleAvailability = (productId: string) => {
    const updatedData = productState.map((category) => ({
      ...category,
      products: category.products.map((product) =>
        product.id === productId ? { ...product, available: !product.available } : product
      ),
    }))
    setProductState(updatedData)
  }

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const filteredData = (
    selectedCategory ? productState.filter((c) => c.category === selectedCategory) : productState
  ).map((category) => ({
    ...category,
    products: category.products
      .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortOrder === 'asc') return a.price - b.price
        if (sortOrder === 'desc') return b.price - a.price
        return 0
      }),
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">Menu</h1>

      {/* SEARCH + SORT */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border px-4 py-2 sm:w-1/3"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc' | '')}
          className="rounded-md border px-4 py-2"
        >
          <option value="">Sort by price</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>

      {/* CATEGORY FILTER */}
      <CategoryFilter
        categories={menuData}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* PRODUCT LIST */}
      {filteredData.map((category) => (
        <div key={category.id} className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">{category.category}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onToggleAvailability={handleToggleAvailability}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      ))}

      {/* CART SUMMARY */}
      <CartSummary cart={cart} />
    </div>
  )
}

export default Menu
