// src\app\api\auth\me\route.jsx
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Securely verify token context
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    return NextResponse.json({
      authenticated: true,
      user: {
        uid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        profileImage: decoded.profileImage || null,
        role: decoded.role || 'user'
      }
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: "Invalid session scope" }, { status: 401 });
  }
}