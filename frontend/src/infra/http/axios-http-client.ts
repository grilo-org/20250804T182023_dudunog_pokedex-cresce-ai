import {
  type HttpRequest,
  type HttpResponse,
  type HttpClient
} from "@/data/protocols/http"
import axios, { type AxiosResponse } from "axios"

export class AxiosHttpClient implements HttpClient {
  async request (data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error: any) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  async setHeader (header: string, value: string): Promise<void> {
    axios.defaults.headers.common[header] = value
  }

  async removeHeader (header: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete axios.defaults.headers.common[header]
  }
}
