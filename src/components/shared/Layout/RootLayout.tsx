import { Outlet } from "@tanstack/react-router"
import { Footer } from "./Footer"
import { Header } from "./Header"

export function RootLayout() {
  return (
    <>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
