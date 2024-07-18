// to run jest in terminal: NODE_OPTIONS=--experimental-vm-modules npx jest
// or: node --experimental-vm-modules node_modules/jest/bin/jest.js
import supertest from 'supertest' // add 'type': "module" to package.json
// import app from './app.js'
import makeApp from './app.js'
// import { describe } from 'yargs'
import { jest } from '@jest/globals'  // describe, beforeEach, test, expect are already in globals
// import { beforeEach } from 'node:test' // this is not the right way to do it

const createUser = jest.fn()
const getUser = jest.fn()

const request = supertest
const app = makeApp({
  createUser,
  getUser,
})

describe('POST /users', () => {
  beforeEach(() => {
    createUser.mockReset();
  })
  
  describe("given a username and password", () => {
    // should save the username and password to database
    test("should save the username and password to database", async () => {
      const bodyData = [
        {username: "username1", password: "password1"},
        {username: "username2", password: "password2"},
        {username: "username3", password: "password3"},
      ]
      
      for (const body of bodyData) {
        createUser.mockReset(); // reset the mock.calls.length to 0, makes each test independent from each other
        const response = await request(app).post("/users").send(body)
        expect(createUser.mock.calls.length).toBe(1)
        expect(createUser.mock.calls[0][0]).toBe(body.username)
        expect(createUser.mock.calls[0][1]).toBe(body.password)
      }
    })
    // should respond with a json object containing userId
    test("should respond with a json object containing userId", async () => {
      for (let i = 0; i < 10; i++) {
        createUser.mockResolvedValue(i)
        const response = await request(app).post("/users").send({
          username: "username",
          password: "password",
        })
        expect(response.body.userId).toBe(i)
      }
    })
    // should respond with a 200 status code
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/users").send({
        username: "username", 
        password: "password"
      })

      expect(response.statusCode).toBe(200)
    })
    // should specify json in the content type header
    test("should specify json in the content type header", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      })

      expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"))
    })
    
    test("should respond with a json object containing userId", async () => {
      createUser.mockResolvedValue(1)
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password",
      })

      expect(response.body.userId).toBeDefined()
    })
  })

  describe("when the username and password is missing", () => {
    test("missing username and password, should respond with a 400 status code", async () => {
      const bodyData = [
        {username: "username"},
        {password: "password"},
        {},
      ]
      // should respond with a 400 status code
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body) 
        expect(response.statusCode).toBe(400)
      }
    })

  })

})

