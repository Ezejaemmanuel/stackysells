// app/api/generate-products/route.ts

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createRandomProducts } from "./fakeProductGenerator";
import { getUserAuth } from "@/lib/auth/utils";
import { users } from "@/lib/db/schema/all-schema";
import { eq } from "drizzle-orm";

interface Params {
  userId: string;
}

export async function GET(request: Request) {
  const { session } = await getUserAuth();

  if (!session) {
    return NextResponse.json(
      { error: "User ID is required." },
      { status: 400 },
    );
  }

  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    await createRandomProducts(user[0].id);

    return NextResponse.json({
      message: "Random products generated successfully.",
    });
  } catch (error) {
    console.error("Error generating random products:", error);
    return NextResponse.json(
      { error: "An error occurred while generating random products." },
      { status: 500 },
    );
  }
}
