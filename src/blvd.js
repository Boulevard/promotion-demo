export class Blvd {
  constructor(tokenizeUrl, apiUrl, apiToken) {
    this.tokenizeUrl = tokenizeUrl;
    this.apiUrl = apiUrl;
    this.apiToken = apiToken;
  }

  purchaseProduct({ locationId, productId, card, client }) {
    this.cardDetails = card;
    this.locationId = locationId;
    this.productId = productId;
    this.clientInformation = client;

    return this.tokenizeCard()
      .then(this.createCart.bind(this))
      .then(this.addProduct.bind(this))
      .then(this.addPaymentToken.bind(this))
      .then(this.checkout.bind(this));
  }

  createCart() {
    if (this.cartId) {
      return Promise.resolve();
    }

    const query = `
      mutation ($input: CreateCartInput!) {
        createCart(input: $input) {
          cart {
            id
          }
        }
      }
    `;

    const input = {
      locationId: this.locationId,
      clientInformation: this.clientInformation
    };

    return this.request({ query, variables: { input } }).then(({ createCart }) => {
      this.cartId = createCart.cart.id;
      return this;
    });
  }

  addProduct() {
    if (this.productAdded) {
      return Promise.resolve();
    }

    const query = `
      mutation ($input: AddCartSelectedPurchasableItemInput!) {
        addCartSelectedPurchasableItem(input: $input) {
          cart {
            id
          }
        }
      }
    `;

    const input = {
      id: this.cartId,
      itemId: this.productId
    };

    return this.request({ query, variables: { input } }).then(() => {
      this.productAdded = true;
      return true;
    });
  }

  addPaymentToken() {
    const query = `
      mutation ($input: AddCartCardPaymentMethodInput!) {
        addCartCardPaymentMethod(input: $input) {
          cart {
            id
          }
        }
      }
    `;

    const input = {
      id: this.cartId,
      token: this.cardToken,
      select: true
    };

    return this.request({ query, variables: { input } }).then(() => {
      return true;
    });
  }

  checkout() {
    const query = `
      mutation ($input: CheckoutCartInput!) {
        checkoutCart(input: $input) {
          cart {
            id
          }
        }
      }
    `;

    const input = {
      id: this.cartId
    };

    return this.request({ query, variables: { input } }).then(() => {
      return true;
    });
  }

  tokenizeCard() {
    const { name, number, exp_month, exp_year, cvv } = this.cardDetails;
    const card = { name, number, exp_month, exp_year, cvv };

    return fetch(this.tokenizeUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'authorization': `Bearer ${this.apiToken}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({ card })
    })
      .then((response) => response.json())
      .then(({ error, success, token }) => {
        if (success) {
          this.cardToken = token;
          return this;
        }

        const err = error || "An error has occurred. Please try again later."
        throw (err);
      });
  }

  request(body) {
    return fetch(this.apiUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'authorization': `Bearer ${this.apiToken}`,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((response) => response.json())
      .then(({ errors, data }) => {
        if (errors && errors.length) {
          const message = errors.map((error) => error.message).join('\n');
          throw message;
        }

        return data;
      });
  }
};