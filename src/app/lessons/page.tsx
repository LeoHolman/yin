import React, { useState, useEffect, useContext } from 'react';

export default function Lessons() {
  const [allLessons, setAllLessons] = useState([]);

  useEffect(() => {
    async function fetchLessons() {
      const response = await fetch(`/api/lessons`);
      const data = await response.json();
      return data;
    }

    fetchLessons().then((data) => {
      console.log(data);
    });
    // setAllLessons(result.filter((s) => s.language == activeLang));
    // },[activeLang])
  }, []);

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
          <p key={lesson.id}>{lesson.name}</p>
        );
      })}
    </ul>
  );
}
