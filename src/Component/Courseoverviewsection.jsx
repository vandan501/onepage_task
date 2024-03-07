import Barchart from "./Barchart";
import DoughnutChart from "./Doughuntchart";
import cardImage from "../images/Rectangle 48.png";
function Courseoverviewsection({
  courseData,
  progressData,
  assignmentPolicies,
}) {
  let coursetitles = courseData.map(
    (course) =>
      course.course_blocks.blocks[
        "block-v1:edX+DemoX+Demo_Course+type@course+block@course"
      ].display_name
  );

  if (!courseData || !progressData || !assignmentPolicies) {
    return <p>Loading...</p>; // Show a loading message
  }

  return (
    <>
      {courseData.map((course, index) => (
        <>
          {/* Course Overview section */}
          <h1 className="course-overview-title">Course Overview</h1>
          <div className="course-overview-container">
            {/* Course Image */}
            <div className="course-overview-img">
              <img src={cardImage} alt="" className="course-overview-img" />
            </div>

            {/* Course Title and Course Short Description */}
            <div className="course-title-description">
              <h1 className="course-title">{coursetitles}</h1>
              {/* Course Short Description */}
              <p className="course-description">{course.course_short_name}</p>

              <div className="flex">
                <p className="currently-on">Currently on</p>

                {courseData.map((course) => {
                  const resumeBlock = course.course_blocks.blocks[
                    "block-v1:edX+DemoX+Demo_Course+type@course+block@course"
                  ].children
                    .map((sectionId) => course.course_blocks.blocks[sectionId])
                    .filter((section) => section.resume_block === true)
                    .map((section) => section.display_name);

                  if (resumeBlock) {
                    return (
                      
                          <p className="next-section-title">
                          {resumeBlock.join(", ")}
                        </p>
                      
                    );
                  }
                  return null; // If resume_block is false or no matching sections, don't render anything
                })}
                <button className="course-overview-btn">Resume</button>
              </div>
            </div>

            {/**DoughnutChart*/}
            <div className="chart-section">
              <div className="doughunt-chart-section">
                <p className="chart-top-title1">Total</p>
                <DoughnutChart progressData={progressData} />
                {progressData.map((item, index) => {
                  return (
                    <div key={index} className="status-flex-box">
                      <h5 className="status-flex ">
                        {item.completion_summary.complete_count}
                      </h5>
                      <span className="status-flex2">
                        of{" "}
                        {item.completion_summary.complete_count +
                          item.completion_summary.incomplete_count}{" "}
                        items
                      </span>
                    </div>
                  );
                })}
                <p className="chart-bottom-title unique">Items Completed</p>
              </div>
              {/**BarChart*/}
              <div className=" bar-chart-section">
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
                      <div className="bar-top-flex">
                        <p className="chart-top-title ">{types[0]}</p>
                        <p className="chart-top-title ">{types[1]}</p>
                        <p className="chart-top-title ">{types[2]}</p>
                        <p className="chart-top-title ">{types[0]}</p>
                        <p className="chart-top-title ">{types[1]}</p>
                        <p className="chart-top-title ">{types[2]}</p>
                        <p className="chart-top-title ">{types[0]}</p>
                        <p className="chart-top-title ">{types[1]}</p>
                        <p className="chart-top-title ">{types[2]}</p>
                        <p className="chart-top-title ">{types[2]}</p>
                      </div>
                      <div className="bar-percentage-flex ">
                        <p className="per1"
                        >
                          {CourseWeight[0] * 100 + "%"}
                        </p>
                        <p className="per1"
                        >
                          {CourseWeight[0] * 100 + "%"}
                        </p>
                        <p className="per1"
                        >
                          {CourseWeight[0] * 100 + "%"}
                        </p>
                        <p className="per1"
                        >
                          {CourseWeight[0] * 100 + "%"}
                        </p>
                        <p className="per1"
                        >
                          {CourseWeight[0] * 100 + "%"}
                        </p>
                        <p className="per1"
                        >
                          {CourseWeight[0] * 100 + "%"}
                        </p>
                        <p className="per1"
                        >
                          {CourseWeight[0] * 100 + "%"}
                        </p>
                        <p className="per1"
                        >
                          {CourseWeight[0] * 100 + "%"}
                        </p>
                        <p className="per1"
                        >
                          {CourseWeight[0] * 100 + "%"}
                        </p>
                        <p className="per1"
                        >
                          {CourseWeight[0] * 100 + "%"}
                        </p>
                       
                      </div>
                    </>
                  );
                })}
                <Barchart assignmentPolicies={assignmentPolicies} />
                <p className="chart-bottom-title">Overall Grade</p>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
}

export default Courseoverviewsection;
