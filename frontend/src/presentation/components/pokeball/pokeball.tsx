import React from "react"
import { Image } from "@chakra-ui/react"

const Pokeball: React.FC = () => {
  return (
    <Image
      alt="Pokeball"
      objectFit="cover"
      src="https://images.unsplash.com/photo-1542779283-429940ce8336?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    />
  )
}

export default Pokeball
