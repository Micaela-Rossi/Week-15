class socialMedia {

    get twitterBtn() {
        return $("#page_wrapper > footer > ul > li.social_twitter > a");
    };

    get facebookBtn() {
        return $("#page_wrapper > footer > ul > li.social_facebook > a");
    };

    get linkedinBtn() {
        return $("#page_wrapper > footer > ul > li.social_linkedin > a");
    };

    async twitterBtnClick() {
        await this.twitterBtn.click();
    };

    async facebookBtnClick() {
        await this.facebookBtn.click();
    };

    async linkedinBtnClick() {
        await this.linkedinBtn.click();
    };
}

export default new socialMedia();