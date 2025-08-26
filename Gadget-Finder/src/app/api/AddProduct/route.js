import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";

export async function POST(request) {
  try {
    // Parse the request body
    const productData = await request.json();

    // Validate required fields
    if (!productData.name || !productData.price || !productData.sku) {
      return NextResponse.json(
        { error: "Missing required fields: name, price, and sku are required" },
        { status: 400 }
      );
    }

    // Connect to database and insert product
    const collection = await dbConnect("MobileData");
    const result = await collection.insertOne({
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (result.insertedId) {
      return NextResponse.json(
        {
          success: true,
          message: "Electronic product added successfully!",
          productId: result.insertedId,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to insert product into database" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
