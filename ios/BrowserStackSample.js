let wd = require('wd');
let assert = require('assert');
let asserters = wd.asserters;
let Q = wd.Q;
desiredCaps = {
  // Set your BrowserStack access credentials
  'browserstack.user' : 'stefanwisniewski_ReBo15',
  'browserstack.key' : '22VTbj5kBwpseMxJMv43',
    // Set app_url of the application under test
  'app' : 'bs://f0f2aa11e1e8171d747a06db3bd6bbd7ad05b14b',
  // Specify device and os_version for testing
  'device' : 'iPad Pro 12.9',
  'os_version' : '12',
  // Set other BrowserStack capabilities
  'project' : 'First NodeJS project',
  'build' : 'browserstack-build-1',
  'name': 'first_test'
};
// Initialize the remote Webdriver using BrowserStack remote URL
// and desired capabilities defined above
driver = wd.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");
//Login test
driver.init(desiredCaps)
  .then(function () {
    return driver.waitForElementByName('IdentidierUsername', asserters.isDisplayed 
    && asserters.isEnabled, 30000);
  })
  .then(function (userName) {
    return userName.sendKeys("salesmanagercs");
  })
  .then(function () {
    return driver.waitForElementById('Text Input', asserters.isDisplayed 
    && asserters.isEnabled, 30000);
  })
  .then(function (textInput) {
    return textInput.sendKeys("hello@browserstack.com"+"\n");
  })
  .then(function () {
    return driver.waitForElementById('Text Output', asserters.isDisplayed 
    && asserters.isEnabled, 30000);
  })
  .then(function (textOutput) {
    return textOutput.text().then(function(value) {
      if (value === "hello@browserstack.com")
        assert(true);
      else
        assert(false);
    });
  })
  .fin(function() { 
    // Invoke driver.quit() after the test is done to indicate that the test is completed.
    return driver.quit(); 
  })
  .done();
