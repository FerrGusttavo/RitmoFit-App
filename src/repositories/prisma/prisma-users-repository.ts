import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { usersRepository } from '../users-repository';

export class PrismaUsersRepository implements usersRepository {
  async findByEmail(email: string): Promise<{ id: string; name: string; email: string; password_hash: string; created_at: Date; } | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    });

    return user;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}