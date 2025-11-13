import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import QuoteForm from './QuoteForm'   // ← exact match

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/quote" element={<QuoteForm />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
