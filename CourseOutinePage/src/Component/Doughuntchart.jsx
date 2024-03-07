import { Chart } from "chart.js/auto";
import { useEffect, useRef, useState } from "react";

function DoughnutChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch("http://localhost:3333/progress");
        if (!response.ok) {
          throw new Error(`Failed to fetch progress data. Status: ${response.status}`);
        }
        const data = await response.json();
        setProgressData(data);
      } catch (error) {
        console.error("Error fetching progress data:", error.message);
      }
    };

    fetchProgress();
  }, []);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "doughnut",

      data: {
        labels: ["Items Completed", "Items Incompleted"],
        datasets: [
          {
            label: [""],
            data: [50, 50],
            backgroundColor: ["#56B99C", "#D9D9D9"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        cutout: "80%",
        cutoutPercentage: 20,
        elements: {
          arc: {
            borderWidth: 0.7,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const typesArray = progressData.map((item) => [
      item.completion_summary.complete_count || 0,
      item.completion_summary.incomplete_count || 0,
    ]);

    // Update the chart data
    if (chartInstance.current) {
      chartInstance.current.data.datasets[0].data = typesArray.flat();
      chartInstance.current.update();
    }
  }, [progressData]);

  return <canvas ref={chartRef} className="w-[170] h-[14px]"></canvas>;
}

export default DoughnutChart;
