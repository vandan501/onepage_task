import React, { useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js/auto";

function Barchart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [assignmentPolicies, setAssignmentPolicies] = useState([]);
  const typesArray = useMemo(() => [], []); // Use useMemo to memoize typesArray
  const courseWeightArray = useMemo(() => [], []); // Use useMemo to memoize courseWeightArray

  const createGradient = (
    context,
    completedColor,
    notCompletedColor,
    completionPercentage
  ) => {
    // Ensure completionPercentage is a valid number between 0 and 100
    const clampedPercentage = Math.min(100, Math.max(0, completionPercentage));

    // Normalize clampedPercentage to be between 0 and 1
    const normalizedPercentage = clampedPercentage / 100;
    const remainPercentage = 1 - normalizedPercentage;

    const gradient = context.createLinearGradient(0, 0, 0, 1);
    gradient.addColorStop(normalizedPercentage, completedColor);
    gradient.addColorStop(remainPercentage, notCompletedColor);
    return gradient;
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch("http://localhost:3333/progress");
        const data = await response.json();
        setAssignmentPolicies(data);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchProgress();
  }, []); // Empty dependency array since it runs only once

  useEffect(() => {
    assignmentPolicies.forEach((item) => {
      const types =
        item.grading_policy?.assignment_policies.map(
          (element) => element.type
        ) || [];
      const courseWeight =
        item.grading_policy?.assignment_policies.map(
          (element) => element.weight * 100
        ) || [];

      typesArray.push(...types);
      courseWeightArray.push(...courseWeight);
    }); // eslint-disable-next-line
  }, [assignmentPolicies, typesArray]);

  useEffect(() => {
    // Flatten the array of arrays
    const myChartRef = chartRef.current.getContext("2d");
    const datasets = assignmentPolicies.map((item, index) => {
      const weights =
        item.grading_policy?.assignment_policies.map(
          (element) => element.weight * 100
        ) || [];

      const completionPercentage = courseWeightArray[index] || 0;

      const backgroundColor = createGradient(
        myChartRef,
        "#56B99C", // Completed color
        "#D9D9D9", // Not Completed color
        completionPercentage
      );

      return {
        label: "Progress", // Use type as label
        data: weights,
        backgroundColor: backgroundColor,
        borderWidth: 1,
        minBarLength: 2,
        barPercentage: 0.7,
        categoryPercentage: 1,
      };
    });

    chartInstance.current = new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: typesArray,
        datasets: datasets,
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        layout: {
          padding: {
            left: 50,
          },
        },
        scales: {
          x: {
            display: false,
            stacked: true,
          },
          y: {
            display: false,
            beginAtZero: true,
          },
        },
        indexAxis: "x",
        categoryPercentage: 0,
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [assignmentPolicies, courseWeightArray, typesArray]);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <canvas
        ref={chartRef}
        className="w-full   flex self-center"
      />
      <div className="bg-[#969696] top-0 relative left-6 rounded-md w-[236px] h-2"></div>
    </div>
  );
}

export default Barchart;
