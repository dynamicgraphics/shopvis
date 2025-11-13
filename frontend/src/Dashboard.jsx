import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    axios.get('https://shopvis-backend.onrender.com/api/jobs')
      .then(r => setJobs(r.data))
      .catch(() => setJobs([]))
  }, [])

  const stages = ['Art Approval', 'Printing', 'Cutting', 'Finishing', 'Shipping']

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">ShopVis – Live & Running</h1>
      <p className="text-xl mb-6">Your ShopVox replacement is officially live. 🎉</p>
      <div className="flex gap-6 overflow-x-auto">
        {stages.map(stage => (
          <div key={stage} className="bg-white rounded-lg shadow p-6 min-w-80">
            <h2 className="font-bold text-lg mb-4 text-gray-800">{stage}</h2>
            {jobs.filter(j => j.status === stage).length === 0 && (
              <p className="text-gray-500">No jobs yet – create your first quote!</p>
            )}
          </div>
        ))}
      </div>
      <a href="/quote" className="fixed bottom-8 right-8 bg-blue-600 text-white px-8 py-4 rounded-full text-xl shadow-lg hover:bg-blue-700">
        + New Quote
      </a>
    </div>
  )
}
