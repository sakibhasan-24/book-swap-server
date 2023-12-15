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

- if user exist then create token and sent it client

* if not exist then create a user and sent it client
* but we need to create a password for user as it is required in model and we need an unique username and photo

# user update api

- create an update api
- verify token
  - if token is not verified then return an error
  - if token is verified but any error return error
    - if no error then decoded id it to user.body

* update user
  - if params id and user id don't match then return an error
    - if user try to update password then hash it
    - update it without password

# user delete api

- check valid user
- delete it cookies
- delete it from database
