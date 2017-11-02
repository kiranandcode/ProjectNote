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


// using port 10001 for testing
let websiteURL = "http://localhost:10001/";

var assert = require('assert');


describe("The Project Note webpage", () => {
    describe("The Home page", () => {
        describe("The page title", () => {
            it("should be Project Note", function (done) {
                this.timeout(5000);
                driver.get(websiteURL).then(() => {
                    driver.getTitle().should.eventually.equal("Project Note").notify(done);
                })
            })
        })
        describe("The login button", () => {
            it("should be visible", function (done) {
                this.timeout(5000);
                driver.get(websiteURL).then(() => {
                    driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//a[contains(text(), "Login")]')))).should.be.fulfilled.notify(done);
                })
            })
        })
        describe("The signup button", () => {
            it("should be visible", function (done) {
                this.timeout(5000);
                driver.get(websiteURL).then(() => {
                    driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//a[contains(text(), "Sign up")]')))).should.be.fulfilled.notify(done);
                })
            })
        })
    })
    describe("The Login page", () => {
        // describe("Login", () => {
        //     it("should be able to type password", function (done) {
        //         this.timeout(5000);
        //         driver.get(websiteURL).then(() => {
        //             driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//a[contains(text(), "Login")]')))).then(() => {
        //                 driver.findElement(By.xpath('//a[contains(text(), "Login")]')).click().then(() => {
        //                     driver.findElement(By.xpath('//*[@id="formHorizontalPassword"]')).then((elem) => {
        //                         driver.executeScript("arguments[0].setAttribute('value', 'password')", elem).then(() => {
        //                             driver.findElement(By.xpath('//*[@id="formHorizontalPassword"]')).getAttribute("value").should.eventually.equal("password").notify(done);
        //                         })

        //                     })
        //                 })
        //             });
        //         })
        //     })
        // })
        describe("The login process", () => {
            it("should redirect to root/ after logging in", function (done) {
                this.timeout(5000);
                driver.get(websiteURL).then(() => {
                    driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//a[contains(text(), "Login")]')))).then(() => {
                        driver.findElement(By.xpath('//a[contains(text(), "Login")]')).click().then(() => {
                            driver.findElement(By.xpath('//*[@id="formHorizontalPassword"]')).then((elem) => {
                                driver.executeScript("arguments[0].setAttribute('value', 'dhen')", elem).then(() => {
                                    driver.findElement(By.xpath('//*[@id="formHorizontalEmail"]')).then((elem2) => {
                                        driver.executeScript("arguments[0].setAttribute('value', 'alex')", elem2).then(() => {
                                            driver.findElement(By.xpath('//*[@id="root"]/div/div/div/form/div[3]/div/button')).click().then(() => {
                                                driver.getCurrentUrl().should.eventually.equal(websiteURL).notify(done);
                                            })
                                        })

                                    })
                                })

                            });
                        })
                    });
                })
            })
        })
    })
})


