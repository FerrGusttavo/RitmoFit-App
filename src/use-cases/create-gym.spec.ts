import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUserCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUserCase

describe('Create Gym Use Case', () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUserCase(gymsRepository)
    })
    
    it('should be able to create gym', async () => {

        const { gym } = await sut.execute({
            name: 'JavaScript Gym',
            description: null,
            phone: null,
            latitude: -83.9968,
            longitude: 156.2996,
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})