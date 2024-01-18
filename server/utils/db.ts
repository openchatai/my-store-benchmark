import { PrismaClient } from "@prisma/client";
let dbInstance = new PrismaClient();

export function useDb() {
    if (!dbInstance) {
        dbInstance = new PrismaClient();
    }
    return dbInstance;
}
