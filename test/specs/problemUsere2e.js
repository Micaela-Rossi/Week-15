import { inventory } from "../pageobjects/inventory";
import cart from "../pageobjects/cart";
import socialMedia from "../pageobjects/socialMedia";
import checkout from "../pageobjects/checkout";
import login from "../pageobjects/login";
import logout from "../pageobjects/logout";
const credential = require("../../credentials");

describe ("Complete flow for problem user, log in, add items to cart, delete items,complete the purchase, navigation in the page, logout .", () => {
    beforeAll("Open Browser", async () => {
        browser.setWindowSize(1440, 1024);
        browser.url("https://www.saucedemo.com/")

        const { username, password } = credential.problemUser;
        await login.loginProcess(username, password);
    });

    it("verify the images for each item are different.", async () => {
        const uniqueSrcArray = [...new Set(await inventory.srcImgsArray())];
        expect(uniqueSrcArray.length).toEqual(6);
    });

    it("add items to cart.", async () => {
        let cartCount = 1;

        await inventory.addCartBackpackClick();
        await expect(cart.spanCartNumber).toHaveText(cartCount.toString());

        cartCount++;

        await inventory.addCartBikeLightClick();
        await expect(cart.spanCartNumber).toHaveText(cartCount.toString());

        cartCount++;

        await inventory.addCartTshirtRedClick();
        await expect(cart.spanCartNumber).toHaveText(cartCount.toString());

        cartCount++;

        await inventory.addCartJacketClick();
        await expect(cart.spanCartNumber).toHaveText(cartCount.toString());

        cartCount++;

        await inventory.addCartOnesieClick();
        await expect(cart.spanCartNumber).toHaveText(cartCount.toString());

        cartCount++;

        await inventory.addCartTshirtClick();
        await expect(cart.spanCartNumber).toHaveText(cartCount.toString());
    });

    it("Click to open twitter page.", async () => {
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

    it("Click to open facebook page.", async () => {
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

    it("Click to open linkedin page.", async () => {
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

    it("Go to cart, remove an item and go back to add the item again.", async () => {
        await inventory.shoppingCartClick();
        await expect(browser).toHaveUrlContaining("cart");

        await inventory.removeCartOnesieClick();
        await cart.continueShoppingBtnClick();

        await expect(browser).toHaveUrlContaining("inventory");
        await inventory.addCartOnesieClick();
        await inventory.shoppingCartClick();
        await expect(browser).toHaveUrlContaining("cart");
    });

    it("Finish the purchase and back to the list of items", async () => {
        await cart.checkoutBtnClick();
        await expect(browser).toHaveUrlContaining("step-one");

        await checkout.fillForm();
        await checkout.continueBtnClick();
        await expect(browser).toHaveUrlContaining("step-two");

        await checkout.finishBtnClick();
        await expect(browser).toHaveUrlContaining("complete");
        await checkout.backHomeBtnClick();
        await expect(browser).toHaveUrlContaining("inventory");
    });

    it("Log out", async () => {
        await logout.logoutProcess();
    });
})