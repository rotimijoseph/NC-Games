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
    describe("GET/api/reviews", () => {
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
        test("404 status code: responds with 'Non-existant review_id' if given a non-existant review_id", () => {
            return request(app)
            .get("/api/reviews/545")
            .expect(404)
            .then((result) => {
                response = result.body
                expect(response.msg).toBe("Non-existant review_id")
                expect(result.status).toBe(404)
            })
        })
        })
    describe("GET/api/reviews/:review_id/comments", () => {
        test("200 status code: request has been succeeded", () => {
            return request(app)
            .get("/api/reviews/2/comments")
            .expect(200)
        })
        test("200 status code: should resolve with an array of objects for the given review_id", () => {
            return request(app)
            .get("/api/reviews/2/comments")
            .expect(200)
            .then((result) => {
                const response = result.body
                expect(response).toEqual(expect.arrayContaining([expect.objectContaining({})]))
            })
        })
        test("200 status code: the array of comment objects should have the correct length", () => {
            return request(app)
            .get("/api/reviews/2/comments")
            .expect(200)
            .then((result) => {
                const response = result.body
                expect(response).toHaveLength(3)
            })
        })
        test("200 status code: the array of comment objects should have the correct properties", () => {
            return request(app)
            .get("/api/reviews/2/comments")
            .expect(200)
            .then((result) => {
                const reviewComments = result.body
                reviewComments.forEach((review) => {
                    expect(review).toEqual(expect.objectContaining({
                        comment_id: expect.any(Number),
                        author: expect.any(String),
                        votes: expect.any(Number),
                        body: expect.any(String),
                        review_id: expect.any(Number),
                        created_at: expect.any(String)
                    }))
                })
            })
        })
        test("200 status code: the comments should be in order of most recent to least", () => {
            return request(app)
            .get("/api/reviews/2/comments")
            .expect(200)
            .then((result) => {
                const reviewComments = result.body
                expect(reviewComments).toBeSortedBy("created_at", {ascending: true})
            })
        })
        test("200 status code: resolves with an empty array if the review_id exists but no comments are present", () => {
            return request(app)
            .get("/api/reviews/5/comments")
            .expect(200)
            .then((result) => {
                const reviewWithoutComment = result.body
                expect(reviewWithoutComment).toEqual([])
            })
        })
        test("404 status code: responds with 'Non-existant review_id' when given a non-existent review_id", () => {
            return request(app)
            .get("/api/reviews/6019/comments")
            .expect(404)
            .then((result) => {
                expect(response.msg).toBe("Non-existant review_id")
                expect(result.status).toBe(404) 
            })
        })
    })
    describe("POST/api/reviews/:review_id/comments", () => {
        test("201 status code: request has been successed and a new resource has been created", () =>{
            return request(app)
            .post("/api/reviews/2/comments")
            .send({ username: "bainesface", body: "This is amazing!" })
            .expect(201)
        })
        test("201 status code: should resolve with an array containing the comment object", () => {
            return request(app)
            .post("/api/reviews/2/comments")
            .send({ username: "bainesface", body: "This is amazing!" })
            .expect(201)
            .then((result) => {
                newResponse = result.body
                expect(newResponse).toEqual(expect.arrayContaining([expect.objectContaining({})]))
            })
        })
        test("201 status code: object recieved has the correct key-value pairs", () => {
            return request(app)
            .post("/api/reviews/2/comments")
            .send({ username: "bainesface", body: "This is amazing!" })
            .expect(201)
            .then((result) => {
                const newComment = result.body 
                expect(newComment).toEqual(expect.arrayContaining([expect.objectContaining({
                    comment_id: expect.any(Number),
                    author: expect.any(String),
                    body: expect.any(String),
                    review_id: expect.any(Number),
                    created_at: expect.any(String),
                    votes: expect.any(Number) })]))
            })
        })
    });
    describe("PATCH/api/reviews/:review_id", () => {
        test("200 status code: request has been successed", () => {
            return request(app)
            .patch("/api/reviews/3")
            .send({ inc_votes: 4 })
            .expect(200)
        })
        test("200 status code: review object has been successfully updated and contains the correct key-value pairs", () => {
            return request(app)
            .patch("/api/reviews/3")
            .send({ inc_votes: 4 })
            .expect(200)
            .then((result) => {
                const updatedObj = result.body
                expect(updatedObj).toEqual(expect.objectContaining({
                    title: expect.any(String),
                    designer: expect.any(String),
                    owner: expect.any(String),
                    review_img_url:
                    expect.any(String),
                    review_body: expect.any(String),
                    category: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    review_id: expect.any(Number)
                }))
            })
        })
        test("200 status code: the vote property has been updated by the right number", () => {
            return request(app)
            .patch("/api/reviews/3")
            .send({ inc_votes: 4 })
            .expect(200)
            .then((result) => {
                const updatedObj = result.body 
                expect(updatedObj).toEqual({
                    review_id: 3,
                    title: 'Ultimate Werewolf',
                    designer: 'Akihisa Okui',
                    owner: 'bainesface',
                    review_img_url:
                    'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?w=700&h=700',
                    review_body: "We couldn't find the werewolf!",
                    category: 'social deduction',
                    created_at: '2021-01-18T10:01:41.251Z',
                    votes: 9
                })
            })
        })
        test("404 status code: review_id not found", () => {
            return request(app)
            .patch("/api/reviews/30928")
            .send({ inc_votes: 4 })
            .expect(404)
            .then((result) => {
                const response = result.body
                expect(response.msg).toBe("Non-existant review_id")
                expect(result.status).toBe(404) 
            })
        })
    })
    describe("GET/api/users", () => {
        test("200 status code: request has been succeeded", () => {
            return request(app)
            .get("/api/users")
            .expect(200)
        })
        test("200 status code: should resolve with an array of objects", () => {
            return request(app)
            .get("/api/users")
            .expect(200)
            .then((result) => {
                const arrayOfObj = result.body
                expect(arrayOfObj).toEqual(expect.arrayContaining([expect.objectContaining({})]))
            })
        })
        test("200 status code: array of objects created with correct keys", () => {
            return request(app)
            .get("/api/users")
            .expect(200)
            .then((result) => {
                const reviews = result.body
                reviews.forEach((review) => {
                    expect(review).toEqual(expect.objectContaining({
                        username: expect.any(String),
                        name: expect.any(String),
                        avatar_url: expect.any(String)
                    }))
                })
            })
        })
        test("200 status code: should have the correct length", () => {
            return request(app)
            .get("/api/users")
            .expect(200)
            .then((result) => {
                const allUsers = result.body
                expect(allUsers).toHaveLength(4)
            })
        })
        test("404 status code: path was not found", () => {
            return request(app)
            .get("/not-a-path")
            .expect(404)
            .then((result) => {
                const response = result.body
                expect(result.status).toBe(404)
                expect(response.msg).toBe("Path not found")
            })
        })
    })
    describe("GET/api/reviews/query", () => {
        test("200 status code: request has been succeeded", () => {
            return request(app)
            .get("/api/reviews?category")
            .expect(200)
        })
    })
    
})
