import { Page } from "puppeteer";
export const unfollow = async (page: Page) => {

  await page.goto(`https://truthsocial.com/@${process.env.TRUTHUSER}`);
  const following = await page.waitForSelector(`a[href="/@${process.env.TRUTHUSER}/following"]`);

  await page.evaluate((b) => b.click(), following);
  await page.waitForTimeout(2000);

  for (let i = 0; i < 4; i++) {
    await page.evaluate(async () => {
      window.scrollBy(0, 1000);
    })
    await page.waitForTimeout(2000);
  }

  await page.waitForSelector('div.pb-4');
  await page.$$eval('div.pb-4', async (allUsers) => {

    // TODO - find some way to pass a message out of here to track total users and unfollow count.
    for(let user of allUsers){
      if (!user) return;
      const buttonContent = user.querySelector('button');
      if (buttonContent && buttonContent.textContent === 'Unfollow') {
        buttonContent.click();
        await new Promise(function(resolve) {setTimeout(resolve, 1000)});
      }
    }
  }    
  );

  await page.waitForTimeout(5000);
}
