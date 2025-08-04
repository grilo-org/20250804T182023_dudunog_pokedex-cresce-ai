import { type HttpClient, type HttpRequest, type HttpResponse } from "@/data/protocols/http"

export class HttpClientDecorator implements HttpClient {
  constructor (
    private readonly httpClient: HttpClient
  ) {}

  async request (data: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.httpClient.request(data)
    return httpResponse
  }

  async setHeader (header: string, value: string): Promise<void> {
    await this.httpClient.setHeader(header, value)
  }

  async removeHeader (header: string): Promise<void> {
    await this.httpClient.removeHeader(header)
  }
}
