import { adaptRoute } from "@main/adapters/express-adapter";
import { auth } from "@main/middlewares/auth";
import { Router } from "express";
import { makeCreatePoketeamFactory } from "@contexts/poketeam/external/factories/create-poketeam.factory";
import { makeGetPoketeam } from "@contexts/poketeam/external/factories/get-poketeam.factory";
import { makeListPoketeamsFactory } from "@contexts/poketeam/external/factories/list-poketeams.factory";

export default (router: Router) => {
  router.post("/poketeam/create", adaptRoute(makeCreatePoketeamFactory(), [auth]));
  router.get("/poketeam/:id", adaptRoute(makeGetPoketeam(), [auth]));
  router.get("/poketeams", adaptRoute(makeListPoketeamsFactory(), [auth]));
};
