import { App } from "./app";
import { ServiceBaseInfo } from "./services/ServiceBaseInfo";
import { ServicePartial } from "./services/ServicePartial";
import { ServiceYarxi } from "./services/ServiceYarxi";

export const bootstrap = async () => {
  console.log("start");
  const app = new App();
  await app.process({
    fetchType: "sequential",
    kanji: "日",
    services: [ServiceYarxi, ServiceBaseInfo, ServicePartial],
  });
  console.log("end");
};

bootstrap();
