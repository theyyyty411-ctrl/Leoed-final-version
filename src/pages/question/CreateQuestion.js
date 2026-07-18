import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField as Input,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";

//context
import {
  getQuestionsRequest,
  useQuestionsState,
  updateQuestion,
  createQuestion,
  // getQuestionsImages
} from "../../context/QuestionContext";

//components
import Widget from "../../components/Widget";
import { Typography, Button } from "../../components/Wrappers";
import config from "../../config";

import useStyles from "./styles";

const CreateQuestion = () => {
  const classes = useStyles();
  const fileInput = React.useRef(null);
  const { id } = useParams();
  const context = useQuestionsState();

  const getId = (id) => {
    return context.questions.questions.findIndex((c) => {
      return c.id == id;
    });
  };

  const [localQuestions, setLocalQuestions] = React.useState(
    context.questions.questions[getId(id)],
  );

  const [newQuestion, setNewQuestion] = React.useState({
    subject: "math",
    topic: "Topic",
    subtopic: "Subtopic",
    // grade: "y1",
    type: "op",
    question: "",
    answer: "",
    // rubric: "",
    // description: "",
    difficulty: 1,
    // rating: 1,
    // hashtag: "",
    // stat: ""
  });

  // function sendNotification() {
  //   const componentProps = {
  //     type: "feedback",
  //     message: "Question has been Updated!",
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

  useEffect(() => {
    getQuestionsRequest(context.setQuestions);
    // getQuestionsImages(context.setQuestions);
  }, []);

  useEffect(() => {
    setLocalQuestions(context.questions.questions[getId(id)]);
  }, [context]);

  const navigate = useNavigate();
  const location = useLocation();

  const fields = JSON.parse(localStorage.getItem("fields"));

  const editQuestion = (e) => {
    setLocalQuestions({
      ...localQuestions,
      [e.target.id]: e.currentTarget.value,
    });
  };

  const editNewQuestion = (e) => {
    setNewQuestion({
      ...newQuestion,
      [e.target.id]: e.currentTarget.value,
    });
  };

  const getEditQuestion = () => {
    updateQuestion(localQuestions, context.setQuestions);
    navigate("/app/question");
    // sendNotification();
  };

  const createNewQuestion = () => {
    createQuestion(newQuestion, context.setQuestions);
    navigate("/app/question");
  };

  const changeField = (e, field) => {
    if (isCreateQuestion) {
      setNewQuestion({ ...newQuestion, [field]: e.target.value });
    } else {
      setLocalQuestions({ ...localQuestions, [field]: e.target.value });
    }
  };

  const isCreateQuestion = location.pathname === "/app/question/create";

  const handleFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      createQuestion({ ...newQuestion, file: result }, context.setQuestions);
      navigate("/app/question");
    };
    reader.readAsDataURL(file);
    return null;
  };

  return (
    <>
      <Grid container spacing={3}>
        {/*<ToastContainer*/}
        {/*  className={classes.toastsContainer}*/}
        {/*  closeButton={*/}
        {/*    <CloseButton className={classes.notificationCloseButton} />*/}
        {/*  }*/}
        {/*  closeOnClick={false}*/}
        {/*  progressClassName={classes.notificationProgress}*/}
        {/*/>*/}
        <Grid size={12}>
          <Widget
            title={isCreateQuestion ? "New question" : "Edit question"}
            disableWidgetMenu
          >
            {config.isBackend && !context.questions.isLoaded ? (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <CircularProgress size={26} />
              </Box>
            ) : (
              <Box display={"flex"} flexDirection="column">
                <Box display={"flex"} alignItems={"center"}>
                  <Box width={120}>
                    <Typography variant={"h6"}>Subject</Typography>
                  </Box>
                  <Box width={280}>
                    <Select
                      id="subject"
                      style={{ alignSelf: "flex-end" }}
                      value={
                        isCreateQuestion
                          ? newQuestion.subject
                          : localQuestions.subject
                      }
                      onChange={(e) => changeField(e, "subject")}
                    >
                      {fields.subject.map((c) =>
                        c.type === "divider" ? (
                          <Divider key={c.value} />
                        ) : (
                          <MenuItem value={c.value} key={c.value}>
                            {c.label}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </Box>
                  <Box width={120} sx={{ pl: 2 }}>
                    <Typography variant={"h6"}>Type</Typography>
                  </Box>
                  <Box width={280}>
                    <Select
                      id="type"
                      style={{ alignSelf: "flex-end" }}
                      value={
                        isCreateQuestion
                          ? newQuestion.type
                          : localQuestions.type
                      }
                      onChange={(e) => changeField(e, "type")}
                    >
                      {fields.type.map((c) =>
                        c.type === "divider" ? (
                          <Divider key={c.value} />
                        ) : (
                          <MenuItem value={c.value} key={c.value}>
                            {c.label}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </Box>
                  <Box width={120}>
                    <Typography variant={"h6"}>Difficulty</Typography>
                  </Box>
                  <Box width={90}>
                    <Input
                      id="difficulty"
                      value={
                        isCreateQuestion
                          ? newQuestion.difficulty
                          : localQuestions.difficulty
                      }
                      type={"number"}
                      fullWidth
                      onChange={(e) =>
                        isCreateQuestion ? editNewQuestion(e) : editQuestion(e)
                      }
                    />
                  </Box>
                  {/* <Box width={120} sx={{ pl: 2 }}>
                    <Typography variant={"h6"}>Grade</Typography>
                  </Box>
                  <Box width={200}>
                    <Select
                      id="grade"
                      style={{ alignSelf: 'flex-end' }}
                      value={
                      isCreateQuestion ? newQuestion.grade : localQuestions.grade
                      }
                      onChange={(e) => changeField(e, 'grade')}>                      
                      {fields.grade.map((c) =>
                      c.type === "divider" ?
                      <Divider key={c.value} /> :
                      <MenuItem value={c.value} key={c.value}>{c.label}</MenuItem>
                      )}
                    </Select>
                  </Box>                                     */}
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Box width={120}>
                    <Typography variant={"h6"}>Topic</Typography>
                  </Box>
                  {/* <Input
                    id="outlined-basic"
                    label="Topic"
                    onChange={(e) =>
                    isCreateQuestion ? editNewQuestion(e) : editQuestion(e)
                    }
                    name="topic"
                    value={isCreateQuestion ? newQuestion.topic : localQuestions.topic || ''}
                    variant="outlined"
                    style={{ marginBottom: 35 }}
                    helperText="Enter topic" /> */}
                  <Box width={280}>
                    <Input
                      id="topic"
                      margin="normal"
                      variant="outlined"
                      value={
                        isCreateQuestion
                          ? newQuestion.topic
                          : localQuestions.topic
                      }
                      name="topic"
                      fullWidth
                      onChange={(e) =>
                        isCreateQuestion ? editNewQuestion(e) : editQuestion(e)
                      }
                    />
                  </Box>
                  <Box width={120} sx={{ pl: 2 }}>
                    <Typography variant={"h6"}>Subtopic</Typography>
                  </Box>
                  <Box width={600}>
                    <Input
                      id="subtopic"
                      margin="normal"
                      variant="outlined"
                      value={
                        isCreateQuestion
                          ? newQuestion.subtopic
                          : localQuestions.subtopic
                      }
                      fullWidth
                      onChange={(e) =>
                        isCreateQuestion ? editNewQuestion(e) : editQuestion(e)
                      }
                    />
                  </Box>
                </Box>
                {/* <Box display={"flex"} alignItems={"center"}>
                  <Box width={120} >
                    <Typography variant={"h6"}>Difficulty</Typography>
                  </Box>
                  <Box width={90}>
                    <Input
                    id="difficulty"
                    margin="normal"
                    variant="outlined"
                    value={
                    isCreateQuestion ? newQuestion.difficulty : localQuestions.difficulty
                    }
                    type={"number"}
                    fullWidth
                    onChange={(e) =>
                    isCreateQuestion ? editNewQuestion(e) : editQuestion(e)
                    } />
                  
                  </Box>
                  <Box width={100} sx={{ pl: 2 }}>
                    <Typography variant={"h6"}>Rating</Typography>
                  </Box>                  
                  <Box width={90}>
                    <Input
                    id="rating"
                    margin="normal"
                    variant="outlined"
                    value={
                    isCreateQuestion ? newQuestion.rating : localQuestions.rating
                    }
                    type={"number"}
                    fullWidth
                    onChange={(e) =>
                    isCreateQuestion ? editNewQuestion(e) : editQuestion(e)
                    } />
                  
                  </Box>    
                  <Box width={120} sx={{ pl: 2 }}>
                    <Typography variant={"h6"}>Hashtag</Typography>
                  </Box>
                  <Box width={600}>
                    <Input
                    id="hashtag"
                    margin="normal"
                    variant="outlined"
                    value={
                    isCreateQuestion ?
                    newQuestion.hashtag :
                    localQuestions.hashtag
                    }
                    fullWidth
                    onChange={(e) =>
                    isCreateQuestion ? editNewQuestion(e) : editQuestion(e)
                    } />
                  
                  </Box>                                
                </Box>                 */}
                <Box display={"flex"} alignItems={"center"}>
                  <Box width={120}>
                    <Typography variant={"h6"}>Question</Typography>
                  </Box>
                  <Box width={500} sx={{ pr: 1 }}>
                    <Input
                      id="question"
                      margin="normal"
                      variant="outlined"
                      multiline
                      minRows={3}
                      maxRows={6}
                      value={
                        isCreateQuestion
                          ? newQuestion.question
                          : localQuestions.question
                      }
                      fullWidth
                      onChange={(e) =>
                        isCreateQuestion ? editNewQuestion(e) : editQuestion(e)
                      }
                    />
                  </Box>
                  <Box width={500}>
                    <Box
                      sx={{
                        p: 1,
                        fontFamily:
                          '"Cambria Math", "Latin Modern Math", "STIX"',
                        border: "1px dashed",
                        borderColor: "primary.main",
                        borderRadius: 1,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: isCreateQuestion
                          ? newQuestion.question
                          : localQuestions.question,
                      }}
                    />
                  </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Box width={120}>
                    <Typography variant={"h6"}>Answer</Typography>
                  </Box>
                  <Box width={500} sx={{ pr: 1 }}>
                    <Input
                      id="answer"
                      margin="normal"
                      variant="outlined"
                      value={
                        isCreateQuestion
                          ? newQuestion.answer
                          : localQuestions.answer
                      }
                      fullWidth
                      onChange={(e) =>
                        isCreateQuestion ? editNewQuestion(e) : editQuestion(e)
                      }
                    />
                  </Box>
                  <Box width={500}>
                    <Box
                      sx={{
                        p: 1,
                        fontFamily:
                          '"Cambria Math", "Latin Modern Math", "STIX"',
                        border: "1px dashed",
                        borderColor: "primary.main",
                        borderRadius: 1,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: isCreateQuestion
                          ? newQuestion.answer
                          : localQuestions.answer,
                      }}
                    />
                  </Box>
                </Box>
                {/* <Box display={"flex"} alignItems={"center"}>
                  <Box width={120}>
                    <Typography variant={"h6"}>Rubric</Typography>
                  </Box>
                  <Box width={1000}>
                    <Input
                    id="rubric"
                    margin="normal"
                    variant="outlined"
                    value={
                    isCreateQuestion ? newQuestion.rubric : localQuestions.rubric
                    }
                    fullWidth
                    onChange={(e) =>
                    isCreateQuestion ? editNewQuestion(e) : editQuestion(e)
                    } />
                  </Box>
                </Box>
                <Box display={"flex"} alignItems={"center"}>
                  <Box width={120}>
                    <Typography variant={"h6"}>Description</Typography>
                  </Box>
                  <Box width={1000}>
                    <Input
                    id="description"
                    margin="normal"
                    variant="outlined"
                    value={
                    isCreateQuestion ? newQuestion.description : localQuestions.description
                    }
                    fullWidth
                    onChange={(e) =>
                    isCreateQuestion ? editNewQuestion(e) : editQuestion(e)
                    } />
                  
                  </Box>
                </Box> */}
                <Box display={"flex"} alignItems={"center"}>
                  <Button
                    variant={"contained"}
                    color={"success"}
                    style={{ marginRight: 8 }}
                    onClick={() =>
                      isCreateQuestion ? createNewQuestion() : getEditQuestion()
                    }
                  >
                    {isCreateQuestion ? "Save" : "Edit"}
                  </Button>
                  <Button
                    variant={"contained"}
                    style={{ marginRight: 8 }}
                    onClick={() => navigate("/app/question")}
                  >
                    Back
                  </Button>
                  {isCreateQuestion ? (
                    <label
                      className={classes.uploadLabel}
                      style={{ cursor: "pointer" }}
                    >
                      {"Batch Create"}
                      <input
                        style={{ display: "none" }}
                        accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet/*"
                        type="file"
                        ref={fileInput}
                        onChange={handleFile}
                      />
                    </label>
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
            )}
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateQuestion;
