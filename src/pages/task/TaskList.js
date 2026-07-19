import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableHead,
  TableSortLabel,
  Box,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import useStyles from "./styles";

//components
import Widget from "../../components/Widget";
import { Typography, Button } from "../../components/Wrappers";

//context
import {
  useTasksState,
  getTasksRequest,
  createQuickTask,
} from "../../context/TaskContext";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "owner_id", numeric: false, disablePadding: false, label: "From" },
  { id: "createdAt", numeric: false, disablePadding: false, label: "Created" },
  { id: "due", numeric: false, disablePadding: false, label: "Due" },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: "bold", fontSize: "0.75rem" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const AntTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: `1px solid rgba(185, 185, 185, 0.3)`,
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 2,
  },
}));

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 72,
    fontSize: "14px",
    fontWeight: theme.typography.fontWeightMedium,
    marginRight: theme.spacing(4),
    color: theme.palette.text.primary,
    fontFamily: ["Roboto", "sans-serif"].join(","),
    "&:hover": {
      color: theme.palette.text.primary,
      opacity: 1,
    },
    "&.Mui-selected": {
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: theme.palette.text.primary,
    },
  }),
);

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toISOString().split("T")[0];
};

const Task = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const context = useTasksState();
  const [backTasks, setBackTasks] = React.useState(context.tasks.tasks || []);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("createdAt");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    getTasksRequest(context.setTasks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setBackTasks(context.tasks.tasks || []);
  }, [context.tasks]);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleTabChange = (event, index) => {
    setTabIndex(index);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dateOnly = new Date().toISOString().split("T")[0];

  const todoTasks = backTasks.filter(
    (task) => (!task.due || task.due >= dateOnly) && !task.submit,
  );
  const overdueTasks = backTasks.filter(
    (task) => task.due && task.due < dateOnly && !task.submit,
  );
  const submittedTasks = backTasks.filter((task) => task.submit);

  const tabItems = [todoTasks, overdueTasks, submittedTasks];
  const tabLabels = ["To do", "Overdue", "Submitted"];

  const currentItems = tabItems[tabIndex] || [];

  const handleQuickTask = () => {
    createQuickTask(context.setTasks);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Widget
            disableWidgetMenu
            header={
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
              >
                <Box display={"flex"} style={{ width: "calc(100% - 20px)" }}>
                  <Typography
                    variant="h6"
                    color="text"
                    colorBrightness={"secondary"}
                    noWrap
                  >
                    Tasks
                  </Typography>
                  <Box alignSelf="flex-end" ml={1}>
                    <Typography
                      color="text"
                      colorBrightness={"hint"}
                      variant={"caption"}
                    >
                      {backTasks.length} total
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={handleQuickTask}
                    sx={{ ml: "auto" }}
                  >
                    Quick Task
                  </Button>
                </Box>
              </Box>
            }
          >
            <AntTabs value={tabIndex} onChange={handleTabChange} sx={{ px: 2 }}>
              <AntTab label={`To do (${todoTasks.length})`} />
              <AntTab label={`Overdue (${overdueTasks.length})`} />
              <AntTab label={`Submitted (${submittedTasks.length})`} />
            </AntTabs>
            <div className={classes.tableWrapper}>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                aria-label="tasks table"
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {stableSort(currentItems, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow
                        hover
                        key={row.id}
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate(`/app/learning/task/${row.id}`)}
                      >
                        <TableCell align="center">
                          {row.name || `Task ${row.id}`}
                        </TableCell>
                        <TableCell align="center">
                          {row.owner_name || "-"}
                        </TableCell>
                        <TableCell align="center">
                          {formatDate(row.createdAt)}
                        </TableCell>
                        <TableCell align="center">
                          {formatDate(row.due)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={currentItems.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                previousButton: { "aria-label": "previous page" },
                nextButton: { "aria-label": "next page" },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default Task;
