const request = require("supertest");

const app = require("../../server");

describe("POST /auth/login", () => {
  it("should return unauth error", async () => {
    const testData = {
      email: "example@example.com",
      password: "qwe@E1234",
    };

    const res = await request(app).post("/api/auth/users/login").send(testData);

    expect(res.statusCode).toBe(401);
  });

  it("should return status code 200", async () => {
    const testData = {
      email: "example@example.com",
      password: "Example1@example",
    };

    const res = await request(app).post("/api/auth/users/login").send(testData);

    expect(res.statusCode).toBe(200);
  });

  it("should return token and user", async () => {
    const testData = {
      email: "example@example.com",
      password: "Example1@example",
    };

    const res = await request(app).post("/api/auth/users/login").send(testData);

    expect(res.body).toEqual({
      token: expect.any(String),
      user: {
        email: "example@example.com",
        subscription: "business",
      },
    });
  });
});
