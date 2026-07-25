import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ADMIN_EMAILS = [
  'awebgrow@gmail.com',
  'hridesh027@gmail.com',
  'kandusushil9@gmail.com'
];

export async function POST(request) {
  try {
    const { uid, email, name, profileImage } = await request.json();

    if (!uid || !email) {
      return NextResponse.json({ error: "Missing identity parameters" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    
    // Strict Server-Side Role Resolution
    const role = ADMIN_EMAILS.includes(cleanEmail) ? 'admin' : 'user';

    const token = jwt.sign(
      { uid, email: cleanEmail, name, profileImage, role }, 
      process.env.JWT_SECRET_KEY, 
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({ 
      success: true, 
      user: { uid, name, email: cleanEmail, profileImage, role } 
    });
    
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 Days
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}