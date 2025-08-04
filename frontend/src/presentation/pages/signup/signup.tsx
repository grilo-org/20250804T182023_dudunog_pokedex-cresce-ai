import React, { useEffect } from "react"
import { type SignupHttpSuccessResponse } from "@/domain/models"
import { type Signup as SignupUsecase } from "@/domain/usecases"
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
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react"

export type SignupProps = {
  authentication: SignupUsecase
}

type SignupDataProps = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const schema = yup.object({
  name: yup
    .string()
    .required("Nome obrigatório"),
  email: yup
    .string()
    .email("Campo de e-mail deve ser um e-mail válido")
    .required("Campo obrigatório"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "A confirmação de senha deve ter pelo menos 6 caracteres")
    .oneOf([yup.ref("password")], "As senhas devem corresponder")
}).required()

const Signup: React.FC<SignupProps> = ({
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
  } = useForm<SignupDataProps>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: SignupDataProps): Promise<void> => {
    const response = await authentication.signup(data.name, data.email, data.password) as SignupHttpSuccessResponse

    if (response.success) {
      toast({
        title: "Conta criada. Agora você pode fazer login!",
        status: "success",
        isClosable: true
      })
      navigate(ROUTES.signin)
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
            <Heading fontSize="2xl">Criar conta</Heading>
            <Stack mt={5} spacing={4}>
              <FormControl id="name" isInvalid={Boolean(errors.name)}>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  placeholder="Nome"
                  {...register("name")}
                />
                <FormErrorMessage>
                  {errors?.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
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
              <FormControl id="confirmPassword" isInvalid={Boolean(errors.confirmPassword)}>
                <FormLabel>Confirmação de senha</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirmação de senha"
                  {...register("confirmPassword")}
                />
                <FormErrorMessage>
                  {errors?.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack mt={5} spacing={6}>
              <Stack direction={{ base: "column", sm: "row" }} align="start">
                <Text align="center">
                  Já tem uma conta? <Link color="blue.400" href={ROUTES.signin}>Login</Link>
                </Text>
              </Stack>
              <Button
                type="submit"
                colorScheme="orange"
                variant="solid"
                isLoading={isSubmitting}
              >
                Criar conta
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

export default Signup
