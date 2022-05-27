import { Page } from "puppeteer";
import { unfollow } from "./unfollow";

const getFollowingCount = async (runningUser: string, page: Page) =>{
  await page.goto(`https://truthsocial.com/@${runningUser}`);
  await page.waitForSelector(`a[href="/@${runningUser}/following"] > div > p:nth-child(1)`);
  const followers = await page.evaluate(() => {
    const selector = document.querySelector(`a[href="/@${runningUser}/following"] > div > p:nth-child(1)`);
    if(selector) return selector.textContent
    return;
  });


  return followers
}
const bulkUnfollow = async (runningUser: string, page: Page) => {

  await page.goto(`https://truthsocial.com/@${runningUser}`);
  await page.waitForSelector(`a[href="/@${runningUser}/following"] > div > p:nth-child(1)`);
  const followers = await page.evaluate(() => {
    const selector = document.querySelector(`a[href="/@${runningUser}/following"] > div > p:nth-child(1)`);
    if(selector) return selector.textContent
    return;
  });

  if(!followers) return;
  const unfollowLoopCount = Math.ceil((Number(followers) - 100) / 10);
  if(unfollowLoopCount < 0) return;

  let nowFollowers = followers;
  let priorLoopCount = followers;

  console.log(`Currently following ${followers} people. Going to attempt and unfollow ${(Number(followers) - 100) }`);

  for(let i = 0; i < unfollowLoopCount ; i += 1){
    await unfollow(page);
    await page.waitForTimeout(2000);
    nowFollowers = await getFollowingCount(runningUser, page) as string;
    console.log(`Unfollowed ${Number(priorLoopCount) - Number(nowFollowers)}`)
    priorLoopCount = nowFollowers;

  }
}
export {bulkUnfollow}