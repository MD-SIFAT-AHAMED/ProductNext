import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    // Connect to database and fetch featured products only
    const collection = await dbConnect("MobileData");
    const featuredProducts = await collection
      .find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .toArray();

    return NextResponse.json(
      {
        success: true,
        products: featuredProducts,
        count: featuredProducts.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured products. Please try again later." },
      { status: 500 }
    );
  }
}
