# Cucumber Boilerplate

[![Test](https://github.com/webdriverio/cucumber-boilerplate/actions/workflows/test.yaml/badge.svg)](https://github.com/webdriverio/cucumber-boilerplate/actions/workflows/test.yaml)

---

Boilerplate project to run WebdriverIO (v7) tests with [Cucumber](https://cucumber.io/) and brings **true** [BDD](http://en.wikipedia.org/wiki/Behavior-driven_development) to JavaScript. Instead of writing complicated test code that only developers can understand, Cucumber maps an ordinary language to code and allows to start with the test process in the early stages of your product development.

## Requirements

-   Node version 12 or higher
-   A preconfigured Selenium Grid, preinstalled browser driver or cloud provider account

Although this project works fine with NPM we recommend to use Yarn (>= 1.0.0) instead, due to its speed & solid dependency locking mechanism. To keep things simple we use yarn in this guide, but feel free to replace this with NPM if that is what you are using.

Also this project doesn't cover setting up a proper test environment. You need to download specific browser driver yourself and run the prior starting tests or use a cloud provider like [SauceLabs](https://saucelabs.com/).

## Quick start

Install the dependencies (`npm install`)

Now you are ready to write your own features.

## Features

-   Super simple setup
-   Full integration with [WebdriverIO](http://webdriver.io/)
-   Over 150 predefined steps that cover almost everything you need, you can start writing tests right away
-   Easy integration with cloud services like [Sauce Labs](https://saucelabs.com/)
-   Integration of WebdriverIO's Multiremote functionality
-   Easy to run tests in parallel

# How to write a test

Tests are written in [Gherkin syntax](https://cucumber.io/docs/gherkin/)
that means that you write down what's supposed to happen in a real language. All test files are located in
`./src/features/*` and have the file ending `.feature`. You will already find some test files in that
directory. They should demonstrate, how tests could look like. Just create a new file and write your first
test.

**myFirstTest.feature**

```gherkin
Feature:
    In order to keep my product stable
    As a developer or product manager
    I want to make sure that everything works as expected

Scenario: Check title of website after search
    Given I open the url "http://google.com"
    When I set "WebdriverIO" to the inputfield "#lst-ib"
    And I press "Enter"
    Then I expect that the title is "WebdriverIO - Google Search"

Scenario: Another test
    Given ...

```

This test opens the browser and navigates them to google.com to check if the title contains the search
query after doing a search. As you can see, it is pretty simple and understandable for everyone.

# How to run the test

Start the local web server:

```sh
$ npm run test
```

To run your tests just call the [WDIO runner](http://webdriver.io/guide/testrunner/gettingstarted.html):

```sh
$ npm run wdio
```

_please note_ The WDIO runner uses the configuration file `wdio.conf.js` by default.

# Configurations

To configure your tests, checkout the [`wdio.conf.js`](https://github.com/webdriverio/cucumber-boilerplate/blob/main/wdio.conf.js) file in your test directory. It comes with a bunch of documented options you can choose from.

## Environment-specific configurations

You can setup multiple configs for specific environments. Let's say you want to have a different `baseUrl` for
your local and pre-deploy tests. Use the `wdio.conf.js` to set all general configs (like mochaOpts) that don't change.
They act as default values. For each different environment you can create a new config with the following name
scheme:

```txt
wdio.<ENVIRONMENT>.conf.js
```

Now you can create a specific config for your pre-deploy tests:

**wdio.STAGING.conf.js**

```js
var config = require('./wdio.conf.js').config;

config.baseUrl = 'http://staging.example.com';

exports.config = config;
```

Your environment-specific config file will get merged into the default config file and overwrites the values you set.
To run a test in a specific environment just add the desired configuration file as the first parameter:

```sh
$ yarn run wdio wdio.STAGING.conf.js
```

# Running single feature

Sometimes it's useful to only execute a single feature file, to do so use the following command:

```sh
$ npx wdio wdio.conf.js --spec ./test/features/select.feature
```

# Using tags

If you want to run only specific tests you can mark your features with tags. These tags will be placed before each feature like so:

```gherkin
@Tag
Feature: ...
```

To run only the tests with specific tag(s) use the `--cucumberOpts.tagExpression=` parameter like so:

```sh
$ npx wdio wdio.conf.js --cucumberOpts.tagExpression='@Tag or @AnotherTag'
```

For more tag options please see the [Cucumber.js documentation](https://docs.cucumber.io/tag-expressions/)

# Pending test

If you have failing or unimplemented tests you can mark them as "Pending" so they will get skipped.

```gherkin
// skip whole feature file
@Pending
Feature: ...

// only skip a single scenario
@Pending
Scenario: ...
```

# Adding new steps and snippets

The predefined snippets allow you to do a lot of common things but you might need extra snippets which
are better aligned with your aims. To do so you will find all step definitions in `./src/steps`. They
are separated in `given`, `when` and `then`.

You define your snippet using regular expressions. This is pretty powerful as it allows you to create complex
sentences with multiple options. Everything that's within `"([^"]*)?"` gets captured and appended to the
callback. The last argument is always a callback function that you need to call when your step is done.
You can access the browser and your WebdriverIO instance with `browser`.

To assert values this boilerplate project uses WebdriverIOs embedded assertion library called [expect-webdriverio](https://www.npmjs.com/package/expect-webdriverio).

# Comments

You can add additional descriptive comments in your feature files.

```gherkin
###
  This is a
  block comment
###
Feature: As a bystander
    I can watch bottles falling from a wall
    So that I can be mildly amused

# This is a single line comment
Scenario: check if username is present
    Given I login as "roboter" with password "test123"
    Then the username "roboter" should be present in the header
```

# List of predefined steps

Check out all predefined snippets. You can see how they get used in [`sampleSnippets.feature`](https://github.com/webdriverio/cucumber-boilerplate/blob/main/src/features/sampleSnippets.feature).

## Given steps

-   `I open the (url|site) "([^"]*)?"` <br>Open a site in the current browser window/tab
-   `the element "([^"]*)?" is( not)* displayed` <br>Check the (in)visibility of an element
-   `the element "([^"]*)?" is( not)* enabled` <br>Check if an element is (not) enabled
-   `the element "([^"]*)?" is( not)* selected` <br>Check if an element is (not) selected
-   `the checkbox "([^"]*)?" is( not)* checked` <br>Check if a checkbox is (not) checked
-   `there is (an|no) element "([^"]*)?" on the page` <br>Check if an element (does not) exist
-   `the title is( not)* "([^"]*)?"` <br>Check the title of the current browser window/tab
-   `the element "([^"]*)?" contains( not)* the same text as element "([^"]*)?"` <br>Compare the text of two elements
-   `the (button|element) "([^"]*)?"( not)* contains the text "([^"]*)?"` <br>Check if an element contains the given text
-   `the (button|element) "([^"]*)?"( not)* contains any text` <br>Check if an element does not contain any text
-   `the (button|element) "([^"]*)?" is( not)* empty` <br>Check if an element is empty
-   `the page url is( not)* "([^"]*)?"` <br>Check the url of the current browser window/tab
-   `the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"` <br>Check the value of an element's (css) attribute
-   `the cookie "([^"]*)?" contains( not)* the value "([^"]*)?"` <br>Check the value of a cookie
-   `the cookie "([^"]*)?" does( not)* exist` <br>Check the existence of a cookie
-   `the element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)` <br>Check the width/height of an element
-   `the element "([^"]*)?" is( not)* positioned at ([\d]+)px on the (x|y) axis` <br>Check the position of an element
-   `I have a screen that is ([\d]+) by ([\d]+) pixels` <br>Set the browser size to a given size
-   `I have closed all but the first (window|tab)` <br>Close all but the first browser window/tab
-   `a (alertbox|confirmbox|prompt) is( not)* opened` <br>Check if a modal is opened

## Then steps

-   `I expect that the title is( not)* "([^"]*)?"` <br>Check the title of the current browser window/tab
-   `I expect that element "([^"]*)?" does( not)* appear exactly "([^"]*)?" times` <br>Checks that the element is on the page a specific number of times
-   `I expect that element "([^"]*)?" is( not)* visible` <br>Check if a certain element is visible
-   `I expect that element "([^"]*)?" becomes( not)* visible` <br>Check if a certain element becomes visible
-   `I expect that element "([^"]*)?" is( not)* within the viewport` <br>Check if a certain element is within the current viewport
-   `I expect that element "([^"]*)?" does( not)* exist` <br>Check if a certain element exists
-   `I expect that element "([^"]*)?"( not)* contains the same text as element "([^"]*)?"` <br>Compare the text of two elements
-   `I expect that (button|element) "([^"]*)?"( not)* contains the text "([^"]*)?"` <br>Check if an element or input field contains the given text
-   `I expect that (button|element) "([^"]*)?"( not)* contains any text` <br>Check if an element or input field contains any text
-   `I expect that (button|elementelement) "([^"]*)?" is( not)* empty` <br>Check if an element or input field is empty
-   `I expect that the url is( not)* "([^"]*)?"` <br>Check if the the URL of the current browser window/tab is a certain string
-   `I expect that the path is( not)* "([^"]*)?"` <br>Check if the path of the URL of the current browser window/tab is a certain string
-   `I expect the url to( not)* contain "([^"]*)?"` <br>Check if the URL of the current browser window/tab contains a certain string
-   `I expect that the( css)* attribute "([^"]*)?" from element "([^"]*)?" is( not)* "([^"]*)?"` <br>Check the value of an element's (css) attribute
-   `I expect that checkbox "([^"]*)?" is( not)* checked` <br>Check if a check-box is (not) checked
-   `I expect that element "([^"]*)?" is( not)* selected` <br>Check if an element is (not) selected
-   `I expect that element "([^"]*)?" is( not)* enabled` <br>Check if an element is (not) enabled
-   `I expect that cookie "([^"]*)?"( not)* contains "([^"]*)?"` <br>Check if a cookie with a certain name contains a certain value
-   `I expect that cookie "([^"]*)?"( not)* exists` <br>Check if a cookie with a certain name exist
-   `I expect that element "([^"]*)?" is( not)* ([\d]+)px (broad|tall)` <br>Check the width/height of an element
-   `I expect that element "([^"]*)?" is( not)* positioned at ([\d]+)px on the (x|y) axis` <br>Check the position of an element
-   `I expect that element "([^"]*)?" (has|does not have) the class "([^"]*)?"` <br>Check if an element has a certain class
-   `I expect a new (window|tab) has( not)* been opened` <br>Check if a new window/tab has been opened
-   `I expect the url "([^"]*)?" is opened in a new (tab|window)` <br>Check if a URL is opened in a new browser window/tab
-   `I expect that element "([^"]*)?" is( not)* focused` <br>Check if an element has the focus
-   `I wait on element "([^"]*)?"( for (\d+)ms)*( to( not)* (be checked|be enabled|be selected|be visible|contain a text|contain a value|exist))*` <br>Wait for an element to be checked, enabled, selected, visible, contain a certain value or text or to exist
-   `I expect that a (alertbox|confirmbox|prompt) is( not)* opened` <br>Check if a modal is opened
-   `I expect that a (alertbox|confirmbox|prompt)( not)* contains the text "$text"` <br>Check the text of a modal

## When steps

-   `I (click|doubleclick) on the (link|button|element) "([^"]*)?"` <br>(Double)click a link, button or element
-   `I (add|set) "([^"]*)?" to the inputfield "([^"]*)?"` <br>Add or set the content of an input field
-   `I clear the inputfield "([^"]*)?"` <br>Clear an input field
-   `I drag element "([^"]*)?" to element "([^"]*)?"` <br>Drag an element to another element
-   `I submit the form "([^"]*)?"` <br>Submit a form
-   `I pause for (\d+)ms` <br>Pause for a certain number of milliseconds
-   `I set a cookie "([^"]*)?" with the content "([^"]*)?"` <br>Set the content of a cookie with the given name to the given string
-   `I delete the cookie "([^"]*)?"` <br>Delete the cookie with the given name
-   `I press "([^"]*)?"` <br>Press a given key. You’ll find all supported characters [here](https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions). To do that, the value has to correspond to a key from the table.
-   `I (accept|dismiss) the (alertbox|confirmbox|prompt)` <br>Accept or dismiss a modal window
-   `I enter "([^"]*)?" into the prompt` <br>Enter a given text into a modal prompt
-   `I scroll to element "([^"]*)?"` <br>Scroll to a given element
-   `I close the last opened (window|tab)` <br>Close the last opened browser window/tab
-   `I focus the last opened (window|tab)` <br>Focus the last opened browser window/tab
-   `I log in to site with username "([^"]*)?" and password "([^"]*)?"` <br>Login to a site with the given username and password
-   `I select the (\d+)(st|nd|rd|th) option for element "([^"]*)?"` <br>Select an option based on it's index
-   `I select the option with the (name|value|text) "([^"]*)?" for element "([^"]*)?"` <br>Select an option based on its name, value or visible text
-   `I move to element "([^"]*)?"( with an offset of (\d+),(\d+))` <br>Move the mouse by an (optional) offset of the specified element
