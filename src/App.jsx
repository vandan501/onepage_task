import React, { useEffect, useState } from "react";
import Courseoverviewsection from "./Component/Courseoverviewsection";
import Availablechapterssection from "./Component/Availablechapterssection";

function App() {
  const [courseData, setCourseData] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [assignmentPolicies, setAssignmentPolicies] = useState([]);

  /*******************COURSE API******************/
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

    // Progress API will be used
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
 
  /*******************PROGRESS API******************/
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch("http://localhost:3333/progress");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch progress data. Status: ${response.status}`
          );
        }
        const data = await response.json();
        setProgressData(data);
        setAssignmentPolicies(data);
      } catch (error) {
        console.error("Error fetching progress data:", error.message);
      }
    };

    fetchProgress();
  }, []);

  return (
    // Use parentheses for conditional rendering
    courseData && progressData && assignmentPolicies ? (
      <div className="app-container">
        {/* Course Overview Section*/}
        <Courseoverviewsection
          courseData={courseData}
          progressData={progressData}
          assignmentPolicies={assignmentPolicies}
        />

        {/* Available Chapters Section*/}
        <Availablechapterssection courseData={courseData} />
      </div>
    ) : (
      // here loader will be display
      <p>Loading...</p>
    )
  );
}
export default App;
