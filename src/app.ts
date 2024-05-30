import puppeteer from "puppeteer";

import { ServiceAbstractConstructor } from "./model/ServiceAbstract";

export class App {
  public async process({
    services,
    kanji,
  }: {
    services: ServiceAbstractConstructor[];
    kanji: string;
  }) {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });
    await services.reduce(async (previousPromise, ServiceClass) => {
      await previousPromise;
      const serviceInstance = new ServiceClass(browser, kanji);
      await serviceInstance.bootstrap();
    }, Promise.resolve());
  }
}
