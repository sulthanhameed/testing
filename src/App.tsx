import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
            🏮 Khang
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Authentic Chinese Restaurant & Dimsum
          </p>
          <p className="text-lg text-gray-600">
            康 · Chinese · Dimsum · Fresh Daily
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-semibold text-gray-800">
                Welcome to Khang
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Experience authentic Chinese flavors, hand-crafted dim sum, and sizzling wok specials.
                Fresh ingredients, patient cooking, food made with love.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="p-6 bg-green-50 rounded-xl border-2 border-green-200 hover:shadow-lg transition">
                <div className="text-3xl mb-3">🍜</div>
                <h3 className="font-semibold text-gray-800 mb-2">Dim Sum</h3>
                <p className="text-sm text-gray-600">
                  Hand-rolled dumplings, steamed baskets of perfection
                </p>
              </div>

              <div className="p-6 bg-orange-50 rounded-xl border-2 border-orange-200 hover:shadow-lg transition">
                <div className="text-3xl mb-3">🍚</div>
                <h3 className="font-semibold text-gray-800 mb-2">Rice & Curry</h3>
                <p className="text-sm text-gray-600">
                  Fragrant rice dishes with aromatic spices
                </p>
              </div>

              <div className="p-6 bg-red-50 rounded-xl border-2 border-red-200 hover:shadow-lg transition">
                <div className="text-3xl mb-3">🥡</div>
                <h3 className="font-semibold text-gray-800 mb-2">Noodles</h3>
                <p className="text-sm text-gray-600">
                  Crispy, chewy, or silky — your choice
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
              <button
                onClick={() => setCount(count + 1)}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition shadow-lg"
              >
                🛒 Browse Menu
              </button>
              <a
                href="#contact"
                className="px-8 py-3 border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold rounded-lg transition"
              >
                📞 Order Now
              </a>
            </div>

            {/* Demo Counter */}
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-4">
                Click count: <span className="font-bold text-2xl text-green-600">{count}</span>
              </p>
              <button
                onClick={() => setCount(0)}
                className="text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p className="text-sm">
            康 · <em>Food made with patience tastes of love</em> · 福
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Full-stack React + Vite + Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
