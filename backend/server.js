require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { Resend } = require('resend')
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)

const Quote = mongoose.model('Quote', new mongoose.Schema({
  customer: String,
  items: Array,
  total: Number,
  status: { type: String, default: 'Draft' },
  proofUrl: String,
  approvedAt: Date
}, { timestamps: true }))

const Job = mongoose.model('Job', new mongoose.Schema({
  quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote' },
  status: { type: String, default: 'Art Approval' }
}))

const resend = new Resend(process.env.RESEND_API_KEY)

// Routes
app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find().populate('quote')
  res.json(jobs)
})

app.post('/api/quotes', async (req, res) => {
  const quote = new Quote(req.body)
  await quote.save()
  res.json(quote)
})

app.post('/api/quotes/:id/send', async (req, res) => {
  const quote = await Quote.findById(req.params.id)
  await resend.emails.send({
    from: process.env.FROM_EMAIL,
    to: req.body.email,
    subject: `Quote from Dynamic Graphics #${quote._id}`,
    html: `<h2>Total: $${quote.total}</h2>
           <a href="${process.env.FRONTEND_URL || 'https://shopvis.vercel.app'}/approve/${quote._id}">View & Approve</a>`
  })
  res.json({ sent: true })
})

app.post('/api/upload-proof', upload.single('file'), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path)
  res.json({ url: result.secure_url })
})

app.listen(process.env.PORT || 5000, () => {
  console.log('Backend running on 5000')
})