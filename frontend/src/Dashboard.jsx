import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    axios.get('https://shopvis-backend.onrender.com/api/jobs')
      .then(r => setJobs(r.data))
      .catch(() => setJobs([]))
  }, [])

  const stages = ['Art Approval', 'Material Ordering', 'Printing', 'Cutting', 'Finishing', 'Shipping']

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-black text-indigo-700">Dynamic Graphics – ShopVis</h1>
          <Link to="/quote" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-lg shadow transition">
            + New Quote
          </Link>
        </div>
      </header>

      <main className="p-4 md:p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">Job Board</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
          {stages.map(stage => (
            <div key={stage} className="bg-white rounded-xl shadow-xl p-5 border-t-8 border-indigo-600 flex flex-col">
              <h3 className="font-bold text-lg text-gray-800 mb-4 text-center">{stage}</h3>
              <div className="space-y-3 flex-1 min-h-32">
                {jobs.filter(j => j.status === stage).length === 0 ? (
                  <p className="text-gray-400 text-center italic text-sm">No jobs</p>
                ) : (
                  jobs.filter(j => j.status === stage).map(job => (
                    <div key={job._id} className="bg-gradient-to-r from-indigo-50 to-blue-50 p-3 rounded-lg border text-sm">
                      <p className="font-semibold">Quote #{job.quote?._id}</p>
                      <p className="text-gray-600 truncate">{job.quote?.customer || '—'}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
