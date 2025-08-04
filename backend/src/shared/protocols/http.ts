import { AccountModel } from "@contexts/user/domain/models/account-model.struct";

export interface HttpResponse {
  statusCode: number;
  body: any;
}

export interface HttpRequest {
  params?: any;
  query?: any;
  body?: any;
  headers?: any;
  account?: AccountModel;
  userId?: string;
  token?: string;
}

export interface HttpNextFunction {
  (error?: Error): void;
}
