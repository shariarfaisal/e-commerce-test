const puppeteer = require('puppeteer')
let browser, page;

beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: false
    })
    page = await browser.newPage()
    await page.goto('http://localhost:3000')
})

afterEach(async () => {
    await page.close()
    await browser.close()
})

test('Header navbar has the correct text', async () => {

    const result = await page.evaluate(() => {
        const navbarBrand = document.querySelector('.navbar-brand').innerText
        return navbarBrand
    })

    expect(result).toEqual('E-commerce')
})


test('login modal opening test', async () => {
    const loginText = await page.$$eval('.nav-link.text-info',el => {
        return el[1].innerText
    })
    expect(loginText).toEqual('Login')
})