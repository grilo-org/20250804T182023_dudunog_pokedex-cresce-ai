export interface Encrypter {
  encrypt: (data: string, expiresIn?: string) => Promise<string>;
}
