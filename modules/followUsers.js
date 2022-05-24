
export const followUsers = async (page, user) => {

    
    const followers = await page.waitForSelector(`a[href="/@${user}/followers"]`);
    await followers.evaluate((b) => b.click());
    await page.waitForTimeout(3500);
    await page.$$eval('div.pb-4', (allUsers) => 
      allUsers.map((user) => {
        if (user.querySelector('img') !== null && user.querySelector('img').src !== "https://truthsocial.com/avatars/original/missing.png" ) {     
          if(user.querySelector('button').textContent !== "Unfollow") {
            user.querySelector('button').click();
          }
        }
      })
    );
    console.log("Followed from Recent 10 with Profile Pictures");
    await page.waitForTimeout(5000);
}
