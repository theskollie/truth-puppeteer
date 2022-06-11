import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();
//Modules
import { randomSentence } from "./generateTweet";
import { reFollow, accounts } from "./reFollow";
import { login } from "./login";
import { unfollow } from "./unfollow";
import { famousQuote } from "./famousQuote";
import { logger } from "./logger";

async function main() {
  const browser = await puppeteer.launch({
    // headless: false,
    // args: ["--window-size=1920,1080", "--disable-site-isolation-trials"],
    // defaultViewport: null,
    //ARM Based Systems
    // executablePath: '/usr/bin/chromium-browser',
    // args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  logger("info", `Script Starting! No further inputs required.`);
  const page = await browser.newPage();
  await login(page);

  // Initial Follow Check
  for (let i = 0; i < accounts.length; i++) {
    await page.goto(accounts[i]);
    await page.waitForSelector(".mt-10.flex button:nth-child(2)", {
      timeout: 60000,
    });
    await page.$eval(".mt-10.flex button:nth-child(2)", async (button) => {
      if (button.textContent !== "Unfollow") {
        // @ts-ignore
        await button.click();
      }
    });
    await page.waitForTimeout(2000);
  }

  logger("info", "Completed Initial Check");

  let runCount = 0;
  const loopCount = Number(process.env.FOLLOWCOUNT) || 50;
  const runLoop = async (famous: boolean) => {
    while (runCount < loopCount) {
      await reFollow(page);
      runCount++;
      // if (runCount % 2 === 0) {
      logger("info", "Switching to Unfollow");
      await unfollow(page);
      await page.waitForTimeout(2000);
      await unfollow(page);
      await page.waitForTimeout(2000);
      await unfollow(page);
      await page.waitForTimeout(2000);
      // }
      logger("info", `Run Count: ${runCount}/${process.env.FOLLOWCOUNT}`);
    }
    runTweet(famous);
  };

  const runTweet = async (famous: boolean) => {
    logger("info", `Starting New Tweet`);
    runCount = 0;
    if (famous) {
      await famousQuote(page);
    } else {
      await randomSentence(page);
    }
    logger("info", `Switching to Follow`);
    runLoop(!famous);
  };
  //Start Initial Script
  runLoop(false);
}

main();
