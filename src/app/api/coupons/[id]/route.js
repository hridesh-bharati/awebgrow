// src/app/api/coupons/[id]/route.js
import { NextResponse } from "next/server";
import { adminDatabase } from "@/lib/firebase-admin";

export async function DELETE(request, { params }) {
  try {
    if (!adminDatabase) {
      return NextResponse.json({ 
        success: false, 
        error: "Firebase Admin not initialized" 
      }, { status: 503 });
    }
    
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: "Coupon ID is required" 
      }, { status: 400 });
    }

    // Check if coupon exists
    const snapshot = await adminDatabase.ref(`coupons/${id}`).once("value");
    if (!snapshot.exists()) {
      return NextResponse.json({ 
        success: false, 
        error: "Coupon not found" 
      }, { status: 404 });
    }

    // Delete the coupon
    await adminDatabase.ref(`coupons/${id}`).remove();

    return NextResponse.json({ 
      success: true, 
      message: `Coupon ${id} deleted successfully` 
    });
  } catch (error) {
    console.error("DELETE /api/coupons/[id] error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
// OPTIONAL: GET single coupon (if needed)
export async function GET(request, { params }) {
  try {
    if (!adminDatabase) throw new Error("Database not initialized");
    
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({ success: false, error: "Coupon ID is required" }, { status: 400 });
    }

    const snapshot = await adminDatabase.ref(`coupons/${id}`).once("value");
    if (!snapshot.exists()) {
      return NextResponse.json({ success: false, error: "Coupon not found" }, { status: 404 });
    }

    const coupon = { id, ...snapshot.val() };
    return NextResponse.json({ success: true, coupon });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

// OPTIONAL: PUT/PATCH to update coupon (if needed)
export async function PUT(request, { params }) {
  try {
    if (!adminDatabase) throw new Error("Database not initialized");
    
    const { id } = params;
    const body = await request.json();
    const { code, discount, status } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Coupon ID is required" }, { status: 400 });
    }

    // Check if coupon exists
    const snapshot = await adminDatabase.ref(`coupons/${id}`).once("value");
    if (!snapshot.exists()) {
      return NextResponse.json({ success: false, error: "Coupon not found" }, { status: 404 });
    }

    // Update coupon
    const updates = {};
    if (code) updates.code = code.trim().toUpperCase();
    if (discount) updates.discount = parseInt(discount);
    if (status) updates.status = status;
    updates.updatedAt = Date.now();

    await adminDatabase.ref(`coupons/${id}`).update(updates);

    return NextResponse.json({ 
      success: true, 
      message: `Coupon ${id} updated successfully` 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}