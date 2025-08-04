import { HttpClientDecorator } from "@/main/decorators"
import { makeAxiosHttpClient } from "@/main/factories/http"
import { type HttpClient } from "@/data/protocols/http"

export const makeHttpClientDecorator = (): HttpClient =>
  new HttpClientDecorator(makeAxiosHttpClient())
