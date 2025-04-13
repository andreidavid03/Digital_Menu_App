import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4 text-center">
      <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Welcome to Expressoft Menu</h1>
      <p className="mb-8 text-lg text-gray-600 sm:text-xl">
        Your digital food ordering experience starts here 🍽️
      </p>
      <button
        onClick={() => navigate('/menu')}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >
        Start Order
      </button>
    </div>
  )
}

export default Home
