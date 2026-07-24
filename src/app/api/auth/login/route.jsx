import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { uid, email, name, profileImage, role } = await request.json();

    if (!uid || !email) {
      return NextResponse.json({ error: "Missing required identity parameters" }, { status: 400 });
    }

    // Generating secure token valid for 7 days
    const token = jwt.sign(
      { uid, email, name, profileImage, role: role || 'user' }, 
      process.env.JWT_SECRET_KEY, 
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({ 
      success: true, 
      user: { uid, name, email, profileImage, role: role || 'user' } 
    });
    
    // Cookie parameters protecting against XSS/CSRF vectors
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}