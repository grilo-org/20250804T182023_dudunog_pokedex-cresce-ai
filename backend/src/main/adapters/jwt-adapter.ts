import { Decrypter } from "@shared/protocols/criptography/decrypter";
import { Encrypter } from "@shared/protocols/criptography/encrypter";
import { sign, verify } from "jsonwebtoken";

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  async decrypt(value: string): Promise<string | Record<string, any> | null> {
    try {
      const decoded = verify(value, this.secret);

      return decoded;
    } catch (error) {
      return null;
    }
  }

  async encrypt(value: string, expiresIn = "1d"): Promise<string> {
    const accessToken = sign({ id: value }, this.secret, {
      expiresIn,
    });
    return accessToken;
  }
}
