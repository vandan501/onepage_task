import React, { useEffect, useMemo, useRef } from "react";
import Chart from "chart.js/auto";

function Barchart({ assignmentPolicies }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const typesArray = useMemo(() => [], []);
  const courseWeightArray = useMemo(() => [], []);

  const createGradient = (
    context,
    completedColor,
    notCompletedColor,
    completionPercentage
  ) => {
    if (!context) {
      return null;
    }

    const clampedPercentage = Math.min(100, Math.max(0, completionPercentage));
    const normalizedPercentage = clampedPercentage / 100;
    const remainPercentage = 1 - normalizedPercentage;

    const gradient = context.createLinearGradient(0, 0, 0, 1);
    gradient.addColorStop(normalizedPercentage, completedColor);
    gradient.addColorStop(remainPercentage, notCompletedColor);
    return gradient;
  };

  useEffect(() => {
    // Load data
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
      typesArray.push("OverAll"); //the Static Value added in TypeArray(last Bar)
      courseWeightArray.push(...courseWeight);
    });
  }, [assignmentPolicies, typesArray, courseWeightArray]);

  useEffect(() => {
    const myChartRef = chartRef.current?.getContext("2d");
    const datasets = assignmentPolicies.map((item, index) => {
      const weights =
        item.grading_policy?.assignment_policies.map(
          (element) => element.weight * 100
        ) || [];

        // New Code Updated in which the logic of Overall Grade is wrote
        

      // sumOfWeights indicates the sum of all values in the weights array
      const sumOfWeights = weights.reduce((total, currentValue) => total + currentValue,0);

      //Here  OverallScore indicates the the Sum of weights devide by total number of weights*100 
      const overallScore = (sumOfWeights / (weights.length * 100)) * 100;

      // this will fix the value
      const roundedOverallScore = Math.floor(parseFloat(overallScore));

      //Totalweights is combination of weights and the overallscoreValue 
      const totalWeights = [...weights, roundedOverallScore];

      // From here U can check values in 
      console.log("totalWeights:", totalWeights);
      console.log("SumOfWeights:", sumOfWeights);
      console.log("sumofWeights.length*100", weights.length * 100);
      console.log("OverAllGrade:", sumOfWeights / (weights.length * 100));
      
      const completionPercentage = courseWeightArray[index] || 0;
      
      const backgroundColor = createGradient(
        myChartRef,
        "#56B99C", // Completed color
        "#D9D9D9", // Not Completed color
        completionPercentage
      );
      return {
        label: "Progress",
        data: totalWeights,
        backgroundColor: [backgroundColor],
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
  }, [assignmentPolicies, typesArray, courseWeightArray]);

  return (
    <>
      {assignmentPolicies ? (
        <div className="flex-container">
          <canvas ref={chartRef} className="bar-chart-css" />
          <div className="chart-background"></div>
        </div>
      ) : (
        <p>Please wait a few seconds...</p>
      )}
    </>
  );
}

export default Barchart;
