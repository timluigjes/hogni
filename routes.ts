import type { RouterRoute } from "@/interfaces/RoutesRoute.ts";
import { RouteMethod } from "@/enums/RouteMethod.ts";
import HomeController from "@/controllers/HomeController.ts";

const routes: RouterRoute[] = [
  {
    method: RouteMethod.GET,
    path: "/",
    response: HomeController.show(),
  },
];

export { routes };
