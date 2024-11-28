# REST API Documentation

## Table of Contents

- [Client API](#client-api)
  - [Create Client](#create-client)
  - [Login](#client-login)

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
  "id": "c39a21ee-b5be-4ee7-850a-48b19ac84beb",
  "name": "Boris Vasilev",
  "phone_number": "+1 (647) 890-2718",
  "email": "borisonekenobi@gmail.com",
  "client_id": "c223e525-df09-4040-8925-9411d73c4156",
  "student_number": "251276924",
  "bank_card": {
    "id": "06906a81-c85d-4497-825d-6c9394445b25",
    "expiry_date": "2029-11-28",
    "card_number": "3378776579328348",
    "status": "active",
    "daily_limit": "$200.00"
  },
  "accounts": [
    {
      "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
      "bank_card_id": "06906a81-c85d-4497-825d-6c9394445b25",
      "type_id": "03acb47d-94ef-41bb-9533-7606b2b81bdb",
      "type": "Chequing",
      "balance": "$0.00",
      "status": "active",
      "branch_id": "7b443372-a30a-4ae1-a401-727c075b3d15"
    }
  ]
}
```