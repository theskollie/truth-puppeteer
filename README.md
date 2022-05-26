# Truth Social Puppeteer

A social experiment with Javascript Puppeteer headless Chromium browser automation on Truth Social.

## [View Live Results](https://truthsocial.com/@skollie) </br>

## How it works

Essentially, the bot is in a constant state of unfollowing/following the accounts in the given array. This allows you to stay in the top of the followers list of high profile accounts. The bot will also follow from their top 10 most recent followers, as well as unfollow accounts after a duration. <br/>
The bot will also post a tweet containing a random sentence from an [API](https://fungenerators.com/random/sentence) after looping reFollow (x) times and then restart.

## Languages

JavaScript + Puppeteer

### **Puppeteer**

Using Puppeteer I am able to turn any website into an API that I can scrape data from to be used elsewhere.

## Local Build

- `git clone https://github.com/theskollie/truth-puppeteer`
- `cd truth-puppeteer`
- `npm install`
- `npm run build`
- `npm run truthbot`

**Before Initial Launch:** <br>
Create a .env file with three variables:

- `TRUTHUSER="yourUsername"`
- `PASSWORD="yourPassword"`
- `FOLLOWCOUNT=50`

Follow Count is the amount of times the Refollow Script will run between posting a new random sentence tweet.

**Selecting Accounts to Refollow:** <br/>
Add accounts to refollow to the accounts array in reFollow.js.  
An initial check will run when script is started to ensure you're following all the accounts from the given array.

**Headless Mode** <br/>
By default, this will run headless, meaning you cannot see the browser running the operations in the background. <br/>
If you'd like to see the browser, add these arguments to puppeteer.launch: <br/>

- `headless: false`
- `defaultViewport: null`
- `args: ["--window-size=1920,1080", "--disable-site-isolation-trials"]`

## Secure?

Entire build is run locally on your PC. <br/>
No information is uploaded/share so you can safely input your username and password in a .env file

## Liability

This is just a social experiment and is not intended to be abused. If you work at Truth and want this taken down/fixed, hire me.
