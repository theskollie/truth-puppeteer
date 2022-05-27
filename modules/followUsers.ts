import { Page } from 'puppeteer';
import { logger } from './logger';


export const followUsers = async (page: Page, user: string) => {


  const followers = await page.waitForSelector(`a[href="/@${user}/followers"]`);

  await page.evaluate((b) => b.click(), followers);
  await page.waitForTimeout(3500);
  await page.$$eval('div.pb-4', async (allUsers) =>
    allUsers.map(async (user) => {
      const userPhoto = user.querySelector('img')

      const button = user.querySelector('button')

      if (userPhoto && userPhoto.src !== "https://truthsocial.com/avatars/original/missing.png") {
        if (button && button.textContent !== "Unfollow") {
          button.click();
          await page.waitForTimeout(1000);
        }
      }
    })
  );
  logger('info', `Followed from Recent 10 with Profile Pictures from ${user}`);
  await page.waitForTimeout(5000);
}
