// import fetch from 'node-fetch';
import { Page } from 'puppeteer';


async function fetchQuote() {
  const response = await fetch('https://zenquotes.io/api/random');
  const quote = await response.json() as any[];
  return quote[0].q;
}

export async function famousQuote(page: Page) {

  const randomSentence = await fetchQuote();
  console.log(`${randomSentence} - Donald Trump #Truth`);
  await page.goto(`https://truthsocial.com/@${process.env.TRUTHUSER}`);
  const compose = await page.waitForSelector(".mt-4 button");

  await page.evaluate((b) => b.click(), compose);
  const textArea = await page.waitForSelector(".w-full textarea");
  await page.type("textarea#compose-textarea", `${randomSentence} - Donald Trump #Truth`, {
    delay: 50,
  });
  const postTruth = await page.waitForSelector(".mt-2.w-full button.text-sm");

  await page.evaluate((b) => b.click(), postTruth);


  await page.waitForTimeout(1000);
  await page.goto(`https://truthsocial.com/@${process.env.TRUTHUSER}`);
  await page.waitForTimeout(1000);
  console.log(`Tweet Posted Successfully`);

}