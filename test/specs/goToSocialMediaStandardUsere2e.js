import { logoutProcess } from "./functionsReusables";
import login from "../pageobjects/login";
import socialMedia from "../pageobjects/socialMedia";
const credential = require("../../credentials");

describe ("Navigation to social media.", () => {
    beforeAll("Open Browser", async () => {
        browser.setWindowSize(1440, 1024);
        browser.url("https://www.saucedemo.com/")

        const { username, password } = credential.standardUser;
        await login.loginProcess(username, password);

    });

    it("Go to the twitter page.", async () => {
        const sauceDemoWindow = await browser.getWindowHandle();
        const windowsBeforeClick = await browser.getWindowHandles();
        expect(socialMedia.twitterBtn).toBeDisplayed();
        await socialMedia.twitterBtnClick();
        await browser.pause(2000);
        const windowsAfterClick = await browser.getWindowHandles();

        const twitterWindow = windowsAfterClick.find((window) => !windowsBeforeClick.includes(window));
        await browser.switchToWindow(twitterWindow);
        const twitterWindowUrl = await browser.getUrl();
        const expectedTwitterUrl = "https://twitter.com/saucelabs";
        expectAsync(twitterWindowUrl).toBe(expectedTwitterUrl);

        const isNewTabOpened = windowsAfterClick.length > windowsBeforeClick.length;
        expectAsync(isNewTabOpened).toBe(true);

        await browser.switchToWindow(sauceDemoWindow);
    });

    it("Go to the facebook page.", async () => {
        const sauceDemoWindow = await browser.getWindowHandle();
        const windowsBeforeClick = await browser.getWindowHandles();
        expect(socialMedia.facebookBtn).toBeDisplayed();
        await socialMedia.facebookBtnClick();
        await browser.pause(2000);
        const windowsAfterClick = await browser.getWindowHandles();

        const facebookWindow = windowsAfterClick.find((window) => !windowsBeforeClick.includes(window));
        await browser.switchToWindow(facebookWindow);
        const facebookWindowUrl = await browser.getUrl();
        const expectedFacebookUrl = "https://www.facebook.com/saucelabs";
        expectAsync(facebookWindowUrl).toBe(expectedFacebookUrl);

        const isNewTabOpened = windowsAfterClick.length > windowsBeforeClick.length;
        expectAsync(isNewTabOpened).toBe(true);

        await browser.switchToWindow(sauceDemoWindow);
    });

    it("Go to the linkedin page.", async () => {
        const sauceDemoWindow = await browser.getWindowHandle();
        const windowsBeforeClick = await browser.getWindowHandles();
        expect(socialMedia.linkedinBtn).toBeDisplayed();
        await socialMedia.linkedinBtnClick();
        await browser.pause(2000);
        const windowsAfterClick = await browser.getWindowHandles();

        const linkedinWindow = windowsAfterClick.find((window) => !windowsBeforeClick.includes(window));
        await browser.switchToWindow(linkedinWindow);
        const linkedinWindowUrl = await browser.getUrl();
        const expectedLinkedinUrl = "https://www.linkedin.com/company/sauce-labs/";
        expectAsync(linkedinWindowUrl).toBe(expectedLinkedinUrl);

        const isNewTabOpened = windowsAfterClick.length > windowsBeforeClick.length;
        expectAsync(isNewTabOpened).toBe(true);

        await browser.switchToWindow(sauceDemoWindow);
    });

    afterAll("Log out process.", async () => {
        await logoutProcess();
    });
})