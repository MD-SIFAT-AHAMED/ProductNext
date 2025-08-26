import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID format" },
        { status: 400 }
      );
    }

    // Connect to database and fetch specific product
    const collection = await dbConnect("MobileData");
    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Also fetch related products from the same category
    const relatedProducts = await collection
      .find({
        _id: { $ne: new ObjectId(id) },
        category: product.category,
      })
      .limit(4)
      .toArray();

    return NextResponse.json(
      {
        success: true,
        product: product,
        relatedProducts: relatedProducts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product. Please try again later." },
      { status: 500 }
    );
  }
}
