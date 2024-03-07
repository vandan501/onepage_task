import React, { useState, useEffect } from "react";
import Isgradedtrue from "../Component/Isgradedtrue";
import Isgradedfalse from "../Component/IsgradedFalse";

function Availablechapterssection() {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/course");
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {courseData.map((course, index) => (
        <div key={index}>
          <h1 className="font-nunito text-[32px] font-semibold leading-11">
            Available chapters
          </h1>
          <p className="text-gray-400 font-nunito">
            <b>Start Date :</b> {course.course_start_date}
          </p>
          <div className="w-[100%] h-full flex mt-14 gap-2 gap-y-5 flex-wrap">
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
                <div
                  key={chapter.id}
                  className="w-[304px] h-[270px] px-5 py-3 shadow-md flex flex-col gap-7 border border-solid border-gray-500 cursor-pointer"
                >
                  <h1 className="text-2xl font-semibold  h-24">
                    {chapter.display_name}
                  </h1>
                  <div>
                    <p className="font-nunito text-[19px]">
                      {completedChildrenCount} of {chapter.children.length}
                    </p>
                    <p className="font-nunito text-gray-400">items completed</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex justify-center items-center">
                      {isAnyChildGraded ? <Isgradedtrue /> : <Isgradedfalse />}
                    </div>
                  </div>
                  {}
                  <p className="text-gray-400">Graded Assignments</p>
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
