import puppeteer from "puppeteer";
import { yarxi } from "./services/yarxi";

export const bootstrap = async () => {
  await yarxi("日");
  //   await browser.close();
};

(async () => {
  console.log("start");
  await bootstrap();
  console.log("end");
})();
