import { Sidebar } from "@/presentation/components"
import React from "react"
import { Outlet } from "react-router-dom"

const MainLayout: React.FC = () => {
  return (
    <>
      <Sidebar>
        <Outlet />
      </Sidebar>
    </>
  )
}

export default MainLayout
