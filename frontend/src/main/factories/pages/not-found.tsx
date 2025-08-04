import React, { lazy } from "react"
import { Loadable } from "@/presentation/components"

const NotFound: React.FC = Loadable(lazy(async () => import("@/presentation/pages/not-found/not-found")))

export const makeNotFound: React.FC = () => {
  return (
    <NotFound />
  )
}
