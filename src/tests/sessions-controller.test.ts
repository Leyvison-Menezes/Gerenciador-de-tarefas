import request from "supertest";
import { app } from "@/app";

describe("SessionsController", ()=>{
    let user_id: string

    it("Should authenticate and get acess token", async ()=>{
        const userResponse = await request(app).post("/users").send({
            name: "test user",
            email: "testuser@gmail.com",
            password: "12345678"
        })
        user_id = userResponse.body.id

        const sessionResponse = await request(app).post("/sessions").send({
            email: "testuser@gmail.com",
            password: "12345678"
        })

        expect(sessionResponse.status).toBe(200)
        expect(sessionResponse.body.token)
    })
})