import {Page} from 'puppeteer';


export const followUsers = async (page: Page, user:string) => {

    
    const followers = await page.waitForSelector(`a[href="/@${user}/followers"]`);

    if(!followers) return;
    followers.click();
    // await followers.evaluate((b) => b.click());
    await page.waitForTimeout(3500);
    await page.$$eval('div.pb-4', async (allUsers) => 
      allUsers.map( async (user) => {

        const selectedUser = user.querySelector('img');
        if(!selectedUser) return;

        if (selectedUser.src !== "https://truthsocial.com/avatars/original/missing.png" ) {     
          if(selectedUser.textContent !== "Unfollow") {
            selectedUser.click();
          }
        }
      })
    );
    console.log("Followed from Recent 10 with Profile Pictures");
    await page.waitForTimeout(5000);
}
