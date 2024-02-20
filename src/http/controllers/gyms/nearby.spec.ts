import request from "supertest";

import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nearby Gyms (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "JavaScript Gym",
        description: "Some description",
        phone: "1111111111",
        latitude: -6.5328613,
        longitude: -38.0547706,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "TypeScript Gym",
        description: "Some description",
        phone: "1111111111",
        latitude: -6.7677404,
        longitude: -38.2280613,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: -6.5328613,
        longitude: -38.0547706,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: "JavaScript Gym",
      }),
    ]);
  });
});
