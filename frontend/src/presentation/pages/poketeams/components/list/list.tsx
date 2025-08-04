import React from "react"
import { type LoadPoketeamList } from "@/domain/usecases"
import {
  PoketeamItem,
  PoketeamItemEmpty
} from "@/presentation/pages/poketeams/components"
import { Box, Button, Heading, SimpleGrid, Stack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { ROUTES } from "@/presentation/components/routes/paths"

interface ListProps {
  poketeams: LoadPoketeamList.Model[]
}

const List: React.FC<ListProps> =
  ({ poketeams }) => {
    return (
      <Stack>
        <Box
          marginBottom={5}
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent="space-between"
          gap={3}
        >
          <Heading size="xl" color="blackAlpha.800">
            Times
          </Heading>
          <Link
            to={ROUTES.newPoketeam}
          >
            <Button
              color="white"
              backgroundColor="cyan.400"
              _hover={{
                backgroundColor: "cyan.500"
              }}
            >
              Criar time
            </Button>
          </Link>
        </Box>

        {poketeams?.length
          ? (
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8}>
                {poketeams.map((poketeam: LoadPoketeamList.Model) =>
                  <PoketeamItem key={poketeam.id} poketeam={poketeam} />)
                }
              </SimpleGrid>
            )
          : <PoketeamItemEmpty />}
      </Stack>
    )
  }

export default List
