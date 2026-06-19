import { createContext, useContext, useState, useCallback } from 'react'

const PortalAuthContext = createContext(null)

export function PortalAuthProvider({ children }) {
  const [token, setToken]   = useState(() => localStorage.getItem('portalToken') || null)
  const [school, setSchool] = useState(() => {
    try { return JSON.parse(localStorage.getItem('portalSchool') || 'null') } catch { return null }
  })

  const login = useCallback((tok, schoolData) => {
    localStorage.setItem('portalToken', tok)
    localStorage.setItem('portalSchool', JSON.stringify(schoolData))
    setToken(tok)
    setSchool(schoolData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('portalToken')
    localStorage.removeItem('portalSchool')
    setToken(null)
    setSchool(null)
  }, [])

  return (
    <PortalAuthContext.Provider value={{ token, school, login, logout, isLoggedIn: !!token }}>
      {children}
    </PortalAuthContext.Provider>
  )
}

export const usePortalAuth = () => useContext(PortalAuthContext)
