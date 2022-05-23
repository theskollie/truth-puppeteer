import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();
//Modules
import { randomSentence } from "./modules/generateTweet.js";
import { reFollow } from "./modules/reFollow.js";
import { login } from "./modules/login.js";

async function main() {
  const browser = await puppeteer.launch({
    // headless: false,
    // args: ["--window-size=1920,1080", "--disable-site-isolation-trials"],
    // defaultViewport: null,
  });

  console.log(`%c Script Starting! No further inputs required.`, "color: red");
  const page = await browser.newPage();
  await login(page);

  let runCount = 0;
  const runLoop = async () => {
    while (runCount < process.env.FOLLOWCOUNT) {
      await reFollow(page);
      runCount++;
      console.log(
        `Unfollow/Refollow Run Count: ${runCount}/${process.env.FOLLOWCOUNT}`
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
