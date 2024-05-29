import puppeteer from "puppeteer";
import { yarxi } from "./services/yarxi";
import { findMeaning } from "./services/findMeaning";

export const bootstrap = async () => {
  const browser = await puppeteer.launch({ headless: false });

  const kanji = "日";
  await yarxi(browser, kanji);
  await findMeaning(browser, kanji);
  //   await browser.close();
};

(async () => {
  console.log("start");
  await bootstrap();
  console.log("end");
})();
