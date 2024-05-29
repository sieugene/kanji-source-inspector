import puppeteer from "puppeteer";

export const yarxi = async (input: string) => {
  const browser = await puppeteer.launch({ headless: false });
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

  //   await browser.close();
};
