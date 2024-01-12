# authentication-be
A RESTful API for authentication using adonisJs that allows user to register, login, view profile and also allow admin to register, login and view users

1. Bodyparser
2. Authentication
    ## Both User and Admin (role is used)
	-    register,
	-    login,
	-    profile,
3. Admin endpoint (restricted by only admin)
    -    getUsers
4. CORS
5. Lucid ORM
6. Migrations and seeds
7. Translations

## Setup

Use the adonis command to install the blueprint

```bash
adonis new authentication-be --blueprint=olaobey/authentication-be
```
```

or manually clone the repo and then run `npm install`.

### Configs
- Setup database configs in `ROOT/.env`
- Setup Mail server config in `ROOT/.env`


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

# Authentication API Endpoints

## Endpoints with JSON response

| method   | endpoint | request   | response   | needs auth   |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| POST  | /api/v1/auth/register  | [firstname, lastname, email, password] | status, user data, message, success | no  |
| POST  | /api/vi/auth/login  | [email, password] | status, access_token, message, user data and success | no  |
| GET  | /api/v1/user/profile |  no |  status, data, message and success  | yes  |

# Admin Api Endpoint

## Endpoints with JSON response

| method   | endpoint | request   | response   | needs auth   |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| GET  | /api/v1/admin/user |  no |  status, data, message and success  | yes  |

# FEATURES/ AUTHENTICATION-BE

## Authentication Endpoints
- [x] Register
- [x] Login
- [x] Profile

## Admin Endpoint
- [x] GetUsers

