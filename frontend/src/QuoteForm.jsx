import { useState } from 'react'
import axios from 'axios'

const PRODUCTS = [
  'Stickers', 'Vinyl Cut', 'Yard Signs', 'Acrylic Signs', 'Banners', 'Magnets', 'Custom Die-Cut Metal', 'Laser Engraving'
]

const PROCESSES = [
  'Flatbed Print', 'Roll-to-Roll Print', 'Laminate', 'Die Cut', 'Route', 'Laser Engrave', 'Mount', 'Install'
]

export default function QuoteForm() {
  const [customer, setCustomer] = useState('')
  const [product, setProduct] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [processes, setProcesses] = useState([])
  const [materialCost, setMaterialCost] = useState('')
  const [laborMins, setLaborMins] = useState('')
  const [override, setOverride] = useState('')
  const [total, setTotal] = useState(0)

  const calculate = () => {
    let sqft = (parseFloat(width) * parseFloat(height) / 144) * quantity
    let cost = 0

    // Base material (you’ll customize rates)
    cost += sqft * 3.50

    // Process add-ons
    if (processes.includes('Flatbed Print')) cost += sqft * 2.20
    if (processes.includes('Roll-to-Roll Print')) cost += sqft * 1.80
    if (processes.includes('Laminate')) cost += sqft * 1.20
    if (processes.includes('Die Cut')) cost += sqft * 2.50 + 75
    if (processes.includes('Route')) cost += sqft * 3.00 + 120
    if (processes.includes('Laser Engrave')) cost += laborMins * 1.50

    // Labor
    cost += (laborMins || 0) * 1.10

    // Override wins
    if (override) cost = parseFloat(override)

    setTotal(cost.toFixed(2))
  }

  const saveQuote = async () => {
    await axios.post('https://shopvis-backend.onrender.com/api/quotes', {
      customer,
      product,
      width: parseFloat(width),
      height: parseFloat(height),
      quantity,
      processes,
      sqft: (width * height / 144) * quantity,
      total: parseFloat(total),
      status: 'Draft'
    })
    alert('Quote saved! Check dashboard.')
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-black text-indigo-700 mb-8">New Quote – Dynamic Graphics</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <input placeholder="Customer Name" className="border-2 border-gray-300 rounded-lg p-4 text-lg" onChange={e => setCustomer(e.target.value)} />

          <select className="border-2 border-gray-300 rounded-lg p-4 text-lg" onChange={e => setProduct(e.target.value)}>
            <option>Select Product</option>
            {PRODUCTS.map(p => <option key={p}>{p}</option>)}
          </select>

          <div className="flex gap-4">
            <input type="number" placeholder="Width (in)" className="border-2 border-gray-300 rounded-lg p-4 flex-1" onChange={e => setWidth(e.target.value)} />
            <input type="number" placeholder="Height (in)" className="border-2 border-gray-300 rounded-lg p-4 flex-1" onChange={e => setHeight(e.target.value)} />
          </div>

          <input type="number" placeholder="Quantity" className="border-2 border-gray-300 rounded-lg p-4" value={quantity} onChange={e => setQuantity(e.target.value)} />

          <div className="md:col-span-2">
            <p className="font-bold mb-3">Processes</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PROCESSES.map(p => (
                <label key={p} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-indigo-50">
                  <input type="checkbox" onChange={e => {
                    setProcesses(e.target.checked ? [...processes, p] : processes.filter(x => x !== p))
                  }} />
                  {p
                  }
                </label>
              ))}
            </div>
          </div>

          <input type="number" placeholder="Labor Minutes (optional)" className="border-2 border-gray-300 rounded-lg p-4" onChange={e => setLaborMins(e.target.value)} />
          <input type="number" placeholder="Override Total (optional)" className="border-2 border-gray-300 rounded-lg p-4" onChange={e => setOverride(e.target.value)} />

          <button onClick={calculate} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl py-4 rounded-lg">
            Calculate Total
          </button>
          <div className="text-right">
            <p className="text-4xl font-black text-green-600">${total || '0.00'}</p>
          </div>
        </div>

        <button onClick={saveQuote} className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-black text-2xl py-6 rounded-xl shadow-lg">
          Save Quote & Create Job
        </button>
      </div>
    </div>
  )
}
