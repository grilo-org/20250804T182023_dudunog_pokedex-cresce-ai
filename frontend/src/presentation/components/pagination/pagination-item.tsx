import React from "react"
import { Button } from "@chakra-ui/react"

interface PaginationItemProps {
  currentPage: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export const PaginationItem: React.FC<PaginationItemProps> = ({
  currentPage,
  isCurrent,
  onPageChange
}) => {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        disabled
        color="white"
        bg="blue.800"
        aria-label="Página atual"
        _disabled={{
          bgColor: "gray.800",
          cursor: "default"
        }}
        _hover={{
          bgColor: "blue.800",
          color: "white"
        }}
      >
        {currentPage}
      </Button>
    )
  }
  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      aria-label="Página"
      _hover={{
        bgColor: "blue.500",
        color: "white"
      }}
      onClick={() => onPageChange(currentPage)}
    >
      {currentPage}
    </Button>
  )
}

export default PaginationItem
