import { Browser } from "puppeteer";
import { ServiceAbstract } from "../model/ServiceAbstract";

export class ServiceBaseInfo extends ServiceAbstract {
  private YANDEX_API_TRANSLATE =
    "https://translate.yandex.com/?source_lang=en&target_lang=ru&text=";
  constructor(browser: Browser, input: string) {
    super("ServiceBaseInfo", browser, input);
  }

  protected async executor() {
    const page = await this.browser.newPage();

    await page.goto(this.getJishoSearchUrl);
    await page.waitForSelector(".kanji-details__main-meanings");

    const kanjiMeanings = await page.evaluate(() => {
      const element = document.querySelector(".kanji-details__main-meanings");
      return (element && element.textContent?.trim()) || null;
    });
    super.logger(kanjiMeanings, "kanjiDetails");

    await page.waitForSelector(".row.compounds");
    const kanjiSentencesOriginal = await page.evaluate(() => {
      const element = document.querySelector(".row.compounds");
      return element ? ((element as any)?.innerText?.trim() as string) : null;
    });
    const kanjiSentencesClear = kanjiSentencesOriginal
      ?.replace("On reading compounds", "\n")
      .replace("Kun reading compounds", "\n");
    super.logger(kanjiSentencesClear, "kanjiSentences");

    if (kanjiMeanings) {
      const yandexPageMeaning = await this.browser.newPage();
      await yandexPageMeaning.goto(
        `${this.YANDEX_API_TRANSLATE}${kanjiMeanings}`
      );
    }
    if (kanjiSentencesClear) {
      const yandexPageSentences = await this.browser.newPage();
      await yandexPageSentences.goto(
        `${this.YANDEX_API_TRANSLATE}${encodeURIComponent(kanjiSentencesClear)}`
      );
    }
  }

  private get getJishoSearchUrl() {
    return `https://jisho.org/search/${this.input}%20%23kanji`;
  }
}
