export const makeSignupErrorMessage = (type: string): string => {
  switch (type) {
    case "UserAlreadyExists":
      return "Esse usuário já existe. Utilize outro e-mail!"
    default:
      return "Algo de errado aconteceu. Tente novamente mais tarde."
  }
}
