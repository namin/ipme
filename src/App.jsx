import { useState, useEffect } from 'react'

const fetchIPAddress = async () => {
  const response = await fetch('https://api.ipify.org?format=json')
  const data = await response.json()
  return data.ip
}

const App = () => {
  const [ip, setIp] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchIPAddress()
      .then(ipAddress => {
        setIp(ipAddress)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to fetch IP address')
        setLoading(false)
      })
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ip)
      .then(() => {
        const button = document.querySelector('.copy-button')
        button.textContent = 'Copied!'
        setTimeout(() => {
          button.textContent = 'Copy'
        }, 2000)
      })
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Your IP Address</h1>
        
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        )}
        
        {error && (
          <div className="error">{error}</div>
        )}
        
        {ip && (
          <>
            <div className="ip-display">{ip}</div>
            <button onClick={copyToClipboard} className="copy-button">
              Copy
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default App

