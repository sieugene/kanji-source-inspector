import { Browser } from "puppeteer";

export const yarxi = async (browser: Browser, input: string) => {
  const page = await browser.newPage();

  await page.goto("https://www.yarxi.ru/online/");

  await page.waitForSelector("#tab_tango");
  await page.click("#tab_tango");

  await page.waitForSelector("input#tread");
  await page.type("input#tread", input);

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
    console.log("HTML содержимое #entryframe:", entryFrameContent);
  } else {
    console.log("#entryframe не найден или не содержит контент.");
  }
};
