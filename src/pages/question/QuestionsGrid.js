// import React from "react";
import React, { useEffect, useMemo } from "react";
import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import { Star as StarIcon } from "@mui/icons-material";
import { yellow } from "@mui/material/colors";
import Masonry from "@mui/lab/Masonry";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import useStyles from "./styles";

//context
import {
  useQuestionsState,
  getQuestionsRequest,
  QuestionsContext,
} from "../../context/QuestionContext";

//components
import { Typography, Chip } from "../../components/Wrappers";

//questions array
// import { rows } from "./mock";

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

const Question = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const location = useLocation();
  const context = useQuestionsState();
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [backQuestions, setBackQuestions] = React.useState(
    context.questions.questions,
  );

  useEffect(() => {
    // sendNotification();
    getQuestionsRequest(context.setQuestions);
  }, []);

  useEffect(() => {
    setBackQuestions(context.questions.questions);
  }, [context]);

  const openQuestion = (id, event) => {
    navigate(`/app/question/id/${id}`);
    event.stopPropagation();
  };

  const selectReducer = (state, action) => {
    switch (action.type) {
      case "SELECT_SUBJECT":
        return {
          ...state,
          valueSubject: action.valueSubject,
        };
      // case "SELECT_GRADE":
      //   return {
      //     ...state,
      //     valueGrade: action.valueGrade
      //   };
      case "SELECT_TYPE":
        return {
          ...state,
          valueType: action.valueType,
        };
      case "SELECT_SORT":
        if (action.valueSort === "reverse") {
          setOrder("asc");
        } else {
          setOrder("desc");
          setOrderBy(action.valueSort);
        }
        // console.log(action.valueSort,orderBy,order)
        return {
          ...state,
          valueSort: action.valueSort,
        };
      default:
        return {
          ...state,
        };
    }
  };

  const [state, dispatch] = React.useReducer(selectReducer, {
    valueSubject: "",
    // valueGrade: "",
    valueType: "",
    valueSort: "",
  });

  const fields = JSON.parse(localStorage.getItem("fields"));

  const filteredRows = useMemo(() => {
    return backQuestions.filter((c) => {
      const matchesSubject =
        state.valueSubject === "" || c.subject === state.valueSubject;
      // const matchesGrade = state.valueGrade === '' || c.grade === state.valueGrade;
      const matchesType = state.valueType === "" || c.type === state.valueType;
      return matchesSubject && matchesType;
      // return matchesSubject && matchesGrade && matchesType;
    });
  }, [state]);

  // console.log(state);

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box display="flex">
            <FormControl
              variant="outlined"
              className={classes.form}
              style={{ marginRight: 15 }}
            >
              <InputLabel htmlFor="subject_select">Subject</InputLabel>
              <Select
                value={state.valueSubject}
                onChange={(e) =>
                  dispatch({
                    type: "SELECT_SUBJECT",
                    valueSubject: e.target.value,
                  })
                }
                label="Subject"
                inputProps={{
                  name: "subject",
                  id: "subject_select",
                }}
              >
                {fields.subject.map((c) => (
                  <MenuItem value={c.value} key={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <FormControl
              variant="outlined"
              className={classes.form}
              style={{ marginRight: 15 }}>
              
              <InputLabel htmlFor="grade_select">
                Grade
              </InputLabel>
              <Select
                value={state.valueGrade}
                onChange={(e) =>
                dispatch({
                  type: "SELECT_GRADE",
                  valueGrade: e.target.value
                })
                }
                label="Grade"
                inputProps={{
                  name: "grade",
                  id: "grade_select"
                }}>                
                {fields.grade.map((c) =>
                <MenuItem value={c.value} key={c.value}>{c.label}</MenuItem>
                )}
              </Select>
            </FormControl> */}
            <FormControl
              variant="outlined"
              className={classes.form}
              style={{ marginRight: 15 }}
            >
              <InputLabel htmlFor="type_select">Type</InputLabel>
              <Select
                value={state.valueType}
                onChange={(e) =>
                  dispatch({ type: "SELECT_TYPE", valueType: e.target.value })
                }
                label="Type"
                inputProps={{
                  name: "type",
                  id: "type_select",
                }}
              >
                {fields.type.map((c) => (
                  <MenuItem value={c.value} key={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl
              variant="outlined"
              className={classes.form}
              style={{ marginRight: 15 }}
            >
              <InputLabel htmlFor="sort_select">Sort</InputLabel>
              <Select
                value={state.valueSort}
                onChange={(e) =>
                  dispatch({ type: "SELECT_SORT", valueSort: e.target.value })
                }
                label="Sort"
                inputProps={{
                  name: "sort",
                  id: "sort_select",
                }}
              >
                <MenuItem value={"id"}>Latest</MenuItem>
                <MenuItem value={"difficulty"}>Difficulty</MenuItem>
                <MenuItem value={"rating"}>Rating</MenuItem>
                <MenuItem value={"reverse"}>Reverse</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid size={12}>
          {/* <Box display={"flex"} flexWrap={"wrap" }> */}
          <Box>
            {/* <Grid container spacing={2}
            display='flex'
          flexWrap= 'wrap'> */}
            <Masonry
              columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }} // Responsive columns
              spacing={2} // Controls both row and column gaps
            >
              {stableSort(filteredRows, getSorting(order, orderBy)).map(
                (c, index) => (
                  // {rows.map((c) =>
                  <Grid
                    key={c.id}
                    size={{ xs: 12, md: 6, lg: 4, xl: 3 }}
                    height="auto"
                  >
                    <Card className={classes.card}>
                      <CardActionArea onClick={(e) => openQuestion(c.id, e)}>
                        <CardContent>
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {c.topic}
                          </Typography>
                          <Box
                            sx={{
                              fontFamily:
                                '"Cambria Math", "Latin Modern Math", "STIX"',
                            }}
                            dangerouslySetInnerHTML={{
                              __html: c.question_ml,
                            }}
                          />
                        </CardContent>
                      </CardActionArea>
                      <CardActions style={{ padding: 16 }}>
                        <Box
                          display={"flex"}
                          justifyContent={"space-between"}
                          alignItems="center"
                          width={"100%"}
                        >
                          <Typography weight={"bold"} sx={{ mx: 2 }}>
                            {c.difficulty}/10
                          </Typography>
                          <Typography block sx={{ mx: 2 }}>
                            <div style={{ color: yellow[700] }}>
                              {c.rating}
                              <StarIcon
                                style={{ color: yellow[700], marginTop: -5 }}
                              />
                            </div>
                          </Typography>
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
                ),
              )}
              {/* </Grid> */}
            </Masonry>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Question;
