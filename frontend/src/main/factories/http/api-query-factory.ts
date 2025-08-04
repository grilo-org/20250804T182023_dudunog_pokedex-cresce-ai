export const makeApiQuery = (payload: any): string => {
  let query = "?"

  Object.keys(payload).forEach((key) => {
    if (payload[key]) {
      query = query + `${key}=${payload[key]}&`
    }
  })

  return query
}
