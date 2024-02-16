import { usersRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { resourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseRequest {
    userId: string
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private usersRepository: usersRepository) {}

    async execute({ userId }: GetUserProfileUseCaseRequest):
    Promise<GetUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findById(userId)

        if (!user) {
            throw new resourceNotFoundError()
        }

        return {
            user,
        }
    }
}