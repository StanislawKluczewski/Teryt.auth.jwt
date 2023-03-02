# Teryt.auth.jwt

Teryt.auth.jwt is a microservice that is related to Teryt web application in way of authentication and authorization. 

## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@StanislawKluczewski](https://github.com/StanislawKluczewski)


## Technological description

Used Technologies:
MongoDB, ExpressJs, NodeJs

Node version: 16.15.1

ExpressJs version: 4.18.2

MongoDB version: 5.0.9


### User 
Authentication is made by jsonwebtoken and bcryptjs.

##### Sign up
```http
  POST /users/register
```

##### Login
```http
  POST /users/login
```

##### Logout
```http
  POST /users/logout
```