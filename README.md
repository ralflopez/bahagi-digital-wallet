# 💳 Bahagi E - Wallet

An e wallet Graphql API using [Paymongo](https://www.paymongo.com/) to accept real money payments

# 🌐 Preview

![Preview](https://github.com/ralflopez/bahagi-digital-wallet/raw/main/preview.gif)

# 🌎 Live

- [Frontend (Vercel)](https://bahagi-digital-wallet.vercel.app/)
- [Backend (Heroku)](https://bahagi-e-wallet.herokuapp.com/graphql)

# 📝 Documentaion

- [Apollo Studio](https://studio.apollographql.com/sandbox/explorer) (Recommended)
  - Endpoint: http://localhost:4000/graphql
- [Graphql Playground](http://localhost:4000/graphql)
- [Github](https://github.com/ralflopez/bahagi-digital-wallet)
- [Paymongo](https://developers.paymongo.com/docs)

# ✨ Features

- Cash In (With credit card)
- Cash Out (To Gcash)
- Send Money
- Receive Money

# 👩‍💻 Tech Stack

- Typescript
- Nest.js
- Grahql
- PostgreSQL
- Docker

# 📕 Guide

The following guide uses [Paymongo Third Party Library (Javascript)](https://www.npmjs.com/package/paymongo)

## Cash In

1. **Create Payment Intent**
   This will request a payment intent to paymongo

```graphql
mutation CreatePaymongoPaymentIntent($paymentIntentInput: PaymentIntentInput!) {
  createPaymongoPaymentIntent(paymentIntentInput: $paymentIntentInput) {
    clientKey
  }
}
```

2. **Extract client key and payment intent id from the previous request**
   We will use these variables later

```javascript
const clientKey =
  createPaymentIntentResult.createPaymongoPaymentIntent.clientKey;
const paymentIntentId = clientKey.split('_client')[0];
```

3. **Make a payment method**

```javascript
const paymentMethodResult = await paymongo.paymentMethods.create({
  data: {
    attributes: {
      type: 'card',
      details: {
        card_number: 5455590000000009,
        exp_month: 05,
        exp_year: 25,
        cvc: 123,
      },
    },
  },
});
const paymentMethodId = paymentMethodResult.data.id;
```

4. **Tell server to cash in**
   This will create a database record with a default status of PROCESSING. We will change it later to SUCCESSFUL if payment from paymongo is confirmed

```grpahql
mutation CashIn($cashInInput: CashInInput!) {
  cashIn(cashInInput: $cashInInput) {
    id
    method
    details {
      amount
    }
  }
}
```

5. **Attach payment intent**
   This will attach the payment method to the payment intent and will return a status

```javascript
const response = await paymongo.paymentIntents.attach(paymentIntentId, {
  data: {
    attributes: {
      client_key: clientKey,
      payment_method: paymentMethodId,
    },
  },
});

const paymentIntent = response.data;
const paymentIntentStatus = paymentIntent.attributes.status;
```

5. **Handle payment status**
   The following example updates the database record to SUCCESSFUL if the payment succedded

```
if (paymentIntentStatus === "awaiting_next_action") {
        // Render your modal for 3D Secure Authentication since next_action has a value. You can access the next action via paymentIntent.attributes.next_action.
      } else if (paymentIntentStatus === "succeeded") {
        // You already received your customer's payment. You can show a success message from this condition.
        await udpateCashInStatus({
          variables: {
            updateExternalFundTransferStatusInput: {
              id: cashInId,
              status: FundTransferStatus.Success,
            },
          },
        })
      } else if (paymentIntentStatus === "awaiting_payment_method") {
        // The PaymentIntent encountered a processing error. You can refer to paymentIntent.attributes.last_payment_error to check the error and render the appropriate error message.
      } else if (paymentIntentStatus === "processing") {
        // You need to requery the PaymentIntent after a second or two. This is a transitory status and should resolve to `succeeded` or `awaiting_payment_method` quickly.
      }
```

## Cash Out

Test the following in the graphql playground

```graphql
mutation CashOut($cashOutInput: CashOutInput!) {
  cashOut(cashOutInput: $cashOutInput) {
    id
  }
}
```

## Send Money

Test the following in the graphql playground

```graphql
mutation CashOut($sendMoneyInput: SendMoneyInput!) {
  sendMoney(sendMoneyInput: $sendMoneyInput) {
    id
  }
}
```
