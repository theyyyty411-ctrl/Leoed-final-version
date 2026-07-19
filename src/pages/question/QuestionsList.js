import React, { useEffect } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableHead,
  IconButton,
  Checkbox,
  TableSortLabel,
  Tooltip,
  Toolbar,
  CircularProgress,
  Box,
  InputAdornment,
  TextField as Input,
} from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

//config
import config from "../../config";

// Material UI icons
import {
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { lighten } from "@mui/material/styles";
import { makeStyles } from "styles/mui";
import PropTypes from "prop-types";
import useStyles from "./styles";
import cn from "classnames";

//context
import {
  useQuestionsState,
  getQuestionsRequest,
  deleteQuestionRequest,
} from "../../context/QuestionContext";

// components
import Widget from "../../components/Widget";
import { Typography, Button, Link } from "../../components/Wrappers";
// import Notification from "../../components/Notification";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
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
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID",
  },
  { id: "subject", numeric: true, disablePadding: false, label: "Subject" },
  { id: "topic", numeric: true, disablePadding: false, label: "Topic" },
  // { id: "grade", numeric: true, disablePadding: false, label: "Grade" },
  { id: "type", numeric: true, disablePadding: false, label: "Type" },
  { id: "question", numeric: true, disablePadding: false, label: "Question" },
  {
    id: "difficulty",
    numeric: true,
    disablePadding: false,
    label: "Difficulty",
  },
  // { id: "rating", numeric: true, disablePadding: false, label: "Rating" }
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all rows" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : null}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.mode === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = ({ numSelected, selected, onDeleteSelected }) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={cn(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
      style={{ marginTop: 8 }}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          <Button
            style={{ marginTop: -10, margin: -10 }}
            variant={"contained"}
            component={RouterLink}
            to={"/app/question/create"}
            color={"success"}
          >
            Create Question
          </Button>
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={(e) => onDeleteSelected(selected, e)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  onDeleteSelected: PropTypes.func.isRequired,
};

function QuestionPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const context = useQuestionsState();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [backQuestions, setBackQuestions] = React.useState(
    context.questions.questions || [],
  );

  useEffect(() => {
    // sendNotification();
    getQuestionsRequest(context.setQuestions);
  }, []);

  useEffect(() => {
    if (context.questions.questions) {
      setBackQuestions(context.questions.questions);
    }
  }, [context.questions.questions]);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const searchQuestions = (e) => {
    const questionsList = context.questions.questions || [];
    const questions = questionsList.filter((c) =>
      c.question.includes(e.currentTarget.value),
    );
    setBackQuestions(questions);
  };

  const openQuestion = (id, event) => {
    navigate(`/app/question/id/${id}`);
    event.stopPropagation();
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = backQuestions.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, backQuestions.length - page * rowsPerPage);

  // function sendNotification() {
  //   const componentProps = {
  //     type: "feedback",
  //     message:
  //       "This page is only available in React Material Admin Full with Node.js integration!",
  //     variant: "contained",
  //     color: "success"
  //   };
  //   const options = {
  //     type: "info",
  //     position: toast.POSITION.TOP_RIGHT,
  //     progressClassName: classes.progress,
  //     className: classes.notification,
  //     timeOut: 1000
  //   };
  //   return toast(
  //     <Notification
  //       {...componentProps}
  //       className={classes.notificationComponent}
  //     />,
  //     options
  //   );
  // }

  const deleteQuestion = (ids, event) => {
    const idArray = Array.isArray(ids) ? ids : [ids];
    idArray.forEach((id) => {
      deleteQuestionRequest({
        id,
        navigate,
        pathname: location.pathname,
        dispatch: context.setQuestions,
      });
    });
    event.stopPropagation();
  };

  const openQuestionEdit = (event, id) => {
    navigate(`/app/question/edit/${id}`);
    event.stopPropagation();
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
                    Questions
                  </Typography>
                  <Box alignSelf="flex-end" ml={1}>
                    <Typography
                      color="text"
                      colorBrightness={"hint"}
                      variant={"caption"}
                    >
                      {backQuestions.length} total
                    </Typography>
                  </Box>
                </Box>
                <Input
                  id="search-field"
                  className={classes.textField}
                  label="Search"
                  margin="dense"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon className={classes.searchIcon} />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => searchQuestions(e)}
                />
              </Box>
            }
          >
            {/* {config.isBackend ?
            <Button
              style={{ marginTop: -10 }}
              variant={"contained"}
              component={RouterLink}
              to={"/app/question/create"}
              color={"success"}>
              
                Create Question
              </Button> :

            <Button
              style={{ marginTop: -10 }}
              variant={"contained"}
              component={RouterLink}
              to={"#"}
              color={"success"}>
              
                  Create Question
                </Button>

            } */}
            <EnhancedTableToolbar
              numSelected={selected.length}
              selected={selected}
              onDeleteSelected={deleteQuestion}
            />

            {config.isBackend && !context.questions.isLoaded ? (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <CircularProgress size={26} />
              </Box>
            ) : (
              <div className={classes.tableWrapper}>
                <Table
                  className={classes.table}
                  aria-labelledby="tableTitle"
                  aria-label="enhanced table"
                >
                  <EnhancedTableHead
                    classes={classes}
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={backQuestions.length}
                  />

                  <TableBody>
                    {stableSort(backQuestions, getSorting(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            selected={isItemSelected}
                            key={row.id}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              align="center"
                            >
                              {row.id}
                            </TableCell>
                            <TableCell align="center">{row.subject}</TableCell>
                            <TableCell align="center">{row.topic}</TableCell>
                            {/* <TableCell>{row.grade}</TableCell> */}
                            <TableCell align="center">{row.type}</TableCell>
                            <TableCell padding="none">
                              <Link
                                component={"button"}
                                variant="body2"
                                onClick={(e) => openQuestion(row.id, e)}
                                color={"primary"}
                              >
                                <img
                                  src={"data:image/png;base64," + row.preview}
                                  alt={row.question}
                                  // style={{ width: '100%', height: '100%' }}
                                />
                              </Link>
                            </TableCell>
                            <TableCell align="center">
                              {row.difficulty}/10
                            </TableCell>
                            {/* <TableCell>
                                <Box display={"flex"} alignItems={"center"}>
                                  <Typography
                                style={{ color: yellow[700] }}
                                display={"inline"}>
                                
                                    {row.rating}
                                  </Typography>{" "}
                                  <StarIcon
                                style={{
                                  color: yellow[700],
                                  marginTop: -5
                                }} />
                              
                                </Box>
                              </TableCell> */}
                            {/*<TableCell>*/}
                            {/*  <Box display={"flex"}>*/}
                            {/*    <Box mr={1} alignSelf={"center"}>*/}
                            {/*      <Dot color={row.color} size={"medium"} />*/}
                            {/*    </Box>*/}
                            {/*    <Box mr={1}>*/}
                            {/*      <Typography variant={"subtitle2"}>*/}
                            {/*        {row.status}*/}
                            {/*      </Typography>*/}
                            {/*      <LinearProgress*/}
                            {/*        variant="determinate"*/}
                            {/*        value={+row.process.split("%")[0]}*/}
                            {/*      />*/}
                            {/*    </Box>*/}
                            {/*    <Box display={"flex"} alignSelf={"flex-end"}>*/}
                            {/*      <Typography*/}
                            {/*        color={"text"}*/}
                            {/*        colorBrightness={"hint"}*/}
                            {/*      >*/}
                            {/*        {row.process}*/}
                            {/*      </Typography>*/}
                            {/*    </Box>*/}
                            {/*  </Box>*/}
                            {/*</TableCell>*/}
                            <TableCell>
                              <Box display={"flex"} alignItems={"center"}>
                                {config.isBackend ? (
                                  <Button
                                    color="success"
                                    size="small"
                                    style={{ marginRight: 16 }}
                                    variant="contained"
                                    onClick={(e) => openQuestionEdit(e, row.id)}
                                  >
                                    Edit
                                  </Button>
                                ) : (
                                  <Button
                                    color="success"
                                    size="small"
                                    style={{ marginRight: 16 }}
                                    variant="contained"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    Edit
                                  </Button>
                                )}
                                <Button
                                  color="secondary"
                                  size="small"
                                  variant="contained"
                                  onClick={(e) => deleteQuestion(row.id, e)}
                                >
                                  Delete
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {/* {emptyRows > 0 &&
                    <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                    } */}
                  </TableBody>
                </Table>
              </div>
            )}
            <TablePagination
              rowsPerPageOptions={[25, 50, 100]}
              component="div"
              count={backQuestions.length}
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
}

export default QuestionPage;
