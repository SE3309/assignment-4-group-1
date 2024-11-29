# REST API Documentation

## Table of Contents

- [Client API](#client-api)
  - [Create Client](#create-client)
  - [Login](#client-login)
  - [Find Client](#find-client)
  - [Get All Clients](#get-all-clients)
  - [Update Client](#update-client)
  - [Delete Client](#delete-client)

## Client API

### Create Client

`POST /api/client`

Creates a new client with the given address, user, and student number. The response will include the client's ID, name,
phone number, email, client ID, student number, bank card, and account. The bank card will have a 16 digit random
number, pin, and verification value. The account will have a balance of $0.00. The bank card will have a daily limit of
200.00. The bank card will expire in 5 years. The bank card type will be `Debit`. The account type will be `Chequing`.


#### Request

```json
{
  "address": {
    "street_number": "2392",
    "street_name": "Cornerbrooke Crescent",
    "city": "Oakville",
    "province": "Ontario",
    "postal_code": "L6M4B5",
    "country": "Canada"
  },
  "user": {
    "name": "Boris Vasilev",
    "phone_number": "+1 (647) 890-2718",
    "email": "borisonekenobi@gmail.com",
    "date_of_birth": "2004-06-05",
    "password": "test123"
  },
  "student_number": "251276924"
}
```

#### Response

```json
{
  "id": "367f9e6f-f0d2-45c1-9766-8ec7277157dd",
  "student_number": "251276924",
  "user": {
    "name": "Boris Vasilev",
    "phone_number": "+1 (647) 890-2718",
    "email": "borisonekenobi@gmail.com",
    "date_of_birth": "2004-06-05",
    "id": "fc5ce876-0194-447d-a793-e8069a49d2a4"
  },
  "address": {
    "street_number": "2392",
    "street_name": "Cornerbrooke Crescent",
    "city": "Oakville",
    "province": "Ontario",
    "postal_code": "L6M4B5",
    "country": "Canada",
    "id": "fbec2d7c-bc84-4d26-9062-e6038761ec61"
  },
  "bank_card": {
    "id": "77b64868-055f-4d37-a606-edfd2e1ade28",
    "number": "9953810146034784",
    "pin": "0000",
    "verification_value": "133"
  }
}
```

### Client Login

`POST /api/client-login`

Logs in the client with the given card number and password. The response will include the client's ID, name, phone
number, email, client ID, student number, bank card, and all accounts linked to the bank card.

#### Request

```json
{
  "card_number": "3378776579328348",
  "password": "test123"
}
```

#### Response

```json
{
  "id": "367f9e6f-f0d2-45c1-9766-8ec7277157dd",
  "student_number": 251276924,
  "user": {
    "id": "fc5ce876-0194-447d-a793-e8069a49d2a4",
    "name": "Boris Vasilev",
    "phone_number": "+1 (647) 890-2718",
    "email": "borisonekenobi@gmail.com"
  },
  "address": {
    "id": "fbec2d7c-bc84-4d26-9062-e6038761ec61",
    "street_number": 2392,
    "street_name": "Cornerbrooke Crescent",
    "city": "Oakville",
    "province": "Ontario",
    "postal_code": "L6M4B5",
    "country": "Canada"
  },
  "bank_card": {
    "id": "77b64868-055f-4d37-a606-edfd2e1ade28",
    "type_id": "0d8dbd75-2ec9-400c-99ae-5e0ca9759701",
    "type": "Debit",
    "expiry_date": "2029-11-29T05:00:00.000Z",
    "number": "9953810146034784",
    "status": "active",
    "daily_limit": "$200.00"
  },
  "accounts": [
    {
      "id": "cc089bf3-f63d-4121-8f7f-cdfde67ecfe4",
      "type_id": "03acb47d-94ef-41bb-9533-7606b2b81bdb",
      "type": "Chequing",
      "balance": "$0.00",
      "status": "active",
      "bank_card_id": "77b64868-055f-4d37-a606-edfd2e1ade28"
    }
  ]
}
```

### Find Client

`GET /api/client/:id`

Finds the client with the given ID. The response will include the client's ID, name, phone number, email, client ID,
student number, bank cards, and accounts.

#### Response

```json
{
  "id": "367f9e6f-f0d2-45c1-9766-8ec7277157dd",
  "student_number": 251276924,
  "user": {
    "id": "fc5ce876-0194-447d-a793-e8069a49d2a4",
    "name": "Boris Vasilev",
    "phone_number": "+1 (647) 890-2718",
    "email": "borisonekenobi@gmail.com"
  },
  "address": {
    "id": "fbec2d7c-bc84-4d26-9062-e6038761ec61",
    "street_number": 2392,
    "street_name": "Cornerbrooke Crescent",
    "city": "Oakville",
    "province": "Ontario",
    "postal_code": "L6M4B5",
    "country": "Canada"
  },
  "bank_cards": [
    {
      "id": "77b64868-055f-4d37-a606-edfd2e1ade28",
      "expiry_date": "2029-11-29T05:00:00.000Z",
      "number": "9953810146034784",
      "status": "active",
      "daily_limit": "$200.00",
      "type_id": "0d8dbd75-2ec9-400c-99ae-5e0ca9759701",
      "type": "Debit"
    }
  ],
  "accounts": [
    {
      "id": "cc089bf3-f63d-4121-8f7f-cdfde67ecfe4",
      "type_id": "03acb47d-94ef-41bb-9533-7606b2b81bdb",
      "type": "Chequing",
      "balance": "$0.00",
      "status": "active",
      "bank_card_id": "77b64868-055f-4d37-a606-edfd2e1ade28"
    }
  ]
}
```

### Get All Clients

`GET /api/clients`

Gets all clients. The response will include an array of clients with their ID, name, phone number, email, client ID,
student number, bank cards, and accounts.

#### Response

```json
[
  {
    "id": "367f9e6f-f0d2-45c1-9766-8ec7277157dd",
    "student_number": 251276924,
    "user": {
      "id": "fc5ce876-0194-447d-a793-e8069a49d2a4",
      "name": "Boris Vasilev",
      "phone_number": "+1 (647) 890-2718",
      "email": "borisonekenobi@gmail.com"
    },
    "address": {
      "id": "fbec2d7c-bc84-4d26-9062-e6038761ec61",
      "street_number": 2392,
      "street_name": "Cornerbrooke Crescent",
      "city": "Oakville",
      "province": "Ontario",
      "postal_code": "L6M4B5",
      "country": "Canada"
    },
    "bank_cards": [
      {
        "id": "77b64868-055f-4d37-a606-edfd2e1ade28",
        "expiry_date": "2029-11-29T05:00:00.000Z",
        "number": "9953810146034784",
        "status": "active",
        "daily_limit": "$200.00",
        "type_id": "0d8dbd75-2ec9-400c-99ae-5e0ca9759701",
        "type": "Debit"
      }
    ],
    "accounts": [
      {
        "id": "cc089bf3-f63d-4121-8f7f-cdfde67ecfe4",
        "type_id": "03acb47d-94ef-41bb-9533-7606b2b81bdb",
        "type": "Chequing",
        "balance": "$0.00",
        "status": "active",
        "bank_card_id": "77b64868-055f-4d37-a606-edfd2e1ade28"
      }
    ]
  }
]
```

### Update Client

`PUT /api/client/:id`

This hasn't been implemented yet. The response will be a 501 Not Implemented status code.

#### Response

<span style="color:red">501</span> Not Implemented

### Delete Client

`DELETE /api/client/:id`

Marks the client with the given ID as `inactive` preventing them from logging in. The response will be a 204 No Content
status code.

#### Response

<span style="color:green">204</span> No Content