import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';


export const prismaMock = mockDeep<PrismaClient>();

export type PrismaMockType = DeepMockProxy<PrismaClient>;

export default prismaMock;
