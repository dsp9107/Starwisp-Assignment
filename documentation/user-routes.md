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

```
{
    "username": [string],
    "password": [hashed-password]
}
```

-   **Expected Responses**
    -   Success
        -   Code: `200`
        -   Body: `{"success":{"message":"Logged In","token":[token]}}`
        -   Cookies: `token`
    -   Failure
        -   Code: `404`
        -   Body: `{"error":{"message":"Incorrect Credentials"}}`

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
        -   Body: `{"success":{"message":"Logged Out"}}`
        -   Cookies: `token:null`
    -   Failure
        -   Code: `401`
        -   Body: `{"error":{"message":"Not Logged In"}}`
