import { useState } from 'react'
import axios from 'axios'

const PRODUCTS = ['Stickers', 'Vinyl Cut', 'Yard Sign', 'Banner', 'Acrylic', 'Magnetic']

export default function QuoteForm() {
  const [total, setTotal] = useState(0)

  const calculate = () => {
    // simple demo calc
    setTotal(250.00)
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">New Quote</h1>
      <select className="border p-3 w-full mb-4">
        <option>Select Product</option>
        {PRODUCTS.map(p => <option key={p}>{p}</option>)}
      </select>
      <button onClick={calculate} className="bg-blue-600 text-white px-6 py-3 rounded">
        Calculate & Save
      </button>
      <p className="text-2xl mt-6">Total: ${total.toFixed(2)}</p>
    </div>
  )
}
