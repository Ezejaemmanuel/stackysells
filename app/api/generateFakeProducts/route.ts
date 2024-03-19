// app/api/generate-products/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createRandomProducts } from "./fakeProductGenerator";

interface Params {
  userId: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required." },
      { status: 400 },
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    await createRandomProducts(userId);

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
