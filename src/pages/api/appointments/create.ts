import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ detail: 'Method not allowed' })
  }
  const {
    barberId,
    clientName,
    clientPhone,
    serviceId,
    startDatetime,
    endDatetime,
    notes,
  } = req.body || {}

  if (!barberId || !clientName || !clientPhone || !serviceId || !startDatetime) {
    return res.status(400).json({ detail: 'Missing required fields' })
  }

  try {
    const resp = await fetch('http://localhost:8000/api/appointments/public/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        barberId,
        clientName,
        clientPhone,
        serviceId,
        startDatetime,
        endDatetime,
        notes,
      }),
    })
    const data = await resp.json()
    if (!resp.ok) {
      return res.status(resp.status).json(data)
    }
    return res.status(201).json(data)
  } catch (e: any) {
    return res.status(500).json({ detail: e?.message || 'Server error' })
  }
}