## Description

This is a basic subscription engine which creates orders for the users that are subscribed and assigns the order for the user's selected address.

## Models

<p align="center">
  <img src="https://github.com/Sardter/beije_backend/blob/master/models.png?raw=true" alt="Models" />
</p>

The service is comprised of 6 models:
  - User
  - Subsription
  - Order
  - Address
  - Country
  - State

# User

The `User` model represents a user in the system.

Fields

 - `id`: `Int` - The unique identifier of the user. This field is marked with the @id attribute, which designates it as the primary key of the model. The `@default(autoincrement())` attribute specifies that this field should be automatically incremented by the database system.
 - `email`: `String` - The email address of the user. This field is marked with the `@unique` attribute, which ensures that no two users can have the same email address.
 - `username`: `String` - The username of the user. This field is marked with the @unique attribute, which ensures that no two users can have the same username.
 - `firstName`: `String` (optional) - The first name of the user.
 - `lastName`: `String` (optional) - The last name of the user.
 - `isActive`: `Boolean` - A boolean value indicating whether the user is active. This field is marked with the `@default(true)` attribute, which sets its default value to true.
 - `isStaff`: `Boolean` - A boolean value indicating whether the user is a staff member. This field is marked with the `@default(false)` attribute, which sets its default value to false.

Relations

 - `addresses`: `Address[]` - A one-to-many relation between User and Address models. This field specifies that a user can have many addresses. Only one address can (should) be selected at a time.
 - `orders`: `Order[]` - A one-to-many relation between User and Order models. This field specifies that a user can have many
 - `subscriptions`: `Subscription[]` - A many-to-many relationship between User and Subscription models. A user can be subscribed to multiple subscription while that subscription can have multiple users subscribed to it.

Notes
 - Attribute `isStaff` should be marked true for operations such as creating a country, state, or any other operation that a user should be protected from. However, an authentication system has not been implemented yet, due this, a user is able to perform operation availible.

# Subscription 

Fields
 - `date (DateTime, optional)`: The date on which the subscription will create the orders.
 - `users (User[])`: The list of users who have subscribed to this subscription.

# Order

Fields

 - `user (User, required)`: The user who placed the order.
    The @onDelete(Cascade) attribute specifies that if the user is deleted, all orders associated with that user should also be deleted.
 - `address (Address, required)`: The address to which the order should be shipped.
    This field is a relation to the Address model, represented by an Address object.
    The relation is established by the @relation attribute on the address field.
    The @onDelete(Cascade) attribute specifies that if the address is deleted, all orders associated with that address should also be deleted.

 - `cost (Float, optional)`: The total cost of the order.
    The @default(100) attribute specifies that the default value for this field is 100.
 - `currency (String, optional)`: The currency used for the cost of the order.
    The @default("TL") attribute specifies that the default value for this field is "TL".
 - `date (DateTime, optional)`: The date on which the order was placed.
    The @default(now()) attribute specifies that the default value for this field is the current date and time.

# Address

Fields

 - `selected (Boolean, optional)`: A boolean indicating whether this is the user's selected address.
    The @default(true) attribute specifies that the default value for this field is true.
 - `country (Country, required)`: The country associated with the address.
    The @onDelete(Cascade) attribute specifies that if the country is deleted, all addresses associated with that country should also be deleted.
 - `state (State, required)`: The state associated with the address.
    The @onDelete(Cascade) attribute specifies that if the state is deleted, all addresses associated with that state should also be deleted.
 - `city (String, optional)`: The city associated with the address.
 - `phone (String, optional)`: The phone number associated with the address.
 - `user (User, required)`: The user associated with the address.
    The @onDelete(Cascade) attribute specifies that if the user is deleted, all addresses associated with that user should also be deleted.
 - `orders (Order[])`: The list of orders associated with the address.

# Country and State

These models exist for convinince of querying. They make it easy to query performantly for addresses that are associeted with a certian country and state.

## Order Creation

Order creation is done automatically as a cron job. The service is configured to check the date of subscriptions every minute, and create the orders if the subscription date is due. After the orders are created, dates of the subscriptions are incrmeanted according to configuration set in the enviroment file.

## Filtering

The api allows queries to be made with certain filtering:
  - Addresses, Orders, and Subscriptions of an user can be accesed from the users endpoint.
  - Users of a subscription can be accessed from subscriptions endpoint.
  - Orders of an address can be accessed from addresses endpoint.
  - Addresses and States of a country can be accessed from the counties endpoint.
  - Addresses of a state can be accessed from the states endpoint.

For a demonstraion, visit the `/api` endpoint from the browser. 

## Stripe Integration

Orders call the stripe service to request a payment for the order. Stripe api key must be set in the environment file. However, the integration is not complete and is not tested. This is more of a placeholder.

## Docs

The api endpoints are avalible through the endpoint `/api` by default. Here, a Swagger UI is preseented that displays the features of the service.

## Authentication

The authenticaion system is not implemented yet, however a JWT based autheitication will be best suited for the service.

## Mock Data Generation

The `/generate_data` end point is avalible to generate mock data and observe how the service functions.

## Installation

A postgres server is necessay for this service. You can configure the url for the service from the enviornment file.

The service uses Typescript, NestJS, Prisma, and Stripe.

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Make sure that you have applied the necessary database migrations by running:

```bash
npx prisma migrate dev --name init
```
