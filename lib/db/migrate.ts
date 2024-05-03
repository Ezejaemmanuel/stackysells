import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const runMigrate = async () => {
  // if (!process.env.DATABASE_URL) {
  //   console.log("this is the database url", process.env.DATABASE_URL);
  //   throw new Error("DATABASE_URL is not defined");
  // }

  const connection = postgres(
    "postgres://postgres.xrgsqafudetuomzidldk:0ww1WeAQpyiDOQus@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=10",
    { max: 1 },
  );

  const db = drizzle(connection);

  console.log("⏳ Running migrations...");

  const start = Date.now();

  await migrate(db, { migrationsFolder: "lib/db/migrations" });

  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
