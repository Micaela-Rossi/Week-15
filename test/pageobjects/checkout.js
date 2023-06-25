class Checkout {
    get firstNameInput() {
        return $("#first-name");
    };

    get lastNameInput() {
        return $("#last-name");
    };

    get postalCodeInput() {
        return $("#postal-code");
    };

    get cancelBtn() {
        return $("#cancel");
    };

    get continueBtn() {
        return $("#continue");
    };

    get finishBtn() {
        return $("#finish");
    };

    get backHomeBtn() {
        return $("#back-to-products");
    };

    async cancelBtnClick() {
        await this.cancelBtn.click();
    };

    async continueBtnClick() {
        await this.continueBtn.click();
    };

    async finishBtnClick() {
        await this.finishBtn.click();
    };

    async backHomeBtnClick() {
        await this.backHomeBtn.click();
    };

    async fillForm() {
        await this.firstNameInput.setValue("Micaela");
        await this.lastNameInput.setValue("Rossi");
        await this.postalCodeInput.setValue("2000");
    }
}

export default new Checkout();