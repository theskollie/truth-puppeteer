export const unfollow = async (page) => {
    
      await page.goto(`https://truthsocial.com/@${process.env.TRUTHUSER}`);
      const following = await page.waitForSelector(`a[href="/@${process.env.TRUTHUSER}/following"]`);
      await following.evaluate((b) => b.click());
      await page.waitForTimeout(2000);

      for(let i=0; i<3; i++) {
        await page.evaluate(async () => {
            window.scrollBy(0,1000); 
        })
        await page.waitForTimeout(2000);
      }

      await page.waitForSelector('div.pb-4');
      await page.$$eval('div.pb-4', async (allUsers) => 
      allUsers.map( async (user) => {   
            if(await user.querySelector('button').textContent === 'Unfollow'){
               await user.querySelector('button').click();
            }            
      })
    );
      
    await page.waitForTimeout(5000);
}
