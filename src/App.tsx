import { FaBeer } from 'react-icons/fa'; // Test icon

function App() {
  return (
    <div className="h-screen w-full flex items-center justify-center gap-4">
      <button className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-bold transition">
        Tailwind v4 Button
      </button>
      
      <div className="text-4xl text-accent">
        <FaBeer />
      </div>
    </div>
  )
}

export default App