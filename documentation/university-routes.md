# API - University Routes

Routes for universities.

## Create One

To create one record.

-   **URL**

```
/universities/new
```

-   **Method**

```
POST
```

-   **Body**

```json
{
    "uniname": "Chandigarh University",
    "registration_date": "2020-10-10",
    "expiry_date": "2030-10-10",
    "imgurl": "www.cuchd.in/resources/abc.png",
    "no_of_students": 13000,
    "email": "contact@cumain.in",
    "weburl": "www.cuchd.in",
    "contact_no": "9089786756"
}
```

-   **Expected Responses**
    -   Success
        -   Code: `200`
        -   Body: `{"success":{"message":"Addition Successful","payload":[int]}}`
    -   Unauthorized
        -   Code: `401`
        -   Body: `{"error":{"message":"Not Logged In"}}`

## Read All

To read all records.

-   **URL**

```
/universities
```

-   **Method**

```
GET
```

-   **Expected Responses**
    -   Success
        -   Code: `200`
        -   Body: `{"result":{"message":"Addition Successful","id":[int]}}`
    -   Unauthorized
        -   Code: `401`
        -   Body: `{"error":{"message":"not logged in"}}`

## Update One

To update one record.

-   **URL**

```
/universities/update/:id
```

-   **Method**

```
PUT
```

-   **Body**

```json
{
    "uniname": "Chandigarh University",
    "registration_date": "2020-10-10",
    "expiry_date": "2030-10-10",
    "imgurl": "www.cuchd.in/resources/abc.png",
    "no_of_students": 13000,
    "email": "contact@cumain.in",
    "weburl": "www.cuchd.in",
    "contact_no": "9089786756"
}
```

-   **Expected Responses**
    -   Success
        -   Code: `200`
        -   Body: `{"success":{"message":"Updation Successful"}}`
    -   Failure
        -   Code: `404`
        -   Body: `{"result":{"message":"No Entry Found"}}`
    -   Unauthorized
        -   Code: `401`
        -   Body: `{"error":{"message":"Not Logged In"}}`

## Delete One

To delete one record.

-   **URL**

```
/universities/delete/:id
```

-   **Method**

```
DELETE
```

-   **Expected Responses**
    -   Success
        -   Code: `200`
        -   Body: `{"success":{"message":"Deletion Successful"}}`
    -   Failure
        -   Code: `404`
        -   Body: `{"error":{"message":"No Entry Found"}}`
    -   Unauthorized
        -   Code: `401`
        -   Body: `{"error":{"message":"Not Logged In"}}`
