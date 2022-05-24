import {followUsers} from './followUsers.js';

export const accounts = [
  "https://truthsocial.com/@DonaldJTrumpJr",
  "https://truthsocial.com/@realDonaldTrump",
  "https://truthsocial.com/@truthsocial",
  "https://truthsocial.com/@BabylonBee",
];

export async function reFollow(page) {
  for (let i = 0; i < accounts.length; i++) {
    let currentUser = accounts[i].replace(/(.*?)@/, "");
    await page.goto(accounts[i]);
    //Follow/Unfollow Button
    await page.waitForTimeout(3000);
    await followUsers(page, currentUser);
    await page.waitForTimeout(5000);
    await page.click(".mt-10.flex button:nth-child(2)");
    console.log(`Unfollowed ${currentUser}: 10s Timeout Starting`);
    await page.waitForTimeout(10000);
    await page.click(".mt-10.flex button:nth-child(2)");
    console.log(`Refollowed ${currentUser}: 10s Timeout Starting`);
    await page.waitForTimeout(10000);
  }
}
