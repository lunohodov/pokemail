# Pokemail: Email verification beyond regular expressions

[![CI Status](https://travis-ci.org/lunohodov/pokemail.svg?branch=master)](https://travis-ci.org/lunohodov/pokemail)

Pokemail `[pəʊkimeɪl]` is a [Node.js](http://nodejs.org) library for email address verification.

Apart from mere syntax verification, it talks to DNS and SMTP servers to determine the validity and
therefore reachability of an email address. Without sending actual emails.

In order to verify an email address, a series of checks are performed:

* **Syntax check**: Verify whether the format of the email address is correct i.e has an `@` sign
* **Domain/MX records check**: Check if the DNS records hold any MX entries for the email's domain. If there are none, the domain can not receive emails
* **Role-based account detection (TODO)**: Check whether the address is defined by a job rather than a person i.e `support@domain.com`
* **Disposable email address**: Check whether the domain name of the address is used for temporary email addresses
* **Verification with SMTP server (TODO)**: A SMTP connection with the server responsible for the email will be attempted. In case the server does not allow verification, the email may or may not exist

## Requirements

* Node.js >= v4.8.4

## Installation

Install with `npm`

```bash
npm install --save pokemail
```

Alternatively, you can use `yarn`

```bash
yarn add pokemail
```

## Usage

```javascript
const pokemail = require('pokemail');

// Get module's version
console.log(pokemail.version)

// Verify an email
pokemail.verify('test@example.org', (err, status) => {
  if (err) {
    // Handle error
  }
  // See the documentation for status
  console.log(status);
});
```

### Status information

A successful verification will result in the following status object

* **result** `string` - Verification result having one of the following values
  * `deliverable` - The email is syntactically valid and is not disposable
  * `risky` - The address is disposable
  * `undeliverable` - The address does not exist or is syntactically incorrect
* **reason** `string` - Indicates the reason for the result. It can have one of the following values
  * `low_deliverability` - Email address appears to be deliverable, but deliverability cannot be guaranteed
  * `low_quality` - Email address has quality issues that make it low value address
  * `invalid_email` - The given email does not have a valid syntax
  * `invalid_domain` - The domain of the email does not exist or is unable to receive emails (i.e. no MX record)
* **disposable** `boolean` - Indicates whether the address is disposable
* **email** `string` - The email this status applies to
* **success** `boolean` - `true` if there are no errors

## FAQ

### When to use Pokemail?

> The only feasible way to guarantee the validity of an email address is to send an email and solicit a response.

You should not rely solely on Pokemail when a valid email address confirmed by it's owner is required.
In such scenarios sending a confirmation email is the way to go.

Use Pokemail when sending verification/confirmation emails is not an option. It is also useful
for detecting disposable or role-based email addresses and acts as a good first line of defence.

### What is wrong with regular expressions?

There is nothing inherently wrong with regular expressions. It is [how we (ab)use them](https://blog.codinghorror.com/regex-use-vs-regex-abuse/).

Using regular expressions to [validate an email](http://www.ex-parrot.com//~pdw/Mail-RFC822-Address.html) yields nothing more than an indication the email is properly formatted. It says nothing about whether that address actually exists.

### Does Pokemail always work?

No, not always. As with any email validation there will always be false positives or negatives. See [when to use it](#when-to-use-pokemail).

### Why not utilise the power of JavaScript Promises?

With native Promise support far from widespread and the presence of so many
implementations, I don't want to impose my decision of which one to use on the
consumer of this library.

Whether `bluebird`, `es6-promise` or native `Promise` (ES2015) constructor, it
is up to you to "promisify" this library's API with your favourite implementation.

For example using the [pokemail() function](src/pokemail.js) with Bluebird might
look like this

```javascript
const Promise = require('bluebird')
const promisedPokemail = Promise.promisify(require('pokemail'))
```

## Authors

* **Yanko Ivanov** - *Initial work*

See also the list of [contributors](https://github.com/lunohodov/pokemail/graphs/contributors) who participated in this project.

## Licence

This project is licensed under the MIT License - see the [license](LICENSE.md) file for details.

## Acknowledgments

* [MailTester.com](http://www.mailtester.com) for inspiring me
* [Kickbox](https://kickbox.io) for their disposable domain check API 

P.S. This project was created mostly as a means to learn more about email verification approaches other than regular expressions.

