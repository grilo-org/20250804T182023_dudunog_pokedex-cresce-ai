import { adaptRoute } from "@main/adapters/express-adapter";
import { makeCreateAccount } from "@contexts/user/external/factories/create-account.factory";
import { makeAccessAccount } from "@contexts/user/external/factories/access-account.factory";
import { makeGetUser } from "@contexts/user/external/factories/get-user.factory";
import { auth } from "@main/middlewares/auth";
import { Router } from "express";

export default (router: Router) => {
  router.post("/signup", adaptRoute(makeCreateAccount()));
  router.post("/signin", adaptRoute(makeAccessAccount()));
  router.get("/user", adaptRoute(makeGetUser(), [auth]));
};
