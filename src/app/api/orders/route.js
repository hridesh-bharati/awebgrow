// src/app/api/orders/route.js

import { NextResponse } from "next/server";
import { adminDatabase } from "@/lib/firebase-admin";

const ORDERS_PATH = "orders";

// =========================
// GET
// =========================
// GET /api/orders
export async function GET(request) {
  try {
    if (!adminDatabase) {
      return NextResponse.json(
        {
          success: false,
          error: "Firebase Admin Database is not initialized.",
        },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Single Order
    if (id) {
      const snapshot = await adminDatabase
        .ref(`${ORDERS_PATH}/${id}`)
        .once("value");

      if (!snapshot.exists()) {
        return NextResponse.json(
          {
            success: false,
            error: "Order not found.",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        order: {
          id,
          ...snapshot.val(),
        },
      });
    }

    // All Orders
    const snapshot = await adminDatabase.ref(ORDERS_PATH).once("value");

    const data = snapshot.val();

    const orders = data
      ? Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .sort((a, b) => b.createdAt - a.createdAt)
      : [];

    return NextResponse.json({
      success: true,
      total: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// =========================
// POST
// =========================
// POST /api/orders
export async function POST(request) {
  try {
    if (!adminDatabase) {
      return NextResponse.json(
        {
          success: false,
          error: "Firebase Admin Database is not initialized.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();

    const {
      clientName,
      clientEmail,
      clientPhone,
      architectureRequirements,
      selectedService,
      serviceSlugId,
      packagePlan,
      basePrice,
      couponApplied,
      discountReceived,
      finalPayableAmount,
    } = body;

    if (
      !clientName ||
      !clientEmail ||
      !clientPhone ||
      !selectedService ||
      !packagePlan
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Required fields are missing.",
        },
        { status: 400 }
      );
    }

    const orderRef = adminDatabase.ref(ORDERS_PATH).push();

    const orderData = {
      orderId: orderRef.key,

      clientName,
      clientEmail,
      clientPhone,

      architectureRequirements:
        architectureRequirements || "",

      selectedService,
      serviceSlugId,

      packagePlan,

      basePrice: Number(basePrice) || 0,

      couponApplied: couponApplied || "NONE",

      discountReceived:
        Number(discountReceived) || 0,

      finalPayableAmount:
        Number(finalPayableAmount) || 0,

      paymentStatus: "Pending",

      orderStatus: "New",

      createdAt: Date.now(),

      updatedAt: Date.now(),
    };

    await orderRef.set(orderData);

    return NextResponse.json({
      success: true,
      id: orderRef.key,
      message: "Order placed successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// =========================
// PATCH
// =========================
// PATCH /api/orders
//
// body:
//
// {
//   id:"-Oabc123",
//   orderStatus:"Completed",
//   paymentStatus:"Paid"
// }
//
export async function PATCH(request) {
  try {
    if (!adminDatabase) {
      return NextResponse.json(
        {
          success: false,
          error: "Firebase Admin Database is not initialized.",
        },
        { status: 503 }
      );
    }

    const body = await request.json();

    const {
      id,
      orderStatus,
      paymentStatus,
    } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Order id required.",
        },
        { status: 400 }
      );
    }

    const updateData = {
      updatedAt: Date.now(),
    };

    if (orderStatus)
      updateData.orderStatus = orderStatus;

    if (paymentStatus)
      updateData.paymentStatus = paymentStatus;

    await adminDatabase
      .ref(`${ORDERS_PATH}/${id}`)
      .update(updateData);

    return NextResponse.json({
      success: true,
      message: "Order updated successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// =========================
// DELETE
// =========================
// DELETE /api/orders?id=xxxxx
export async function DELETE(request) {
  try {
    if (!adminDatabase) {
      return NextResponse.json(
        {
          success: false,
          error: "Firebase Admin Database is not initialized.",
        },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Order id required.",
        },
        { status: 400 }
      );
    }

    await adminDatabase
      .ref(`${ORDERS_PATH}/${id}`)
      .remove();

    return NextResponse.json({
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}