import React, { lazy } from "react"
import { Loadable } from "@/presentation/components"
import { type SignupProps } from "@/presentation/pages/signup/signup"
import { makeRemoteSignup } from "@/main/factories/usecases"

// @ts-expect-error ignore
const Signup: React.FC<SignupProps> = Loadable(lazy(async () => import("@/presentation/pages/signup/signup")))

export const makeSignup: React.FC = () => {
  return (
    <Signup
      authentication={makeRemoteSignup()}
    />
  )
}
