# API - User Routes

Routes for users.

## Login

To log user in. Sets token in cookie.

-   **URL**

```
/users/login
```

-   **Method**

```
POST
```

-   **Body**

```json
{
    "username": [string],
    "password": [hashed-password]
}
```

-   **Expected Responses**
    -   Success
        -   Code: `200`
        -   Body: `OK`
        -   Cookies: `token`
    -   Failure
        -   Code: `404`
        -   Body: `{"error": {"message": "incorrect credentials"}}`

## Logout

To log user out. Clears token cookie.

-   **URL**

```
/users/logout
```

-   **Method**

```
GET
```

-   **Expected Responses**
    -   Success
        -   Code: `200`
        -   Body: `OK`
        -   Cookies: `token:null`
    -   Failure
        -   Code: `401`
        -   Body: `{"error":{"message":"not logged in"}}`
