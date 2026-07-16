// src/app/api/coupons/route.js
import { NextResponse } from "next/server";
import adminApp, { adminDatabase } from "@/lib/firebase-admin";
export async function GET() {
  try {
    if (!adminDatabase) {
      return NextResponse.json({ success: false, error: "Database context uninitialized." }, { status: 503 });
    }
    const snapshot = await adminDatabase.ref("coupons").once("value");
    const data = snapshot.val();
    const couponsList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
    return NextResponse.json({ success: true, coupons: couponsList });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // Runtime check directly fallback target engine par
    if (!adminDatabase) {
      return NextResponse.json({ 
        success: false, 
        error: "Firebase Admin Database Instance is down or unauthorized." 
      }, { status: 503 });
    }

    const body = await request.json();
    const { serviceId, code, discount } = body;

    if (!serviceId || !code || !discount) {
      return NextResponse.json({ success: false, error: "Required structural properties missing." }, { status: 400 });
    }

    const cleanCode = String(code).trim().toUpperCase();
    
    // Explicit targeting architecture path selection
    const couponPayload = {
      serviceId: String(serviceId),
      code: cleanCode,
      discount: parseInt(discount),
      status: "Active",
      createdAt: Date.now()
    };

    // Push sequence stream initialization
    const couponsRef = adminDatabase.ref("coupons");
    const newCouponRef = couponsRef.push();
    
    // Core transactional execution query
    await newCouponRef.set(couponPayload);

    return NextResponse.json({ 
      success: true, 
      id: newCouponRef.key,
      message: "Node token successfully committed to Cloud Registry Ledger."
    });

  } catch (error) {
    console.error("⛔ [CRITICAL PIPELINE EXECUTION FAILURE] POST /api/coupons:", error.message);
    return NextResponse.json({ 
      success: false, 
      error: `Database Operation Refused: ${error.message}` 
    }, { status: 500 });
  }
}