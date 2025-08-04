export const makeSigninErrorMessage = (type: string): string => {
  switch (type) {
    case "UserDoesNotExist":
      return "Esse usuário não existe"
    case "FailedToFetchAccountException":
      return "Faça login ou cadastre-se para acessar a plataforma!"
    case "LogoutException":
      return "Faça login ou cadastre-se para acessar a plataforma!"
    default:
      return "Algo de errado aconteceu. Tente novamente mais tarde."
  }
}
