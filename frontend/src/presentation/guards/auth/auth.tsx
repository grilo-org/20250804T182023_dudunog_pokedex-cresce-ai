import React, { type ReactNode, useState, useEffect } from "react"
import { type LoadSession } from "@/domain/usecases"
import { type AuthenticationState } from "@/data/protocols/state-manager"
import { makeSignin, makeSignup } from "@/main/factories/pages"
import { useAppSelector } from "@/main/providers"
import { Loading } from "@/presentation/components"
import { ROUTES } from "@/presentation/components/routes/paths"
import { Navigate, useLocation } from "react-router-dom"

interface AuthGuardProps {
  children: ReactNode
  loadSession: LoadSession
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ loadSession, children }) => {
  const {
    isAuthenticated,
    isInitialized
  }: AuthenticationState = useAppSelector((state) => state.authentication)
  const { pathname } = useLocation()
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null)

  useEffect(() => {
    async function init (): Promise<void> {
      await loadSession.load()
    }

    init()
  }, [])

  if (!isInitialized) {
    return <Loading />
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname)
    }

    if (ROUTES.signup === pathname) return makeSignup({})
    return makeSignin({})
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null)
    return <Navigate to={requestedLocation} />
  }

  if (isAuthenticated) {
    if ([ROUTES.signin, ROUTES.signup].includes(pathname)) return <Navigate to={ROUTES.root} />
  }

  return <>{children}</>
}
