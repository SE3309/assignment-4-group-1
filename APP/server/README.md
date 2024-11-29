# REST API Documentation

## Table of Contents

- [Client API](#client-api)
  - [Create Client](#create-client)
  - [Login](#client-login)
  - [Find Client](#find-client)
  - [Get All Clients](#get-all-clients)
  - [Update Client](#update-client)
  - [Delete Client](#delete-client)
- [Staff API](#staff-api)
  - [Create Staff](#create-staff)
  - [Login](#staff-login)

## Client API

### Create Client

`POST /api/client`

Creates a new client with the given address, user, and student number. The response will include the client's ID,
student number, user ID, name, phone number, email, date of birth, address ID, street number, street name, city,
province, postal code, country, and bank card ID, number, pin, and verification value. The bank card will have a default
daily limit of $200.00.

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

Logs in the client with the given card number and password. The response will include the client's ID, student number,
user ID, name, phone number, email, address ID, street number, street name, city, province, postal code, country, bank
card ID, bank card type ID, bank card type, bank card expiry date, bank card number, bank card status, bank card daily
limit, and account ID, account type ID, account type, account balance, account status, and account bank card ID.

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

Gets the client with the given ID. The response will include the client's ID, name, phone number, email, client ID,
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

Gets all clients. The response will include the client's ID, name, phone number, email, client ID, student number, bank
cards, and accounts.

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

## Staff API

### Create Staff

`POST /api/staff`

Creates a new staff member with the given staff role, branch, user, and address. The response will include the staff
member's ID, staff role ID, branch ID, user ID, name, phone number, email, date of birth, address ID, street number,
street name, city, province, and postal code.

#### Request

```json
{
  "staff_role_id": "cae1f4b3-42e7-44c8-bcc1-8c0ad1bb8a71",
  "branch_id": "7b443372-a30a-4ae1-a401-727c075b3d15",
  "user": {
    "name": "Rebecca Hellberg Nilsson",
    "phone_number": "+1 (416) 522-7436",
    "email": "rebeccahnilsson@gmail.com",
    "date_of_birth": "2005-08-03",
    "password": "2468"
  },
  "address": {
    "street_number": "1118",
    "street_name": "Beechnut Road",
    "city": "Oakville",
    "province": "Ontario",
    "postal_code": "L6M1W8"
  }
}
```

#### Response

```json
{
  "id": "6779751b-1c2e-47e8-ad94-615310195dd0",
  "staff_role_id": "cae1f4b3-42e7-44c8-bcc1-8c0ad1bb8a71",
  "branch_id": "7b443372-a30a-4ae1-a401-727c075b3d15",
  "user": {
    "id": "7b4d0275-55af-430e-b73e-cd723c3ef35e",
    "name": "Rebecca Hellberg Nilsson",
    "phone_number": "+1 (416) 522-7436",
    "email": "rebeccahnilsson@gmail.com",
    "date_of_birth": "2005-08-03"
  },
  "address": {
    "id": "1f02eb56-afb6-4f78-97c5-3c3ce4b676aa",
    "street_number": "1118",
    "street_name": "Beechnut Road",
    "city": "Oakville",
    "province": "Ontario",
    "postal_code": "L6M1W8"
  }
}
```

### Staff Login

`POST /api/staff-login`

Logs in the staff member with the given email and password. The response will include the staff member's ID, name, phone
number, email, employee ID, and address. The response will also include the staff member's role.

#### Request

```json
{
  "email": "rebeccahnilsson@gmail.com",
  "password": "2468"
}
```

#### Response

```json
{
  "id": "6779751b-1c2e-47e8-ad94-615310195dd0",
  "branch_id": "7b443372-a30a-4ae1-a401-727c075b3d15",
  "role": "Loan Officer",
  "user": {
    "id": "7b4d0275-55af-430e-b73e-cd723c3ef35e",
    "name": "Rebecca Hellberg Nilsson",
    "phone_number": "+1 (416) 522-7436",
    "email": "rebeccahnilsson@gmail.com"
  },
  "address": {
    "id": "1f02eb56-afb6-4f78-97c5-3c3ce4b676aa",
    "street_number": 1118,
    "street_name": "Beechnut Road",
    "city": "Oakville",
    "province": "Ontario",
    "postal_code": "L6M1W8",
    "country": "Canada"
  }
}
```