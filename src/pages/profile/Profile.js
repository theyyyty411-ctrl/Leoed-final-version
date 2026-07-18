import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "styles/mui";
import ReactApexChart from "react-apexcharts";

import { Badge, Chip, Button } from "../../components/Wrappers";
import Tabs from "./Components/Tabs";
import Donut from "./Components/DonutChart";
// import RNSWidget from './Components/RNSWIdget';
import ToDo from "./Components/ToDo";
import Calendar from "./Components/Calendar/Calendar";
import MediaBlock from "./Components/MediaBlock";
import ViewsWidget from "./Components/ViewsWidget";
import ProfileIcon from "../../images/logo.png";
import BehanceIcon from "../../images/profile/BehanceIcon.svg";
import MediumIcon from "../../images/profile/MediumIcon.svg";
import FacebookIcon from "../../images/profile/FacebookIcon.svg";
import DribbleIcon from "../../images/profile/DribbleIcon.svg";
import InstagramIcon from "../../images/profile/InstagramIcon.svg";
import CloudIcon from "./Icons/CloudIcon";

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import Achievement from "./Components/Achievement";
import Tasks from "./Components/Tasks";

const taskList = [
  { color: "#FFC35F", date: "2026-06-20", title: "Quiz 1", submitted: false },
  { color: "#FFC35F", date: "2026-06-22", title: "Quiz 2", submitted: false },
  {
    color: "#3CD4A0",
    date: "2026-06-28",
    title: "Exercise 12",
    submitted: true,
  },
  { color: "#FFC35F", date: "2026-07-03", title: "Quiz 3", submitted: false },
  { color: "#757575", date: "2026-07-05", title: "Exam 12", submitted: false },
];

const taskSum = [
  { name: "To do", value: 400, color: "#757575" },
  { name: "In Progress", value: 300, color: "#FFC35F" },
  { name: "Submitted", value: 300, color: "#3CD4A0" },
  { name: "Overdue", value: 200, color: "#FF5C93" },
];

const achSum = { questions: 12, submits: 3, courses: 1, stars: 10 };

const subjects = [
  "Subject 1",
  "Subject 2",
  "Subject 3",
  "Subject 4",
  "Subject 5",
];

const themeOptions = (theme) => {
  return {
    options_radar: {
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
      labels: subjects,
      fill: {
        colors: [theme.palette.primary.light, theme.palette.success.light],
      },
      colors: [theme.palette.primary.main, theme.palette.success.main],
    },
    options_bar: {
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top",
          },
        },
      },
      legend: {
        position: "top",
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },

      xaxis: {
        categories: subjects,
      },
      colors: [
        theme.palette.primary.main,
        theme.palette.success.light,
        theme.palette.secondary.main,
      ],
    },
  };
};

const values = {
  mastery: [
    {
      name: "Mastery",
      data: [80, 50, 30, 40, 10],
    },
  ],

  errorBar: [
    {
      name: "Easy",
      data: [44, 55, 41, 64, 22],
    },
    {
      name: "Normal",
      data: [53, 32, 33, 52, 13],
    },
    {
      name: "Hard",
      data: [53, 32, 33, 52, 13],
    },
  ],

  forgetRisk: [53, 32, 33, 52, 13],
  prereqNeed: [53, 32, 33, 52, 13],
  coverageNeed: [53, 32, 33, 52, 13],
};

const columns = [
  { field: "subject", headerName: "Subject", flex: 1, headerAlign: "center" },
  {
    field: "score",
    headerName: "Score",
    flex: 0.5,
    headerAlign: "center",
    align: "center",
  },
];

function Profile() {
  const theme = useTheme();
  const [state] = useState(values);
  const classes = useStyles();
  // let theme = useTheme();

  const forgetRisk = state.forgetRisk.map((item, index) => ({
    id: index + 1,
    subject: subjects[index],
    score: item,
  }));

  const prereqNeed = state.prereqNeed.map((item, index) => ({
    id: index + 1,
    subject: subjects[index],
    score: item,
  }));

  const coverageNeed = state.coverageNeed.map((item, index) => ({
    id: index + 1,
    subject: subjects[index],
    score: item,
  }));

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, lg: 12 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <Widget title={"Mastery Radar Chart"} noBodyPadding>
              <ReactApexChart
                options={themeOptions(theme).options_radar}
                series={state.mastery}
                type="radar"
                height="356"
              />
            </Widget>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <Widget title={"Error Rate by Difficulty"} noBodyPadding>
              <ReactApexChart
                options={themeOptions(theme).options_bar}
                series={state.errorBar}
                type="bar"
                height="356"
              />
            </Widget>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <Widget bodyClass={classes.tableWrapper}>
              <Typography variant="h6">Forgetting Risk</Typography>
              <div>
                <DataGrid
                  rows={forgetRisk}
                  columns={columns}
                  columnHeaderHeight={20}
                  rowHeight={15}
                  hideFooter
                  disableRowSelectionOnClick
                  sx={{
                    "& .MuiDataGrid-columnHeaderTitle": {
                      fontSize: "0.6rem",
                      fontWeight: "bold",
                    },
                    "& .MuiDataGrid-cell": {
                      fontSize: "0.6rem",
                    },
                  }}
                />
              </div>

              <Typography variant="h6" sx={{ pt: 1 }}>
                PrereqNeed
              </Typography>
              <div>
                <DataGrid
                  rows={prereqNeed}
                  columns={columns}
                  columnHeaderHeight={20}
                  rowHeight={15}
                  hideFooter
                  disableRowSelectionOnClick
                  sx={{
                    "& .MuiDataGrid-columnHeaderTitle": {
                      fontSize: "0.6rem",
                      fontWeight: "bold",
                    },
                    "& .MuiDataGrid-cell": {
                      fontSize: "0.6rem",
                    },
                  }}
                />
              </div>

              <Typography variant="h6" sx={{ pt: 1 }}>
                CoverageNeed
              </Typography>
              <div>
                <DataGrid
                  rows={coverageNeed}
                  columns={columns}
                  columnHeaderHeight={20}
                  rowHeight={15}
                  hideFooter
                  disableRowSelectionOnClick
                  sx={{
                    "& .MuiDataGrid-columnHeaderTitle": {
                      fontSize: "0.6rem",
                      fontWeight: "bold",
                    },
                    "& .MuiDataGrid-cell": {
                      fontSize: "0.6rem",
                    },
                  }}
                />
              </div>
            </Widget>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
            <Widget title="Tasks" bodyClass={classes.widgetBody}>
              <Tasks items={taskList} />
            </Widget>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
            <Widget>
              <Calendar items={taskList} />
            </Widget>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <Widget bodyClass={classes.mediaBlockPadding} title="Achievement">
              <Grid container spacing={1}>
                <Achievement items={achSum} />
              </Grid>
            </Widget>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <Widget className={classes.adjustHeight} title="Overview">
              <Donut items={taskSum} total={100} />
            </Widget>
          </Grid>

          {/* <Grid size={{ xs: 12, sm: 4, md: 4, lg: 12 }}>
            <Widget>
              <RNSWidget/>
            </Widget>
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
}

// #######################################################################

export default Profile;
