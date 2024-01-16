import { PrismaClient } from "@prisma/client";

export function useDb() {
    return new PrismaClient();
}
