import React, { Suspense } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Container } from "@mui/material"
import { NotificationContainer } from "react-notifications"
import { AppLayout } from "./components/layout/app-layout"
// import {LandingPage} from "./components/landing_page/LandingPage"
import { UserProvider } from "./context/user-context"

export const App = () => (
  <UserProvider>
    <Suspense fallback={null}>
      <Container className="page-container">
        <Router>
          {/* <LandingPage/> */}
          <AppLayout />
          <NotificationContainer />
        </Router>
      </Container>
    </Suspense>
  </UserProvider>
)
