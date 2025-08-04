import React from "react"
import {
  Badge,
  HStack,
  type ThemeTypings
} from "@chakra-ui/react"

type TagProps = {
  name: string
  colorScheme?: ThemeTypings["colorSchemes"]
}

interface TagsProps {
  tags: TagProps[]
}

const Tags: React.FC<TagsProps> = ({
  tags
}) => {
  return (
    <HStack spacing={2}>
      {tags.map((tag) => {
        return (
          <Badge
            size="md"
            px="2"
            variant="solid"
            borderRadius="full"
            colorScheme={tag.colorScheme}
            key={tag.name}
          >
            {tag.name}
          </Badge>
        )
      })}
    </HStack>
  )
}

export default Tags
