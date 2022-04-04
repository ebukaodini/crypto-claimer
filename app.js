import puppeteer from "puppeteer-extra"
import RecaptchaPlugin from "puppeteer-extra-plugin-recaptcha"
import bypass from "./bypasser/captchaBypasser.js"

puppeteer.use(RecaptchaPlugin({
  provider: {
    fn: bypass
  }
}))

puppeteer.launch({ headless: false })
  .then(
    async (browser) => {
      const page = await browser.newPage()
      // await page.goto('https://www.tokyobitcoiner.com/hcaptcha')
      await page.goto('https://faucetpay.io/account/register')

      setTimeout(async () => {
        console.log('Solving captcha...')
        await page.solveRecaptchas()
        console.log('Captcha Solved!!!')
      }, 5000);

    }
  )