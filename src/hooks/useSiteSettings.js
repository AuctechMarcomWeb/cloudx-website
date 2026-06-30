import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9001/api/'

const DEFAULT_SETTINGS = {
  phone:   '9838075493',
  email:   'cloudxsupport@gmail.com',
  address: 'Shaligram Building New, 167/101, Jiamau Rd, Chauraha, Hazratganj, Lucknow, Uttar Pradesh 226001',
}

export function useSiteSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}site-settings`)
      .then(res => res.json())
      .then(data => {
        if (data?.data) setSettings(data.data)
      })
      .catch(() => { /* keep defaults on error */ })
      .finally(() => setLoading(false))
  }, [])

  return { settings, loading }
}
