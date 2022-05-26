import { Page } from 'puppeteer';


export const followUsers = async (page: Page, user: string) => {


  const followers = await page.waitForSelector(`a[href="/@${user}/followers"]`);

  if (!followers) return;
  await followers.click();
  // await followers.evaluate((b) => b.click());
  await page.waitForTimeout(3500);
  await page.$$eval('div.pb-4', async (allUsers) =>
    allUsers.map(async (user) => {
      const userPhoto = user.querySelector('img')

      const button = user.querySelector('button')

      if (userPhoto && userPhoto.src !== "https://truthsocial.com/avatars/original/missing.png") {
        if (button && button.textContent !== "Unfollow") {
          button.click();
        }
      }
    })
  );
  console.log("Followed from Recent 10 with Profile Pictures");
  await page.waitForTimeout(5000);
}
