import React, { useEffect, useState, useContext } from "react";
import LessonDirectoryCard from "../components/LessonDirectoryCard";
import { userContext } from "../context/userContext";
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
//   } from "react-router-dom";
// import Hexagon from '../components/Hexagon';

function LessonDirectory() {
  const [allLessons, setAllLessons] = useState([]);
  const activeLang = useContext(userContext); //sets activeLang to null from userContext


  /**
    constructor(props){
        super(props)
        this.state = {
            allLessons: []
        }
    }
*/
  /**
    async componentDidMount() {
        fetch('/api/lessons/all')
            .then( (response) => response.json()
                .then( (result) => {
                    console.log(result);
                    this.setState({allLessons: result});
                }));
            }
// wip
     */



  useEffect(() => {
    fetch(`/api/lessons/all/`).then((response) =>   //requests all lessons from the api
      response.json().then((result) => {
        const lessons = Array.isArray(result) ? result : [];    //stores them in lessons array, is set to be empty if there are no results
        const normalizedActive = String(activeLang || "").trim().toLowerCase();

        const safeLessons = lessons.filter((lesson) => {
          if (!lesson || typeof lesson !== "object") {
            return false;
          }

          const lessonLanguage =
            typeof lesson.language === "string" ? lesson.language.trim() : "";

          if (lessonLanguage === "" || normalizedActive === "") {
            return true;
          }

          return lessonLanguage.toLowerCase() === normalizedActive;
        });

        setAllLessons(safeLessons.length > 0 ? safeLessons : lessons);
      })
    );
  }, [activeLang]);

  // debug line
  // var debug = this.state.allLessons;
  // console.log(JSON.stringify(debug));

  return (
    <div>
      <ul>
        {/* loops thru all lessons */}
        {allLessons.map((lesson) => {
          const { _id: lessonId, name, description } = lesson;    //these are values stored in api/lessons/all
          const isQuiz = lesson.is_quiz;
          // for each lesson, a lesson card is made, which is an expandable menu
          return (
            <LessonDirectoryCard
              lessonName={name}
              lessonDesc={description}
              isQuiz={isQuiz}
              link={`/lessons/${name}/`}
              key={lessonId}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default LessonDirectory;
