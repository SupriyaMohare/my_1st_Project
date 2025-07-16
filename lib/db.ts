import { PrismaClient } from "@prisma/client";

declare global{
    var prisma: PrismaClient |undefined;
};

export const db = globalThis.prisma || new PrismaClient();
//every time we load prisma.same data generated continuosly. so to avoid that we use gloabalThis.


if(process.env.NODE_ENV !== "production") globalThis.prisma = db;