import { Page } from "puppeteer";
import { logger } from './logger';


export async function login(page: Page) {
  const loginurl = "https://truthsocial.com/login";
  await page.goto(loginurl);
  await page.waitForSelector("[name=username]");

  await page.type("[name=username]", process.env.TRUTHUSER as string, { delay: 100 });
  await page.type("[name=password]", process.env.PASSWORD as string, { delay: 100 });
  await page.click(".flex.justify-end [data-testid=button]");
  await page.waitForSelector(".mt-4 button");
  await page.waitForTimeout(3000);
  logger("info", "Login Successful");
}
