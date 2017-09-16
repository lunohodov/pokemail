# Email verification beyond regular expressions

[![Build Status](https://travis-ci.org/lunohodov/pokemail.svg?branch=master)](https://travis-ci.org/lunohodov/pokemail)

Pokemail `[pəʊkimeɪl]` is a [Node.js](http://nodejs.org) library for email address verification.

Apart from mere syntax verification, it talks to DNS and SMTP servers to determine the validity and
therefore reachability of an email address. Without sending actual emails.

In order to verify an email address, a series of checks are performed:

* **Syntax check**: Verify whether the format of the email address is correct i.e has an `@` sign
* **Domain/MX records check**: Check if the DNS records hold any MX entries for the email's domain. If there aren't, the domain the email points to can not receive emails
* **Role-based account detection**: TODO
* **Disposable email address**: Check whether the domain name of the address is used for temporary email addresses
* **Verification with SMTP server**: A SMTP connection with the server responsible for the email will be attempted. In case the server does not allow verification, the email may or may not exist

# Installation and usage

Install with `npm`

```bash
npm install --save lunohodov/pokemon
```

Alternatively, you can use `yarn`

```bash
yarn add lunohodov/pokemon
```

An example usage below

```javascript
console.log('TODO')
```

# FAQ

### When to use Pokemail?

The only feasible way to guarantee the validity of an email address is to send an email and solicit a response.

Use Pokemail when sending verification/confirmation emails is not an option. It is also useful for detecting disposable email addresses and acts as a good first line of defence.

### What is wrong with regular expressions?

There is nothing inherently wrong with regular expressions. It is [how we (ab)use them](https://blog.codinghorror.com/regex-use-vs-regex-abuse/).

Using regular expressions to [validate an email](http://www.ex-parrot.com//~pdw/Mail-RFC822-Address.html) yields nothing more than an indication the email is properly formatted. It says nothing about whether that address actually exists.

### Does Pokemail always work?

No, not always. As with any email validation there will always be false positives or negatives. See [should-I-use-it](#when-to-use-pokemail) section.

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

# Credits :heart:

* This project is heavily inspired by [MailTester.com](http://www.mailtester.com)
* Disposable domains are checked using [Kickbox](https://kickbox.io). If you
  need to verify emails in bulk or in more reliable fashion, check them out
