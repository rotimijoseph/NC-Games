# Northcoders House of Games API

## Summary

This API allows users to view, create and update reviews, comments and users on various types of games. All available endpoints are available for users to view.

## Getting Started

If you wish to clone this project and run it locally, in order to successfully connect to the two databases you will need to add two .env files (.env.test, .env.development), one for the test data and another for the dev data.

Install all dependancies by running the command 'npm install'

## Minimum Versions

In order to use this API, the minimum version of Node.js required is v19.1.0, and v8.7.3 for Postgres

## Links

Here is a link to the hosted version:
https://dizzy-whizzy-nc-games.onrender.com/api/reviews

## Endpoints

Listed below are all the available endpoints:

GET /api/categories
GET /api/reviews
GET /api/reviews/:review_id
GET /api/reviews/:review_id/comments
GET /api/users
POST /api/reviews/:review_id/comments
PATCH /api/reviews/:review_id
