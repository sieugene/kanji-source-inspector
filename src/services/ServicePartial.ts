import { Browser } from "puppeteer";
import { ServiceAbstract } from "../model/ServiceAbstract";

export class ServicePartial extends ServiceAbstract {
  constructor(browser: Browser, input: string) {
    super("ServiceBaseInfo", browser, input);
  }
  protected async executor() {
    const rtegaPage = await this.browser.newPage();
    await rtegaPage.goto(`https://rtega.be/chmn/index.php?c=${this.input}`);

    const jpdbPage = await this.browser.newPage();
    await jpdbPage.goto(`https://jpdb.io/kanji/${this.input}#a`);
  }
}
