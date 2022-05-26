import { Page } from "puppeteer";

export async function randomSentence(page: Page) {
  async function getRandomQuote() {
    await page.goto("https://fungenerators.com/random/sentence");
    await page.waitForSelector("h2.wow");

    const randomSentence = await page.$eval(
      "h2.wow",
      (sentence) => sentence.textContent
    );
    console.log(randomSentence);
    return randomSentence;
  }

  const randomSentence = await getRandomQuote();

  await page.goto(`https://truthsocial.com/@${process.env.TRUTHUSER}`);
  const compose = await page.waitForSelector(".mt-4 button");

  if(!compose) return;
  compose.click();
  // await compose.evaluate(async (b) => await b.click());
  const textArea = await page.waitForSelector(".w-full textarea");
  await page.type("textarea#compose-textarea", `${randomSentence} #Truth`, {
    delay: 50,
  });
  const postTruth = await page.waitForSelector(".mt-2.w-full button.text-sm");

  if(!postTruth) return;

  postTruth.click();
  // await postTruth.evaluate( async (b) => await b.click());
  await page.waitForTimeout(1000);
  await page.goto(`https://truthsocial.com/@${process.env.TRUTHUSER}`);
  await page.waitForTimeout(1000);
  console.log(`Tweet Posted Successfully`);
}
