import { useEffect, useState } from "react";
import Barchart from "./Barchart";
import DoughnutChart from "./Doughuntchart";
import cardImage from "../images/Rectangle 48.png";
function Courseoverviewsection() {
  const [courseData, setCourseData] = useState([]);
  const [courseTitles, setCourseTitles] = useState([]);
  const [progressData, setProgressData] = useState([]); // New state for progress data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/course");
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    const fetchProgress = async () => {
      try {
        const response = await fetch("http://localhost:3333/progress");
        const data = await response.json();
        setProgressData(data); // Use setProgressData for progress data
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchData();
    fetchProgress(); // Call fetchProgress separately
  }, []);

  useEffect(() => {
    // Update courseTitles when courseData changes
    const coursetitles = courseData.map(
      (course) =>
        course.course_blocks.blocks[
          "block-v1:edX+DemoX+Demo_Course+type@course+block@course"
        ].display_name
    );
    setCourseTitles(coursetitles);
  }, [courseData]);
  return (
    <>
      {courseData.map((course, index) => (
        <div key={course.id}>
          {/* Course Overview section */}
          <h1 className="font-nunito text-[32px] font-semibold leading-11">
            Course Overview
          </h1>
          <div className="border bordershadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-gray-400 h-[min-content] w-[1250px] p-6 pr-0 flex gap-5 overflow-hidden flex-wrap">
            {/* Course Image */}
            <div className="relative top-0 ">
              <img src={cardImage} alt="" className="w-[298px] h-[285px]" />
            </div>
            {/* Course Title and Course Short Description */}
            <div className="flex flex-col gap-3 ml-2 mr-10 w-[400px]">
              <h1 className="font-nunito text-[38px] w-[402px]">
                {courseTitles}
              </h1>
              {/* Course Short Description */}
              <p className="text-[16px] font-nunito">
                {course.course_short_name}
              </p>

              <p className="text-[16px] font-nunito">Currently on</p>
              {courseData.map((course) => {
                const resumeBlock =
                  course.course_blocks.blocks[
                    "block-v1:edX+DemoX+Demo_Course+type@course+block@course"
                  ].resume_block;

                if (resumeBlock) {
                  return (
                    <div key={course.id}>
                      {/* Display the name of the course */}
                      <h1>
                        {
                          course.course_blocks.blocks[
                            "block-v1:edX+DemoX+Demo_Course+type@course+block@course"
                          ].display_name
                        }
                      </h1>
                      {/* Other course details */}
                    </div>
                  );
                }

                return null; // If resume_block is false, don't render anything
              })}

              <button className="bg-[#56B99C] w-[97px] font-nunito px-5 py-2 h-[43px] text-white text-[16px]">
                Resume
              </button>
            </div>
            <div className="w-[435px] h-[350px] flex justify-center items-center">
              {/**DoughnutChart*/}
              <div className="w-[137px] h-full relative flex flex-col  justify-center items-center gap-5">
                <h1 className="text-[19px] font-nunito text-center">Total</h1>
                <DoughnutChart />
                {progressData.map((item, index) => {
                  return (
                    <div key={index} className="donut-inner  mt-[-110px]">
                      <h5 className=" mt-0 bottom-2 text-center relative text-[27px]">
                        {item.completion_summary.complete_count}
                      </h5>
                      <span className="text-sm bottom-4 ml-1 relative text-center">
                        of{" "}
                        {item.completion_summary.complete_count +
                          item.completion_summary.incomplete_count}{" "}
                        items
                      </span>
                    </div>
                  );
                })}
                <h1 className="text-[19px] w-[148px] font-nunito text-center mt-5">
                  Items Completed
                </h1>
              </div>
              {/**BarChart*/}
              <div className="w-[277px] mr-7 h-full relative flex flex-col  justify-center ">
                {progressData.map((item, index) => {
                  const types =
                    item.grading_policy?.assignment_policies.map(
                      (element) => element.type
                    ) || [];
                  const CourseWeight =
                    item.grading_policy?.assignment_policies.map(
                      (element) => element.weight
                    ) || [];

                  return (
                    <>
                      <div className="flex ml-11 text-center w-full   gap-4">
                        <h1 className="text-[16px] font-nunito  ">
                          {types[0]}
                        </h1>
                        <h1 className="text-[16px] font-nunito  ">
                          {types[1]}
                        </h1>
                        <h1 className="text-[16px] font-nunito  ">
                          {types[2]}
                        </h1>
                      </div>
                      <div className="flex    gap-12 ml-5  w-full items-center justify-center ">
                        <h3 className="font-nunito text-[16px] relative left-2">
                          {CourseWeight[0] * 100 + "%"}
                        </h3>

                        <h3 className="font-nunito   text-[16px] relative left-2">
                          {CourseWeight[1] * 100 + "%"}
                        </h3>
                        <h3 className="font-nunito  text-[16px]">
                          {CourseWeight[2] * 100 + "%"}
                        </h3>
                      </div>
                    </>
                  );
                })}
                <Barchart />
                <h1 className="text-[19px] mt-3 w-full font-nunito text-center">
                  Overall Grade
                </h1>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Courseoverviewsection;
