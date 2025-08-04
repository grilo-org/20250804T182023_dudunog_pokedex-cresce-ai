import { type HttpClient, HttpStatusCode } from "@/data/protocols/http"
import { type AddPoketeam } from "@/domain/usecases"
import { UnexpectedError } from "@/domain/errors"
import { type PoketeamModel } from "@/domain/models"

export class RemoteAddPoketeam implements AddPoketeam {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient<AddPoketeam.Model | undefined>
  ) {}

  async add (params: Omit<PoketeamModel, "id" | "userId">): Promise<AddPoketeam.Model> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: "post",
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body as PoketeamModel
      case HttpStatusCode.forbidden: throw new UnexpectedError()
      default: throw new UnexpectedError()
    }
  }
}
