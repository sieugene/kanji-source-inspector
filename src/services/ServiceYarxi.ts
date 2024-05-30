import { Browser } from "puppeteer";
import { ServiceAbstract } from "../model/ServiceAbstract";

export class ServiceYarxi extends ServiceAbstract {
  constructor(browser: Browser, input: string) {
    super("ServiceYarxi", browser, input);
  }
  protected async executor() {
    const page = await this.browser.newPage();

    await page.goto("https://www.yarxi.ru/online/");

    await page.waitForSelector("#tab_tango");
    await page.click("#tab_tango");

    await page.waitForSelector("input#tread");
    await page.type("input#tread", this.input);

    await page.waitForSelector('input[onclick="return tst();"]');
    await page.click('input[onclick="return tst();"]');

    await page.waitForFunction(() => {
      const element = document.querySelector("#entryframe");
      return !!element;
    });

    const entryFrameContent = await page.evaluate(() => {
      const element = document.querySelector("#entryframe");
      return element ? element.innerHTML : null;
    });

    if (entryFrameContent) {
      this.logger(entryFrameContent, "entryFrameContent");
    } else {
      this.logger("entryframe data not found", "entryFrameContent");
    }
  }
}
