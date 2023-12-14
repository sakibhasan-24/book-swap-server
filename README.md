# server

## install

- mongoose
- express
- cors
- env

### user model

- user name require
- email require
- password require
- type must String

### user routes

# sign up api

- create a sign up api
- api will accept a json object with user name, email, password
- save in database

# log in api

- if not valid user then return an message(custom function)

* if password not match then return an message(custom function)
* if found valid user create a token and return it COOKIE
* from server though it is hashed no need to send password in server
* send token using cookie

# google api
