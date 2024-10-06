'use client';
import React from 'react';
import Recorder from '@/components/Recorder';
import { useSession, signIn } from 'next-auth/react';
import * as d3 from 'd3';
import toast from 'react-hot-toast';
import { User } from '@/types/next-auth';

export default function BaselinePage() {
  const session = useSession();
  const user: User | undefined = session.data?.user;

  async function postBaseline(tsvData: string) {
    const parsedData = d3.tsvParse(tsvData);
    const frequencyData = parsedData.map((row) => {
      return Number(row.frequency);
    });
    const baseline =
      frequencyData.reduce((acc: number, point: number) => acc + point, 0) /
      frequencyData.length;

    const response = await fetch('/api/baseline/set', {
      method: 'PUT',
      body: JSON.stringify({
        userId: user?.id,
        baseline: baseline,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      toast.success('Baseline recorded successfully!');
    }
  }

  if (!user) {
    return (
      <>
        <p>You must sign in to record your baseline</p>
        <button onClick={() => signIn()}>Sign In</button>
      </>
    );
  }

  return (
    <>
      <p>Your baseline: {user.baseline}</p>
      <Recorder
        label='Record'
        outputFunction={postBaseline}
      />
    </>
  );
}
