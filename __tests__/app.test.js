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
        test("200 status code: array returned should have the correct length", () => {
            return request(app)
            .get("/api/categories")
            .expect(200)
            .then((result) => {
                const categoriesResult = result.body
                expect(categoriesResult).toHaveLength(4)
            })
        })
        })
    });
