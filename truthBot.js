import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();
//Modules
import { randomSentence } from "./modules/generateTweet.js";
import { reFollow, accounts } from "./modules/reFollow.js";
import { login } from "./modules/login.js";
import {unfollow} from './modules/unfollow.js';

async function main() {
  const browser = await puppeteer.launch({
    // headless: false,
    // args: ["--window-size=1920,1080", "--disable-site-isolation-trials"],
    // defaultViewport: null,
  });

  console.log(`%c Script Starting! No further inputs required.`, "color: red");
  const page = await browser.newPage();
  await login(page);

  for(let i=0; i<accounts.length; i++) {
    await page.goto(accounts[i]);
    await page.waitForSelector(".mt-10.flex button:nth-child(2)");
    await page.$eval('.mt-10.flex button:nth-child(2)', (button) => {
      if(button.textContent !== "Unfollow") {
       button.click();
      }
    })
    await page.waitForTimeout(2000);
  }
  console.log("Completed Initial Check");

  let runCount = 0;
  const runLoop = async () => {
    while (runCount < process.env.FOLLOWCOUNT) {
      await reFollow(page);
      runCount++;
      console.log("Switching to Unfollow");
      await unfollow(page);
      console.log(
        `Run Count: ${runCount}/${process.env.FOLLOWCOUNT}`
      );
    }
    runTweet();
  };

  const runTweet = async () => {
    console.log(`Starting New Tweet`);
    runCount = 0;
    await randomSentence(page);
    console.log(`Switching to Follow`);
    runLoop();
  };
  //Start Initial Script
  runLoop();
}

main();
