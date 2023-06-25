class logout {
    get burguerMenuBtn() {
        return $("#react-burger-menu-btn");
    };

    get logOutBtn() {
        return $("#logout_sidebar_link");
    };

    get navbarDisplayed() {
        return $("#menu_button_container > div > div.bm-menu-wrap > div.bm-menu");
    };

    async burguerMenuBtnClick() {
        await this.burguerMenuBtn.click();
    };

    async logOutBtnClick() {
        await this.logOutBtn.click();
    };

    async logoutProcess() {
        expect(this.burguerMenuBtn).toBeDisplayed();
        await this.burguerMenuBtnClick();
        expect(this.navbarDisplayed).toBeDisplayed();
        expect(this.logOutBtn).toBeDisplayed();
        await this.logOutBtnClick();
        await expect(browser).toHaveUrlContaining("saucedemo");
    };
}

export default new logout();