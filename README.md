# User Authentication Microservice

This API uses the Supabase Auth service, using an available user tables and methods from Supabase's user schema.

Full documentation for using this API Microservice can be found here:
https://supabase.com/docs/guides/auth


## API endpoints

API Endpoints are contained behind the provided methods and routes in the documentation. These are pre-set for use with Supabase tables, using the API key settings provided by the schema you plan to use. You do not need to modify them directly, these are instead accessed using the provided functions in the documentaiton above.

Below are details of each endpoint used:

### /auth/v1/signup
#### Method: POST
- Registers the user on supabase based on the form's information, and sends a confirmation email to the email address entered.
- Request example:
    ```
        {
            "email":"bob@testmail.com",
            "password":"12345678",
            "data":{"name":"Bob"}
        }
    ```
### /auth/v1/verify?token= 
#### Method: GET
- Verifies the registration of a user on supabase. The value for the token key is sent in the email verification link.
- Request example: No payload

### auth/v1/token?grant_type=password
#### Method: POST
- Logs in a user using an email and password combination.
- Request example:
    ```
    {
        "email":"bob@testmail.com",
        "password":"12345678"
    }
    ```

### /auth/v1/logout
#### Method: POST
- Logs out a logged in user.
- Request example:
    ```
        `{}`
    ```
### /auth/v1/recover
#### Method: POST
- Sends a password recovery email to the email address entered.
- Request example:
    ```
        {
          "email":"bob@testmail.com"
        }
    ```




