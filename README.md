# Email verification beyond regular expressions

Pokemail `[pəʊkimeɪl]` is a [Node.js](http://nodejs.org) library for email address verification.

Apart from mere syntax verification, it talks to DNS and SMTP servers to determine the validity and
therefore reachability of an email address.

In order to verify an email address, a series of checks are performed:

* **Syntax check**: Verify whether the format of the email address is correct i.e has an `@` sign
* **Disposable email address**: Check whether the domain name of the address is used for temporary email addresses
* **Presence of MX records**: Check whether there are MX records on the domain. If there aren't,
  the email address can not receive emails
* **Presence of SMTP server**: Check whether a connection to the SMTP server, indicated in the MX records,
  can be established. If there aren't, the email address can not receive emails
* **Verification with SMTP server**: A SMTP connection with the server responsible for the email will be attempted.
  In case the server does not allow verification, the email may or may not exist

![Checks flow](docs/images/check-flow.png)

# Installation

TODO

# Usage

TODO

# FAQ

### What is wrong with regular expressions?

There is nothing inherently wrong with regular expressions. It is [how we (ab)use them](https://blog.codinghorror.com/regex-use-vs-regex-abuse/).

Using regular expressions to [validate an email](http://www.ex-parrot.com//~pdw/Mail-RFC822-Address.html) yields nothing more than an indication the email is properly formatted. It says nothing about whether that address actually exists.

### Does Pokemail always work?

No, not always. As with any email validation there will always be false positives or negatives.
The only way to guarantee the validity of an email address is to send an email and solicit a response.

However, this library is still useful for detecting disposable email addresses and acts as a good first line of defence.

### Why should I use Pokemail?

You should not. It is still work in progress initiated as an iterative means to level up my JavaScript skills. See also [why it is not guaranteed to work](#does-pokemail-always-work).

# Credits :heart:

* This project is heavily inspired by [MailTester.com](http://www.mailtester.com)
* Disposable domains are checked using [Kickbox](https://kickbox.io). If you
  need to verify emails in bulk or in more reliable fashion, check them out
