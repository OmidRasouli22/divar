# Divar Clone

A small version of [Divar](https://divar.ir), a popular classifieds site
in Iran. Users log in with their phone number and post ads with photos
and a location on the map.

Built with Node.js, Express and MongoDB, with server-side pages in EJS.

## What it has

- **Login with a one-time code:** the user enters a mobile number, gets
  a code, and receives a JWT in a cookie
- **Categories in a tree:** each category can have a parent and children
- **Options per category:** each category defines its own fields, like
  number of rooms for flats. Options have a type (number, text, list,
  yes/no) and can be required.
- **Posts:** create an ad with photos (Multer) and a map location. The
  address is looked up from the coordinates with the Map.ir API.
- **Panel:** a simple dashboard to create posts
- **API docs:** Swagger UI at `/swagger-ui`

The code is split by module (`auth`, `user`, `category`, `option`,
`post`), each with its own routes, controller, service and model.

## Running it

You need Node.js and MongoDB.

```
npm install
cp .env.example .env
npm run start:dev
```

Add `JWT_SECRET_KEY`, `COOKIE_PARSER_SECRET_KEY` and `MAP_API_KEY` to
`.env`. The site runs on `http://localhost:3000`.

## Stack

Node.js, Express, MongoDB, Mongoose, EJS, JWT, Multer, Swagger.
