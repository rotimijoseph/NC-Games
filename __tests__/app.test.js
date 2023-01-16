const app = require("../app/app");
const request = require("supertest");
const data = require("../db/data/test-data/index");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");

beforeEach(() => {
    return seed(data);
  });
  
  afterAll(() => {
    db.end();
  });

/*
Responds with:

an array of category objects, each of which should have the following properties:
slug
description
As this is the first endpoint you will need to set up your testing suite.

Errors handled.
*/

// Test Cases 
// 200 status code: request has been succeeded 
// 200 status code: should resolve with an array of objects 
// 200 status code: array of objects created with correct keys 
// 404 status code: responds with error if path is incorrect?? 

describe("app", () => {
    describe("GET/api/categories", () => {
        test("200 status code: request has been succeeded", () => {
            return request(app)
            .get("/api/categories")
            .expect(200)
            })
        test("200 status code: should resolve with an array of objects", () => {
            return request(app)
            .get("/api/categories")
            .expect(200)
            .then((result) => {
                const categories = result.body
                expect(categories).toBeInstanceOf(Array)
            })
        })
        test("200 status code: array of objects created with correct keys", () => {
            return request(app)
            .get("/api/categories")
            .expect(200)
            .then((result) => {
                const categoriesResult = result.body
                categoriesResult.forEach((category) => {
                    expect(category).toHaveProperty('slug', expect.any(String)); 
                    expect(category).toHaveProperty('description', expect.any(String)); 
                })
            })
        })
        })
    });
