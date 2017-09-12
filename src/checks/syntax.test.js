import test from 'tape'
import checkSyntax from './syntax'

test('check-syntax dismisses invalid email', (t) => {
  const testEmails = [
    'invalidemail@',
    'invalid.com',
    '@invalid.com',
    'foo@bar.com.',
    'somename@ｇｍａｉｌ.com',
    'foo@bar.co.uk.',
    'z@co.c',
    'ｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌ@gmail.com',
    `${'a'.repeat(64)}@${'a'.repeat(251)}.com`,
    `${'a'.repeat(65)}@${'a'.repeat(250)}.com`,
    'test1@invalid.co m',
    'test2@invalid.co m',
    'test3@invalid.co m',
    'test4@invalid.co m',
    'test5@invalid.co m',
    'test6@invalid.co m',
    'test7@invalid.co m',
    'test8@invalid.co m',
    'test9@invalid.co m',
    'test10@invalid.co m',
    'test11@invalid.co m',
    'test12@invalid.co　m',
    'test13@invalid.co　m',
  ]

  testEmails.forEach((email) => {
    t.isNot(checkSyntax(email), true)
  })

  t.end()
})

test('check-syntax accepts valid email', (t) => {
  const testEmails = [
    'foo@bar.com',
    'x@x.au',
    'foo@bar.com.au',
    'foo+bar@bar.com',
    'hans.m端ller@test.com',
    'hans@m端ller.com',
    'test|123@m端ller.com',
    'test+ext@gmail.com',
    'gmail...ignores...dots...@gmail.com',
    'some.name.midd.leNa.me.+extension@GoogleMail.com',
    '"foobar"@example.com',
    '"  foo  m端ller "@example.com',
    '"foo\\@bar"@example.com',
    `${'a'.repeat(63)}@${'a'.repeat(250)}.com`,
  ]

  testEmails.forEach((email) => {
    t.is(checkSyntax(email), true)
  })

  t.end()
})
