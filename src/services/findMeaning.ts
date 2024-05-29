import { Browser } from "puppeteer";

const YANDEX_API_TRANSLATE =
  "https://translate.yandex.com/?source_lang=en&target_lang=ru&text=";

export const findMeaning = async (browser: Browser, input: string) => {
  const page = await browser.newPage();

  await page.goto(`https://jisho.org/search/${input}%20%23kanji`);
  await page.waitForSelector(".kanji-details__main-meanings");

  const kanjiMeanings = await page.evaluate(() => {
    const element = document.querySelector(".kanji-details__main-meanings");
    return (element && element.textContent?.trim()) || null;
  });
  console.log("---------- kanjiDetails ---------- \n", kanjiMeanings);

  await page.waitForSelector(".row.compounds");
  const kanjiSentences = await page.evaluate(() => {
    const element = document.querySelector(".row.compounds");
    return element ? ((element as any)?.innerText?.trim() as string) : null;
  });
  console.log(" ---------- kanjiSentences ---------- \n", kanjiSentences);

  if (kanjiMeanings) {
    const yandexPageMeaning = await browser.newPage();
    await yandexPageMeaning.goto(`${YANDEX_API_TRANSLATE}${kanjiMeanings}`);
  }
  if (kanjiSentences) {
    const yandexPageSentences = await browser.newPage();
    await yandexPageSentences.goto(
      `${YANDEX_API_TRANSLATE}${encodeURIComponent(kanjiSentences)}`
    );
  }
};
