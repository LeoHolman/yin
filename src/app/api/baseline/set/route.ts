import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/user';

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const user = await User.findOne({ where: { id: data.userId } });
  if (!user) {
    return NextResponse.json(
      { message: 'failure; user not found' },
      { status: 404 }
    );
  }
  user.baseline = data.baseline;
  user?.save();

  return NextResponse.json({ message: 'success' }, { status: 200 });
}
