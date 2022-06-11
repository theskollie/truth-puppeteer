import { followUsers } from "./followUsers";
import { logger } from "./logger";

import { Page } from "puppeteer";
export const accounts = [
  "https://truthsocial.com/@DonaldJTrumpJr",
  "https://truthsocial.com/@realDonaldTrump",
  "https://truthsocial.com/@truthsocial",
  "https://truthsocial.com/@EricTrump",
  "https://truthsocial.com/@BabylonBee",
];

export async function reFollow(page: Page) {
  for (let i = 0; i < accounts.length; i++) {
    let currentUser = accounts[i].replace(/(.*?)@/, "");
    await page.goto(accounts[i]);
    //Follow/Unfollow Button
    await page.waitForTimeout(3000);

    await followUsers(page, currentUser);
    await page.waitForTimeout(15000);
    await page.waitForTimeout(5000);
    await page.click(".mt-10.flex button:nth-child(2)");
    logger("info", `Unfollowed ${currentUser}: 10s Timeout Starting`);
    await page.waitForTimeout(10000);
    await page.click(".mt-10.flex button:nth-child(2)");
    logger("info", `Refollowed ${currentUser}: 10s Timeout Starting`);
    await page.waitForTimeout(10000);
  }
}
