import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { uid, email, name, profileImage, role } = await request.json();

    if (!uid || !email) {
      return NextResponse.json({ error: "Missing identity parameters" }, { status: 400 });
    }

    const token = jwt.sign(
      { uid, email, name, profileImage, role: role || 'user' }, 
      process.env.JWT_SECRET_KEY, 
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({ 
      success: true, 
      user: { uid, name, email, profileImage, role: role || 'user' } 
    });
    
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 Days
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}