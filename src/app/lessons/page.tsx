'use client';
import React, { useState, useEffect, useContext } from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Lessons() {
  const result = useSession();
  const { data: session } = result;
  if (!session) {
    return (
      <>
        <p>You must sign in to view lessons</p>
        <button onClick={() => signIn()}>Sign In</button>
      </>
    );
  }

  return (
    <>
      <p>{session.user?.name}</p>
      <p>{session.user?.baseline}</p>
    </>
  );

  // const session = await getServerSession(authOptions);
  // const { data, status } = getServerSession({
  // required: true,
  // onUnauthenticated() {
  // redirect('/');
  // },
  // });

  // const [allLessons, setAllLessons] = useState([]);

  // useEffect(() => {
  //   async function fetchLessons() {
  //     const response = await fetch(`/api/lessons`);
  //     const data = await response.json();
  //     return data;
  //   }

  //   fetchLessons().then((data) => {
  //     console.log(data);
  //   });
  //   // setAllLessons(result.filter((s) => s.language == activeLang));
  //   // },[activeLang])
  // }, []);

  const allLessons = [1, 2, 3, 4, 5];

  return (
    <ul>
      {allLessons.map((lesson) => {
        return (
          //   <LessonDirectoryCard
          //     lessonName={lesson.name}
          //     lessonDesc={lesson.description}
          //     isQuiz={lesson.is_quiz}
          //     link={`/lessons/${lesson.name}/`}
          //     key={`${lesson._id}`}
          //   />
          // <p key={lesson.id}>{lesson.name}</p>
          <p>{lesson}</p>
        );
      })}
    </ul>
  );
}
