import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();
//Modules
import { randomSentence } from "./generateTweet";
import { reFollow, accounts, refollowFolks } from "./reFollow";
import { login } from "./login";
import { unfollow } from './unfollow';
import { famousQuote } from './famousQuote';
import {bulkUnfollow} from './bulkUnfollow';

async function main() {
  const browser = await puppeteer.launch({
    // headless: false,
    // args: ["--window-size=1920,1080", "--disable-site-isolation-trials"],
    // defaultViewport: null,
  });

  console.log(`%c Script Starting! No further inputs required.`, "color: red");
  const page = await browser.newPage();

  await login(page);

  for (let i = 0; i < accounts.length; i++) {
    if (refollowFolks.includes(accounts[i])) {
      await page.goto(accounts[i]);
      await page.waitForSelector(".mt-10.flex button:nth-child(2)", { timeout: 60000 });
      await page.$eval('.mt-10.flex button:nth-child(2)', async (button) => {
        if (button.textContent !== "Unfollow") {
  
          // @ts-ignore
          await button.click();
        }
      })
      await page.waitForTimeout(2000);
    }

  }
  console.log("Completed Initial Check");

  let runCount = 0;
  const loopCount = Number(process.env.FOLLOWCOUNT) || 50
  const runLoop = async (famous: boolean) => {
    while (runCount < loopCount) {
      await reFollow(page);
      runCount++;
      // if (runCount % 2 === 0) {
        console.log("Switching to Unfollow");
        await bulkUnfollow(process.env.TRUTHUSER as string, page)
      // }
      console.log(
        `Run Count: ${runCount}/${process.env.FOLLOWCOUNT}`
      );
    }
    runTweet(famous);
  };


  const runTweet = async (famous: boolean) => {
    console.log(`Starting New Tweet`);
    runCount = 0;
    if (famous) {
      await famousQuote(page);
    } else {
      await randomSentence(page);
    }
    console.log(`Switching to Follow`);
    runLoop(!famous);
  };
  // Start Initial Script
  runLoop(false);
}

main();
