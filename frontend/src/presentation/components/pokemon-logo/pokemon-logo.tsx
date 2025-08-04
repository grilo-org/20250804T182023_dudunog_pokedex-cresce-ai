import React from "react"
import { Image } from "@chakra-ui/react"
import image from "@/presentation/assets/logo-pokemon-79x45.png"

const PokemonLogo: React.FC = () => {
  return (
    <Image
      src={image}
      alt="Logo Pokemon"
    />
  )
}

export default PokemonLogo
