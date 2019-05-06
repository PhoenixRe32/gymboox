'use strict';

const {
  Builder,
  By,
  until,
} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');

const {
  email,
  password,
  login,
} = require('./locators');

const chromeOptions = new chrome.Options();
const defaultChromeFlags = ['--headless', '--disable-gpu', '--window-size=1280x1696', // Letter size
  '--no-sandbox', '--user-data-dir=/tmp/user-data', '--hide-scrollbars', '--enable-logging', '--log-level=0', '--v=99', '--single-process', '--data-path=/tmp/data-path', '--ignore-certificate-errors', '--homedir=/tmp', '--disk-cache-dir=/tmp/cache-dir'];
chromeOptions.setChromeBinaryPath('/var/task/lib/chrome');
chromeOptions.addArguments(defaultChromeFlags);
chrome.setDefaultService(new chrome.ServiceBuilder('./lib/chromedriver').build());
const loginUrl = 'https://gymbox.legendonlineservices.co.uk/enterprise/account/Login';
const timetableUrl = 'https://gymbox.legendonlineservices.co.uk/enterprise/BookingsCentre/MemberTimetable';

const Page = function () {
  this.driver = new Builder().setChromeOptions(chromeOptions).forBrowser('chrome').build();

  this.visit = async function (theUrl) {
    console.log(`Getting ${theUrl}`);
    return this.driver.get(theUrl);
  };

  this.quit = async function () {
    return this.driver.quit();
  };

  this.findById = async function (id) {
    await this.driver.wait(until.elementLocated(By.id(id)), 5000, `Looking for element id ${id}`);
    return this.driver.findElement(By.id(id));
  };

  this.findByName = async function (name) {
    await this.driver.wait(until.elementLocated(By.name(name)), 5000, `Looking for element name ${name}`);
    return this.driver.findElement(By.name(name));
  };

  this.write = async function (el, txt) {
    console.log(`Writing ${txt} to ${el}`);
    return el.sendKeys(txt);
  };

  this.submitCredentialsAndLogin = async function (account) {
    await this.visit(loginUrl);
    console.log(`About to find ${email}`);
    const emailInput = await this.findById(email);
    await this.write(emailInput, account.email);
    console.log(`About to find ${password}`);
    const passwordInput = await this.findById(password);
    await this.write(passwordInput, account.password);
    console.log(`About to find ${login}`);
    const loginButton = await this.findById(login);
    await loginButton.click();
    console.log('See if it worked by finding CSCAdmin');
    const resultStat = await this.findById('CSCAdmin');
    return this.driver.wait(async () => resultStat.getText(), 5000);
  };

  this.buyClass = async function (slotId) {
    await this.visit(timetableUrl);
    console.log(`About to find slot ${slotId}`);
    const classButton = await this.findById(`slot${slotId}`);
    console.log(`About to add it to the basket ${slotId}`);
    classButton.click();
    console.log('About to add buy it');
    const payButton = await this.findById('btnPayNow');
    payButton.click();
    console.log('See if it worked by finding totalAmount');
    const resultStat = await this.findById('totalAmount');
    return this.driver.wait(async () => resultStat.getText(), 5000);
  };
};

module.exports = Page;
