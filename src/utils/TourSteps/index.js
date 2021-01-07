export default () => [
  {
    selector: '[data-tut="first-step"]',
    content: global.translate(
      `This section shows information about your default wallet, including its balance. You can also use the shortcut to top up your wallet or to add a new wallet.`,
    ),
  },
  {
    selector: '[data-tut="second-step"]',
    content: global.translate(
      `The currencies you are using are displayed here. You can click on any of them to get your total Net worth in the given currency.`,
    ),
  },
  {
    selector: '[data-tut="third-step"]',
    content: global.translate(
      `Should you a Prepaid card, this section is there for you to add or manage your prepaid cards.`,
    ),
  },
  {
    selector: '[data-tut="fourth-step"]',
    content: global.translate(
      `We put here for you the shortcut of the more useful transfer and payment options.`,
    ),
  },
  {
    selector: '[data-tut="fifth-step"]',
    content: global.translate(
      `In this section, you will find your favorite contacts. It makes it easy to send money to them. Click on SEE ALL to view all your contacts list.`,
    ),
  },
  {
    selector: '[data-tut="sixth-step"]',
    content: global.translate(
      'This is a view of your latest transactions. Click on SEE ALL to view the full list of your transactions.',
    ),
  },
];
