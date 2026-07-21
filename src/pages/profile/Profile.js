import { Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "styles/mui";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect, lazy, Suspense } from "react";

const ReactApexChart = lazy(() => import("react-apexcharts"));

import Donut from "./Components/DonutChart";
import Calendar from "./Components/Calendar/Calendar";

// styles
import useStyles from "./styles";

// components
import Widget from "../../components/Widget/Widget";
import Achievement from "./Components/Achievement";
import Tasks from "./Components/Tasks";

// context
import { useTasksState, getTasksRequest } from "../../context/TaskContext";


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
  const { t } = useTranslation();
  const state = values;
  const classes = useStyles();

  const context = useTasksState();
  const [taskList, setTaskList] = useState([]);
  const [taskSum, setTaskSum] = useState([
    { name: "To do", value: 0, color: "#536DFE" },
    { name: "In Progress", value: 0, color: "#FFC35F" },
    { name: "Submitted", value: 0, color: "#3CD4A0" },
    { name: "Overdue", value: 0, color: "#FF5C93" },
  ]);

  useEffect(() => {
    getTasksRequest(context.setTasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (context.tasks.tasks && context.tasks.tasks.length > 0) {
      const dateOnly = new Date().toISOString().split("T")[0];
      
      // Transform tasks for taskList
      const transformedTasks = context.tasks.tasks.map((task) => ({
        color: task.submit ? "#3CD4A0" : (task.due && task.due < dateOnly ? "#FF5C93" : "#FFC35F"),
        date: task.due ? new Date(task.due).toISOString().split("T")[0] : "-",
        title: task.name || `Task ${task.id}`,
        submitted: task.submit || false,
      }));
      setTaskList(transformedTasks);

      // Calculate task summary (mutually exclusive categories)
      const submittedCount = context.tasks.tasks.filter((task) => task.submit).length;
      const overdueCount = context.tasks.tasks.filter(
        (task) => task.due && task.due < dateOnly && !task.submit
      ).length;
      const inProgressCount = context.tasks.tasks.filter(
        (task) => task.due && task.due >= dateOnly && !task.submit
      ).length;
      const todoCount = context.tasks.tasks.filter(
        (task) => !task.due && !task.submit
      ).length;

      setTaskSum([
        { name: "To do", value: todoCount, color: "#536DFE" },
        { name: "In Progress", value: inProgressCount, color: "#FFC35F" },
        { name: "Submitted", value: submittedCount, color: "#3CD4A0" },
        { name: "Overdue", value: overdueCount, color: "#FF5C93" },
      ]);
    }
  }, [context.tasks]);

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
            <Widget title={t("profile.masteryRadar")} noBodyPadding>
              <Suspense fallback={<Typography sx={{ textAlign: "center", py: 4 }}>Loading...</Typography>}>
                <ReactApexChart
                  options={themeOptions(theme).options_radar}
                  series={state.mastery}
                  type="radar"
                  height="356"
                />
              </Suspense>
            </Widget>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <Widget title={t("profile.errorRate")} noBodyPadding>
              <Suspense fallback={<Typography sx={{ textAlign: "center", py: 4 }}>Loading...</Typography>}>
                <ReactApexChart
                  options={themeOptions(theme).options_bar}
                  series={state.errorBar}
                  type="bar"
                  height="356"
                />
              </Suspense>
            </Widget>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <Widget bodyClass={classes.tableWrapper}>
              <Typography variant="h6">
                {t("profile.forgettingRisk")}
              </Typography>
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
                {t("profile.prereqNeed")}
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
                {t("profile.coverageNeed")}
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
            <Widget title={t("profile.tasks")} bodyClass={classes.widgetBody}>
              <Tasks items={taskList} />
            </Widget>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
            <Widget>
              <Calendar items={taskList} />
            </Widget>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <Widget
              bodyClass={classes.mediaBlockPadding}
              title={t("profile.achievement")}
            >
              <Grid container spacing={1}>
                <Achievement items={achSum} />
              </Grid>
            </Widget>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
            <Widget
              className={classes.adjustHeight}
              title={t("profile.overview")}
            >
              <Donut items={taskSum} total={100} />
            </Widget>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

// #######################################################################

export default Profile;
