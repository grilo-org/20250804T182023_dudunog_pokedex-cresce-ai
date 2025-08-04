import React from "react"
import ReactDOM from "react-dom/client"
import { ChakraProvider } from "@chakra-ui/react"
import { ReduxStoreProvider } from "@/main/providers"
import { Router } from "@/presentation/components"

ReactDOM.createRoot(document.getElementById("main") as HTMLElement).render(
  <ChakraProvider>
    <ReduxStoreProvider>
      <Router />
    </ReduxStoreProvider>
  </ChakraProvider>
)
