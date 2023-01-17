const app = require("../app/app");
const request = require("supertest");
const data = require("../db/data/test-data/index");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
require("jest-sorted");

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
    describe.only("GET/api/reviews", () => {
	    test("200 status code: request has been succeeded", () => {
		    return request(app)
		    .get("/api/reviews")
		    .expect(200)
		    })
        test("200 status code: should resolve with an array of objects", () => {
            return request(app)
            .get("/api/reviews")
            .expect(200)
            .then((result) => {
                const reviews = result.body
                expect(reviews).toBeInstanceOf(Array)
            })
        })
        test("200 status code: confirmation that the array includes objects", () => {
            return request(app)
            .get("/api/reviews")
            .expect(200)
            .then((result) => {
                const reviews = result.body
                expect(reviews).toEqual(expect.arrayContaining([expect.objectContaining({})]))
            })
        })
        test("200 status code: arry returned shoud have the coreect length", () => {
            return request(app)
            .get("/api/reviews")
            .expect(200)
            .then((result) => {
                const allReviews = result.body
                expect(allReviews).toHaveLength(13)
            })
        })
        test("200 status code: array of objects created with correct keys", () => {
            return request(app)
            .get("/api/reviews")
            .expect(200)
            .then((result) => {
                const reviewsResult = result.body
                reviewsResult.forEach((review) => {
                    expect(review).toEqual(expect.objectContaining({
                        owner: expect.any(String),
                        title: expect.any(String),
                        designer: expect.any(String),
                        review_id: expect.any(Number),
                        category: expect.any(String),
                        review_img_url: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        comment_count: expect.any(String)
                    }));
                })
            })
        })
        test("200 status code: reviews are sorted by date in descending order", () => {
            return request(app)
            .get("/api/reviews")
            .expect(200)
            .then((result) => {
                const reviewsResult = result.body
                expect(reviewsResult).toBeSortedBy("created_at", {descending: true})
            })
        })
        test("404 status code: path was not found", () => {
            return request(app)
            .get("/wrong-path")
            .expect(404)
            .then((result) => {
                const response = result.body
                expect(response.msg).toBe("Path not found")
            })
        })
        })
    describe("GET/api/reviews/:review_id", () => {
        test("200 status code: request has been succeeded", () => {
            return request(app)
            .get("/api/reviews/3")
            .expect(200)
        })
        test("200 status code: responds with an object", () => {
            return request(app)
            .get("/api/reviews/2")
            .expect(200)
            .then((result) => {
                reviewObj = result.body
                expect(reviewObj).toBeInstanceOf(Object)
            })
        })
        test("200 status code: object should have the correct number of key-value pairs", () => {
            return request(app)
            .get("/api/reviews/2")
            .expect(200)
            .then((result) => {
                reviewObj = result.body
                console.log(reviewObj)
                expect(Object.keys(reviewObj)).toHaveLength(9)
            })
        })        
        test("200 status code: resolves with a single review object with the correct keys", () => {
            return request(app)
            .get("/api/reviews/1")
            .expect(200)
            .then((result) => {
                reviewObj = result.body
                expect(reviewObj).toEqual({
                    review_id: 1,
                    title: 'Agricola',
                    designer: 'Uwe Rosenberg',
                    owner: 'mallionaire',
                    review_img_url:
                      'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700',
                    review_body: 'Farmyard fun!',
                    category: 'euro game',
                    created_at: '2021-01-18T10:00:20.514Z',
                    votes: 1
                  })
            })
            })
        test("404 status code: responds with 'review not found' if given a non-existant review_id", () => {
            return request(app)
            .get("/api/reviews/545")
            .expect(404)
            .then((result) => {
                response = result.body
                expect(response.msg).toBe("Review not found")
                expect(result.status).toBe(404)
            })
        })
        })
    });


    