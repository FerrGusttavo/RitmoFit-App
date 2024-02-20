import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      name: "Near Gym",
      description: null,
      phone: null,
      latitude: -6.5328613,
      longitude: -38.0547706,
    });

    await gymsRepository.create({
      name: "Far Gym",
      description: null,
      phone: null,
      latitude: -6.7677404,
      longitude: -38.2280613,
    });

    const { gyms } = await sut.execute({
      userLatitude: -6.5328613,
      userLongitude: -38.0547706,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: "Near Gym" })]);
  });
});
