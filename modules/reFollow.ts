import { followUsers } from './followUsers';
import { logger } from './logger';


import { Page } from 'puppeteer';
export const accounts = [
  "https://truthsocial.com/@DonaldJTrumpJr",
  "https://truthsocial.com/@realDonaldTrump",
  "https://truthsocial.com/@truthsocial",
  "https://truthsocial.com/@EricTrump",
  "https://truthsocial.com/@BabylonBee",
  "https://truthsocial.com/@DineshDSouza",
  "https://truthsocial.com/@TheBible",
  "https://truthsocial.com/@JackPosobiec",
  "https://truthsocial.com/@TravisTritt",
  "https://truthsocial.com/@MelaniaTrump",
  "https://truthsocial.com/@mariabartiromo",
  "https://truthsocial.com/@NewsMax",
  "https://truthsocial.com/@TulsiGabbard",
  "https://truthsocial.com/@rumble",
  "https://truthsocial.com/@History",
  "https://truthsocial.com/@Travel",
  "https://truthsocial.com/@savsays"
];

export const refollowFolks = ['DonaldJTrumpJr', 'realDonaldTrump', 'truthsocial', 'BabylonBee', 'EricTrump']
export async function reFollow(page: Page) {
  for (let i = 0; i < accounts.length; i++) {
    let currentUser = accounts[i].replace(/(.*?)@/, "");
    await page.goto(accounts[i]);
    //Follow/Unfollow Button
    await page.waitForTimeout(3000);

    await followUsers(page, currentUser);
    await page.waitForTimeout(15000);
    if (refollowFolks.includes(currentUser)) {

      await page.waitForTimeout(5000);
      await page.click(".mt-10.flex button:nth-child(2)");
      logger("info", `Unfollowed ${currentUser}: 10s Timeout Starting`);
      await page.waitForTimeout(10000);
      await page.click(".mt-10.flex button:nth-child(2)");
      logger("info", `Refollowed ${currentUser}: 10s Timeout Starting`);
      await page.waitForTimeout(10000);
    }
  }
}
