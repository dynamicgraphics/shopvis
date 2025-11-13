import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    axios.get('https://YOUR-BACKEND.onrender.com/api/jobs')
      .then(r => setJobs(r.data))
  }, [])

  const stages = ['Art Approval', 'Printing', 'Cutting', 'Finishing', 'Shipping']

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">ShopVis Job Board</h1>
      <div className="flex gap-6 overflow-x-auto">
        {stages.map(stage => (
          <div key={stage} className="bg-white rounded-lg shadow p-4 min-w-80">
            <h2 className="font-bold text-lg mb-3">{stage}</h2>
            {jobs.filter(j => j.status === stage).map(job => (
              <div key={job._id} className="bg-blue-50 p-3 rounded mb-2">
                Job from Quote #{job.quote?._id}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
