import React from "react"
import {
  makeHome,
  makePoketeams,
  makePokemonDetails,
  makePoketeamDetails,
  makeNewPoketeam,
  makeSignup,
  makeSignin,
  makeNotFound
} from "@/main/factories/pages"
import { MainLayout } from "@/presentation/layouts"
import { AuthGuard } from "@/presentation/guards"
import { makeRemoteLoadSession } from "@/main/factories/usecases"
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes
} from "react-router-dom"

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(
          <AuthGuard loadSession={makeRemoteLoadSession()}>
            <MainLayout />
          </AuthGuard>
        )}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={makeHome({})} />
          <Route path="/pokemon/:id" element={makePokemonDetails({})} />
          <Route path="/poketeams" element={makePoketeams({})} />
          <Route path="/poketeam/:id" element={makePoketeamDetails({})} />
          <Route path="/new-poketeam" element={makeNewPoketeam({})} />
        </Route>
        <Route path="" element={(
          <AuthGuard loadSession={makeRemoteLoadSession()}>
            <Outlet />
          </AuthGuard>
        )}>
          <Route path="/signin" element={makeSignin({})} />
          <Route path="/signup" element={makeSignup({})} />
        </Route>
        <Route path="*" element={makeNotFound({})} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
