import puppeteer, { Browser } from 'puppeteer';

import { ServiceAbstractConstructor } from './model/ServiceAbstract';

type FETCH_TYPE = 'parallel' | 'sequential';

export class App {
  public async process({
    fetchType,
    services,
    kanji
  }: {
    fetchType: FETCH_TYPE;
    services: ServiceAbstractConstructor[];
    kanji: string;
  }) {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null
    });
    await this.createTasks(fetchType, services, browser, kanji);
  }

  private async createTasks(
    fetchType: FETCH_TYPE,
    services: ServiceAbstractConstructor[],
    browser: Browser,
    kanji: string
  ) {
    switch (fetchType) {
      case 'sequential':
        await services.reduce(async (previousPromise, ServiceClass) => {
          await previousPromise;
          const serviceInstance = new ServiceClass(browser, kanji);
          await serviceInstance.bootstrap();
        }, Promise.resolve());
        break;
      case 'parallel':
        await Promise.all(
          services.map(async ServiceClass => {
            const serviceInstance = new ServiceClass(browser, kanji);
            await serviceInstance.bootstrap();
          })
        );
      default:
        throw Error(`Couldn't work with fetchType: ${fetchType}`);
    }
  }
}
