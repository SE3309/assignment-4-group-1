# REST API Documentation

## Table of Contents

- [Client API](#client-api)
    - [Create Client](#create-client)
    - [Login](#client-login)
    - [Find Client](#find-client)
    - [Get All Clients](#get-all-clients)

## Client API

### Create Client

`POST /api/client`

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
    "date_of_birth": "2004-06-05"
  },
  "student_number": "251276924",
  "pin": "0000",
  "verification_value": "369.63670206002695",
  "bank_card": {
    "id": "7b86fbf8-2e12-49f2-ae07-4e04315a0e6c",
    "number": "1680091720955179"
  }
}
```

### Client Login

`POST /api/client-login`

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
  "id": "4267ccb3-42bf-463c-afe1-0662fbd6d926",
  "name": "Boris Vasilev",
  "phone_number": "+1 (647) 890-2718",
  "email": "borisonekenobi@gmail.com",
  "client_id": "cf58a178-cee7-444a-b41f-bace931d3fae",
  "student_number": 251276924,
  "bank_card": {
    "id": "7b86fbf8-2e12-49f2-ae07-4e04315a0e6c",
    "type_id": "0d8dbd75-2ec9-400c-99ae-5e0ca9759701",
    "type": "Debit",
    "expiry_date": "2029-11-28T05:00:00.000Z",
    "number": "1680091720955179",
    "status": "active",
    "daily_limit": "$200.00"
  },
  "accounts": [
    {
      "id": "2fc78c8e-5063-4b66-b582-199c272edca3",
      "type_id": "03acb47d-94ef-41bb-9533-7606b2b81bdb",
      "type": "Chequing",
      "balance": "$0.00",
      "status": "active"
    }
  ]
}
```

### Find Client

`GET /api/client/:id`

#### Response

```json
{
  "id": "4267ccb3-42bf-463c-afe1-0662fbd6d926",
  "name": "Boris Vasilev",
  "phone_number": "+1 (647) 890-2718",
  "email": "borisonekenobi@gmail.com",
  "client_id": "cf58a178-cee7-444a-b41f-bace931d3fae",
  "student_number": 251276924,
  "bank_cards": [
    {
      "id": "7b86fbf8-2e12-49f2-ae07-4e04315a0e6c",
      "type_id": "0d8dbd75-2ec9-400c-99ae-5e0ca9759701",
      "type": "Debit",
      "expiry_date": "2029-11-28T05:00:00.000Z",
      "number": "1680091720955179",
      "status": "active",
      "daily_limit": "$200.00"
    }
  ],
  "accounts": [
    {
      "id": "2fc78c8e-5063-4b66-b582-199c272edca3",
      "type_id": "03acb47d-94ef-41bb-9533-7606b2b81bdb",
      "type": "Chequing",
      "balance": "$0.00",
      "status": "active"
    }
  ]
}
```

### Get All Clients

`GET /api/clients`

#### Response

```json
[
  {
    "id": "4267ccb3-42bf-463c-afe1-0662fbd6d926",
    "name": "Boris Vasilev",
    "phone_number": "+1 (647) 890-2718",
    "email": "borisonekenobi@gmail.com",
    "client_id": "cf58a178-cee7-444a-b41f-bace931d3fae",
    "student_number": 251276924,
    "bank_cards": [
      {
        "id": "7b86fbf8-2e12-49f2-ae07-4e04315a0e6c",
        "expiry_date": "2029-11-28T05:00:00.000Z",
        "number": "1680091720955179",
        "status": "active",
        "daily_limit": "$200.00",
        "type_id": "0d8dbd75-2ec9-400c-99ae-5e0ca9759701",
        "type": "Debit"
      }
    ],
    "accounts": [
      {
        "id": "2fc78c8e-5063-4b66-b582-199c272edca3",
        "type_id": "03acb47d-94ef-41bb-9533-7606b2b81bdb",
        "type": "Chequing",
        "balance": "$0.00",
        "status": "active",
        "bank_card_id": "7b86fbf8-2e12-49f2-ae07-4e04315a0e6c"
      }
    ]
  }
]
```