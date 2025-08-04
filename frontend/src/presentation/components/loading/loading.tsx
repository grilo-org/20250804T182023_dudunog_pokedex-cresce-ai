import React from "react"
import { Flex, Spinner } from "@chakra-ui/react"

const Loading: React.FC = () => {
  return (
    <Flex
      minH="81vh"
      align="center"
      justify="center"
      direction="column"
      gap={5}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.800"
        size="xl"
      />
    </Flex>
  )
}

export default Loading
