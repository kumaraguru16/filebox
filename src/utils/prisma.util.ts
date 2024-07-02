import { PrismaClient } from "@prisma/client";
import { prismaTransactional } from "@transactional/prisma";
import { getDatabaseURL } from "./db.util";

export let prisma: any;
export const prismaInitialize = async () => {
  const isOffline = process.env.IS_OFFLINE;
  let dbUrl = process.env.DATABASE_URL;
  if (!isOffline) dbUrl = await getDatabaseURL();
  if (!dbUrl) throw new Error("Unable to locate db details.");
  prisma = new PrismaClient({
    log: ["query"],
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  }).$extends(prismaTransactional);
};
