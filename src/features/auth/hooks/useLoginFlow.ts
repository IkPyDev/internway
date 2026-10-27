import { useRouter, useSearch } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import type { User } from "@/types"
import { useCreateOtpMutation } from "../api/mutations/useCreateOtpMutation"
import { useCreateSessionMutation } from "../api/mutations/useCreateSessionMutation"
import { useUpdateProfileMutation } from "../api/mutations/useUpdateProfileMutation"
import { useMeQuery } from "../api/queries/useMeQuery"
import { parseLoginSearch, roleHome } from "../lib/auth"
import type { LoginStep, ProfileInput } from "../types"

type PublicRole = NonNullable<ProfileInput["role"]>

/** Email → one-time code → (first visit) role and name. */
export function useLoginFlow() {
  const { redirect } = parseLoginSearch(useSearch({ strict: false }))
  const router = useRouter()
  const me = useMeQuery()
  const otp = useCreateOtpMutation()
  const session = useCreateSessionMutation()
  const profile = useUpdateProfileMutation()
  const [step, setStep] = useState<LoginStep>("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [role, setRole] = useState<PublicRole>("student")
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")

  const finish = (user: User) => router.history.replace(redirect ?? roleHome(user))

  // A signed-in visitor with a role has nothing to do here.
  const user = me.data
  useEffect(() => {
    if (user?.role) router.history.replace(redirect ?? roleHome(user))
  }, [user, redirect, router])

  return {
    step: user && !user.role ? "profile" : step,
    email,
    setEmail,
    code,
    setCode,
    role,
    setRole,
    name,
    setName,
    company,
    setCompany,
    busy: otp.isPending || session.isPending || profile.isPending,
    error: otp.error ?? session.error ?? profile.error,
    submitEmail: () => otp.mutate(email, { onSuccess: () => setStep("code") }),
    submitCode: () =>
      session.mutate({ email, code }, { onSuccess: (u) => (u.role ? finish(u) : setStep("profile")) }),
    submitProfile: () =>
      profile.mutate(
        { role, name, company: role === "employer" ? company : undefined },
        { onSuccess: finish },
      ),
    back: () => {
      otp.reset()
      session.reset()
      setCode("")
      setStep("email")
    },
  }
}
