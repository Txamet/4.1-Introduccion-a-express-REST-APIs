import { PrismaClient } from "@prisma/client";
import {mockDeep,DeepMockProxy, MockProxy} from 'jest-mock-extended'

export const prismaMock: any = mockDeep<PrismaClient>();
export default prismaMock;