import React from "react";
import Isgradedtrue from "../Component/Isgradedtrue";
import Isgradedfalse from "../Component/IsgradedFalse";
function Availablechapterssection({courseData}) {
 // Check if courseData is undefined or null
 if (!courseData) {
  return <p>No course data available.</p>; 
}


  return (
    <>
      {courseData.map((course, index) => (
        <div key={index} className="available-chapters-container">
          <h1 className=" available-ch-title">
            Available chapters
          </h1>
          <p className=" course-start-date">
            <b style={{ color: "black" }}>Start Date :</b>{" "}
            {course.course_start_date}
          </p>
          <div className="available-course-cards">
            {course.course_blocks.blocks[
              "block-v1:edX+DemoX+Demo_Course+type@course+block@course"
            ].children.map((chapterKey) => {
              const chapter = course.course_blocks.blocks[chapterKey];

              // Get the count of completed children for each chapter
              const completedChildrenCount = chapter.children.reduce(
                (count, childKey) => {
                  const child = course.course_blocks.blocks[childKey];
                  return count + (child.complete ? 1 : 0);
                },
                0
              );

              // Checking if at least one child is graded
              const isAnyChildGraded = chapter.children.some(
                (childKey) => course.course_blocks.blocks[childKey].is_graded
              );

              return (
                <div key={chapter.id} className="chapter-card">
                  <h1 className="ch-heading">{chapter.display_name}</h1>
                  <div>
                    <p className="items-completed1">
                      {completedChildrenCount} of {chapter.children.length}
                    </p>
                    <p className="items-completed2 ">items completed</p>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <div className="flex justify-center items-center">
                      {isAnyChildGraded ? <Isgradedtrue /> : <Isgradedfalse />}
                    </div>
                  </div>
                  {}
                  <p className=" graded-asignment-static-title">
                    Graded Assignments
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

export default Availablechapterssection;
