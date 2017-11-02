let chai = require("chai");
let chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

let webdriver = require("selenium-webdriver");
let By = webdriver.By;
let until = webdriver.until;
let chromeOptions = new (require("selenium-webdriver/chrome").Options)();
chromeOptions.setChromeBinaryPath("/usr/bin/google-chrome-stable").addArguments("--headless").addArguments("--disable-gpu");
// let driver = new webdriver.Builder().forBrowser("chrome").build();
// chromeOptions.addArguments("--headless").addArguments("--disable-gpu");
let driver = new webdriver.Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();


let websiteURL = "http://localhost:10001/";

var assert = require('assert');


describe("Project Note Webpage", () => {
    describe("Home page", () => {
        describe("Title", () => {
            it("should equal Project Note", function (done) {
                this.timeout(5000);
                driver.get(websiteURL).then(() => {
                    driver.getTitle().should.eventually.equal("Project Note").notify(done);
                })
            })
        })
        describe("Login", () => {
            it("should be visible", function (done) {
                this.timeout(5000);
                driver.get(websiteURL).then(() => {
                    driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//a[contains(text(), "Login")]')))).should.be.fulfilled.notify(done);
                })
            })
        })
        describe("Signup", () => {
            it("should be visible", function (done) {
                this.timeout(5000);
                driver.get(websiteURL).then(() => {
                    driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//a[contains(text(), "Sign up")]')))).should.be.fulfilled.notify(done);
                })
            })
        })
    })
    describe("Login page", () => {
        describe("Login", () => {
            it("should be able to type password", function (done) {
                this.timeout(5000);
                driver.get(websiteURL).then(() => {
                    driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//a[contains(text(), "Login")]')))).then(() => {
                        driver.findElement(By.xpath('//a[contains(text(), "Login")]')).click().then(() => {
                            driver.findElement(By.xpath('//*[@id="formHorizontalPassword"]')).sendKeys("password").then(() => {
                                driver.findElement(By.xpath('//*[@id="formHorizontalPassword"]')).getAttribute("value").should.eventually.equal("password").notify(done);
                            })
                        })
                    });
                })
            })
        })
        describe("Login", () => {
            it("url should be websiteurl", function (done) {
                this.timeout(5000);
                driver.get(websiteURL).then(() => {
                    driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//a[contains(text(), "Login")]')))).then(() => {
                        driver.findElement(By.xpath('//a[contains(text(), "Login")]')).click().then(() => {
                            driver.findElement(By.xpath('//*[@id="formHorizontalPassword"]')).sendKeys("dhen").then(() => {
                                driver.findElement(By.xpath('//*[@id="formHorizontalEmail"]')).sendKeys("alex").then(() => {
                                    driver.findElement(By.xpath('//*[@id="root"]/div/div/div/form/div[3]/div/button')).click().then(() => {
                                        driver.getCurrentUrl().should.eventually.equal(websiteURL).notify(done);
                                    })
                                })
                            })
                        })
                    });
                })
            })
        })
    })
})


