import React from "react"
import { PaginationItem } from "@/presentation/components"
import {
  Box,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react"

interface PaginationProps {
  totalCountOfRegisters?: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

const generatePagesArray = (from: number, to: number): number[] => {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

const Pagination: React.FC<PaginationProps> = ({
  totalCountOfRegisters = 0,
  registersPerPage = 20,
  currentPage = 1,
  onPageChange
}) => {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
      : []

  const initialItem = (currentPage - 1) * registersPerPage + 1

  const lastItem =
    (currentPage - 1) * registersPerPage + registersPerPage > totalCountOfRegisters
      ? totalCountOfRegisters
      : (currentPage - 1) * registersPerPage + registersPerPage

  return (
    <Stack
      direction="row"
      mt={14}
      pb={4}
      justifyContent="space-between"
      alignItems="center"
      gap={3}
      flexDirection={{ base: "column", md: "row" }}
    >
      <Box>
        <strong>{lastItem === 0 ? 0 : initialItem}</strong> - <strong>{lastItem}</strong>{" "}
        de <strong>{totalCountOfRegisters}</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem onPageChange={onPageChange} currentPage={1} />
            {currentPage > 2 + siblingsCount && (
              <Text color={useColorModeValue("gray.900", "white")} width="8" textAlign="center" alignSelf="end">
                ...
              </Text>
            )}
          </>
        )}
        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return (
              <PaginationItem key={page} onPageChange={onPageChange} currentPage={page} />
            )
          })}
        <PaginationItem onPageChange={onPageChange} currentPage={currentPage} isCurrent />
        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return (
              <PaginationItem key={page} onPageChange={onPageChange} currentPage={page} />
            )
          })}
        {currentPage < lastPage - siblingsCount && (
          <>
            {currentPage < lastPage - siblingsCount - 1 && (
              <Text
                width="8"
                textAlign="center"
                alignSelf="end"
                color={useColorModeValue("gray.900", "white")}
              >
                ...
              </Text>
            )}
            <PaginationItem onPageChange={onPageChange} currentPage={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  )
}

export default Pagination
