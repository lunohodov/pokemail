# About

Pokemail `[pəʊkimeɪl]` is a [Node.js](http://nodejs.org) library to check whether an email exists and if there are problems with it.


# FAQ

### How does Pokemail work?

First and foremost, no emails are being sent. In order to determine the validity
of an email address a series of checks will be performed:

* **Syntax check**: Verify whether the format of the email address is correct i.e has an `@` sign
* **Disposable email address**: Check whether the domain name of the address is used for temporary email addresses
* **Presence of MX records**: Check whether there are MX records on the domain. If there aren't,
  the email address can not receive emails
* **Presence of SMTP server**: Check whether a connection to the SMTP server, indicated in the MX records,
  can be established. If there aren't, the email address can not receive emails
* **SMTP verification**: A SMTP connection with the server responsible for the email will be attempted.
  In case the server does not allow verification, the email may or may not exist


### How do I use Pokemail?

You don't. This is a pet-project of mine to dust-up my JavaScript skills. It may
or may not work. Last but not least, using this library can get your server
blacklisted.

If you want to verify emails in a reliable fashion, do check what [Kickbox](https://kickbox.io)
has to offer.


### Does Pokemail always work?

No, not always. As with any email validation there will always be false
positives or negatives. The only way to guarantee an email is valid is to send an
email and solicit a response. However, this library is still useful for
detecting disposable emails etc., and acts as a good first line of defence.

# Credits

* This project is heavily inspired by [MailTester.com](http://www.mailtester.com)
* Disposable domains are checked using [Kickbox](https://kickbox.io)
