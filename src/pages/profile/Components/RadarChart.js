import { useState } from "react";
import { useTheme } from "styles/mui";
import ReactApexChart from "react-apexcharts";

const themeOptions = (theme) => {
  return {
    series: [
      {
        name: "Series 1",
        data: [80, 50, 30, 40, 100],
      },
    ],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    labels: [
      "Test performance",
      "Learning",
      "Participation",
      "Tutorial",
      "Materials visits",
    ],
    fill: {
      colors: [theme.palette.primary.light, theme.palette.success.light],
    },
    colors: [theme.palette.primary.main, theme.palette.success.main],
  };
};

function RadarChart({ values }) {
  const theme = useTheme();
  const [state] = useState(values);
  return (
    <ReactApexChart
      options={themeOptions(theme)}
      series={state.series}
      type="radar"
      height="350"
    />
  );
}

export default RadarChart;
