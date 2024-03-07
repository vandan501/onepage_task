import { Chart } from "chart.js/auto";
import { useEffect, useRef } from "react";

function DoughnutChart({progressData}) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // for chart rendring
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

  // for ProgressDatas
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

  return <canvas ref={chartRef} className="doughnutchart" />;

}

export default DoughnutChart;
