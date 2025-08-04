import React, { useEffect } from "react"
import { SigninHttpSuccessResponse } from "@/domain/models"
import { type Signin as SigninUsecase } from "@/domain/usecases"
import { type AuthenticationState } from "@/data/protocols/state-manager"
import { useAppSelector } from "@/main/providers"
import { Pokeball } from "@/presentation/components"
import { ROUTES } from "@/presentation/components/routes/paths"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  FormErrorMessage,
  useToast,
  Link,
  Text
} from "@chakra-ui/react"

export type SigninProps = {
  authentication: SigninUsecase
}

type SigninDataProps = {
  email: string
  password: string
}

const schema = yup.object({
  email: yup
    .string()
    .email()
    .required("Campo obrigatório"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "A senha deve ter pelo menos 6 caracteres")
}).required()

const Signin: React.FC<SigninProps> = ({
  authentication
}) => {
  const toast = useToast()
  const navigate = useNavigate()

  const {
    error
  }: AuthenticationState = useAppSelector((state) => state.authentication)

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = useForm<SigninDataProps>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: SigninDataProps): Promise<void> => {
    const response = await authentication.signin(data.email, data.password) as SigninHttpSuccessResponse

    if (response.success) {
      navigate(ROUTES.root)
    }
  }

  useEffect(() => {
    if (error) {
      toast({
        title: error?.error,
        status: "error",
        isClosable: true
      })
    }
  }, [error])

  return (
    <Stack minH="100vh" direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align="center" justify="center">
        <Stack w="full" maxW="md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Heading fontSize="2xl">Login</Heading>
            <Stack mt={5} spacing={4}>
              <FormControl id="email" isInvalid={Boolean(errors.email)}>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="email"
                  placeholder="E-mail"
                  {...register("email")}
                />
                <FormErrorMessage>
                  {errors?.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={Boolean(errors.password)}>
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  placeholder="Senha"
                  {...register("password")}
                />
                <FormErrorMessage>
                  {errors?.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack mt={5} spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align="start"
                justify="space-between">
                <Checkbox>Lembre de mim</Checkbox>
                <Text align="center">
                  Não tem uma conta? <Link color="blue.400" href={ROUTES.signup}>Criar conta</Link>
                </Text>
              </Stack>
              <Button
                type="submit"
                colorScheme="orange"
                variant="solid"
                isLoading={isSubmitting}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Pokeball />
      </Flex>
    </Stack>
  )
}

export default Signin
