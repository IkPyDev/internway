import { Outlet } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { Footer } from "./Footer"
import { Header } from "./Header"

/** `account` is the header's sign-in / account slot, filled by the routes layer. */
export function RootLayout({ account }: { account: ReactNode }) {
  return (
    <>
      <Header account={account} />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
