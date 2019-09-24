# Boulevard Client API Example Application

A sample repository showcasing a minimal integration with the Boulevard Client API, as seen on the [Abundant Salon Promotion website](https://abundantsalon.com/buy-one-get-one).

For more information about Boulevard, [check Boulevard's website](https://blvd.co/).

For the latest API documentation, reference [developers.blvd.co](https://developers.blvd.co).

![image](https://user-images.githubusercontent.com/2391584/65481355-db049400-de49-11e9-8c9f-2bb133fb7359.png)


## Building locally

```sh
git clone git@github.com:Boulevard/promotion-demo.git
cd promotion-demo && npm install
```

Replace the API credentials in `index.html` with your project's API credentials. To obtain API credentials, contact Boulevard Support `support@blvd.co`.

To view the project locally, start the webpack development server via `yarn start`.

## Folder Layout

This repository contains a minimal `index.html` (with the base markup and layout copied from Squarespace), along with two helper javascript class modules:

  * `src/blvd.js` - A wrapper around the Boulevard GraphQL Client API
  * `src/payment-form.js` - Helper functions for manipulating the html payment form

## License

"Boulevard" and the Boulevard logo are copyright (c) 2019 Boulevard.

Boulevard source code is released under MIT License.

Check [LICENSE](LICENSE) files for more information.
