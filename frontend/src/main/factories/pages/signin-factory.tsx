import React, { lazy } from "react"
import { Loadable } from "@/presentation/components"
import { type SigninProps } from "@/presentation/pages/signin/signin"
import { makeRemoteSignin } from "@/main/factories/usecases"

// @ts-expect-error ignore
const Signin: React.FC<SigninProps> = Loadable(lazy(async () => import("@/presentation/pages/signin/signin")))

export const makeSignin: React.FC = () => {
  return (
    <Signin
      authentication={makeRemoteSignin()}
    />
  )
}
