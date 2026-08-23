import { MongoClient, type Collection, type Db } from "mongodb";
import type { Deadline } from "@/lib/types";

type Doc = Omit<Deadline, "_id"> & { _id?: Deadline["_id"] };

declare global {
  // eslint-disable-next-line no-var
  var _mongo: Promise<MongoClient> | undefined;
}

function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  if (!global._mongo) {
    global._mongo = new MongoClient(uri).connect();
  }

  return global._mongo;
}

export async function getDb(): Promise<Db> {
  return (await getClient()).db();
}

export async function getDeadlines(): Promise<Collection<Doc>> {
  return (await getDb()).collection<Doc>("deadlines");
}
