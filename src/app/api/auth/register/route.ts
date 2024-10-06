import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { saltAndHashPassword } from '@/utils/password';
import { User } from '@/models/user';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await saltAndHashPassword(password, salt);
    const user = await User.create({
      email: email,
      password: hashedPassword,
      salt: salt,
    });

    return NextResponse.json(
      { message: 'success', userId: user.id },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Error: error }, { status: 400 });
  }
}
