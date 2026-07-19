import React, { useRef, useState, useEffect } from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Star as StarIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import useStyles from "./styles";
import { yellow } from "@mui/material/colors";

import axios from "axios";
import config from "../../config";

//components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import InputUploadTabs from "../../components/InputUploadTabs";
import { Typography, Button } from "../../components/Wrappers";

//context
import {
  useQuestionsState,
  getQuestionsRequest,
} from "../../context/QuestionContext";

import { useParams, useNavigate } from "react-router-dom";

const Question = () => {
  const { id } = useParams();
  const questionId = Number(id);
  const classes = useStyles();
  const navigate = useNavigate();

  const context = useQuestionsState();
  const [backQuestions, setBackQuestions] = React.useState(
    context.questions.questions,
  );

  useEffect(() => {
    getQuestionsRequest(context.setQuestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setBackQuestions(context.questions.questions);
  }, [context.questions]);

  const row = React.useMemo(() => {
    if (!Number.isNaN(questionId)) {
      const rowfind = backQuestions.find((c) => c.id === questionId);
      if (rowfind) {
        return rowfind;
      }
    }
    return {
      id: 2,
      subject: "Math",
      topic: "Topic",
      subtopic: "Subtopic",
      grade: "1",
      type: "op",
      question: "",
      question_ml: "",
      options: null,
      answer: "",
      answer_ml: "",
      difficulty: "1",
      rating: "",
      preview: "",
      stat: "",
    };
  }, [backQuestions, questionId]);

  const canvasRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadFiles = async (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("Image", files[i]);
    }
    formData.append("title", "User Sketch Pad Artwork");
    formData.append("format", "png");
    formData.append("timestamp", new Date().toISOString());

    setIsUploading(true);

    try {
      const response = await axios.post(
        `${config.baseURLApi}/execute/diagnostic`,
        formData,
      );

      alert("form image uploaded successfully!");
      console.log("Server response data package:", response.data);
    } catch (error) {
      console.error("Axios transmission processing error:", error);
      const serverMessage = error.response?.data?.message || error.message;
      alert(`Upload failed: ${serverMessage}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadJson = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsUploading(true);

    try {
      const base64DataUrl = canvas.toDataURL("image/png");
      const rawBase64String = base64DataUrl.split(",")[1];

      const jsonPayload = {
        title: "User Sketch Pad Artwork",
        format: "png",
        image_data: rawBase64String,
        timestamp: new Date().toISOString(),
      };

      const response = await axios.post(
        `${config.baseURLApi}/execute/diagnostic`,
        jsonPayload,
      );

      alert("Base64 image uploaded successfully!");
      console.log("Server response data package:", response.data);
    } catch (error) {
      console.error("Axios transmission processing error:", error);
      const serverMessage = error.response?.data?.message || error.message;
      alert(`Upload failed: ${serverMessage}`);
    } finally {
      setIsUploading(false);
    }
  };

  const openQuestionEdit = (event, id) => {
    navigate(`/app/question/edit/${id}`);
    event.stopPropagation();
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 12, lg: 6 }}>
          {/* <Widget disableWidgetMenu title="Question" size={12} noBodyPadding></Widget> */}
          <Card className={classes.card}>
            <CardContent>
              <Box
                sx={{
                  fontFamily: '"Cambria Math", "Latin Modern Math", "STIX"',
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                  },
                }}
                dangerouslySetInnerHTML={{
                  __html: row.question_ml,
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Widget disableWidgetMenu inheritHeight size={12} noBodyPadding>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="answer-content"
                id="answer-header"
              >
                <Typography>INPUT</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0 }}>
                <InputUploadTabs
                  canvasRef={canvasRef}
                  isUploading={isUploading}
                  onUploadJson={handleUploadJson}
                  onUploadFiles={handleUploadFiles}
                  textFieldDefaultValue=""
                />
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="answer-content"
                id="answer-header"
              >
                <Typography>ANSWER</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  sx={{
                    fontFamily: '"Cambria Math", "Latin Modern Math", "STIX"',
                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                    },
                  }}
                  dangerouslySetInnerHTML={{
                    __html: row.answer_ml,
                  }}
                />
              </AccordionDetails>
            </Accordion>
            {/* <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="rubric-content"
                id="rubric-header">                      
                <Typography>RUBRIC</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ fontFamily: '"Cambria Math", "Latin Modern Math", "STIX"', fontSize: {
                  xs: '0.8rem',
                  sm: '1rem',
                } }}
                  dangerouslySetInnerHTML={{
                    __html: row.rubric}} 
                />
              </AccordionDetails>
            </Accordion> */}
          </Widget>
        </Grid>

        <Grid size={12}>
          {/* <Widget disableWidgetMenu title="Info"> */}
          <Widget disableWidgetMenu>
            <Button
              color="success"
              size="small"
              style={{ marginRight: 16 }}
              variant="contained"
              onClick={(e) => openQuestionEdit(e, row.id)}
            >
              Edit
            </Button>
            <Grid container>
              <Grid size={12}>
                <Grid container spacing={2}>
                  {/* <Grid container direction={"column"} size={{ xs: 12, md: 4 }}>
                    <Typography variant="h5" style={{ marginBottom: 16 }}>
                      DESCRIPTION
                    </Typography>
                    <Typography>
                      {row.description}
                    </Typography>
                  </Grid> */}
                  <Grid
                    container
                    direction={"column"}
                    justify={"space-between"}
                    size={{ xs: 12, md: 4 }}
                  >
                    <Box>
                      <Typography variant="h5" style={{ marginBottom: 16 }}>
                        SUBJECT
                      </Typography>
                      <p>{row.subject}</p>
                    </Box>
                    <Box>
                      <Typography variant="h5" style={{ marginBottom: 16 }}>
                        TOPIC
                      </Typography>
                      <p>{row.topic}</p>
                    </Box>
                    {/* <Box>
                      <Typography variant="h5" style={{ marginBottom: 16 }}>
                        GRADE
                      </Typography>
                      <p>{row.grade}</p>
                    </Box> */}
                    <Box>
                      <Typography variant="h5" style={{ marginBottom: 16 }}>
                        TYPE
                      </Typography>
                      <p>{row.type}</p>
                    </Box>
                  </Grid>
                  <Grid container direction={"column"} size={{ xs: 12, md: 4 }}>
                    <Box>
                      <Typography variant="h5" style={{ marginBottom: 16 }}>
                        DIFFICULTY
                      </Typography>
                      <Typography weight={"bold"} sx={{ mx: 2 }}>
                        {row.difficulty}/10
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h5" style={{ marginBottom: 16 }}>
                        RATING & STAT
                      </Typography>
                      <div style={{ fontSize: "1.5rem", color: yellow[700] }}>
                        {row.rating}
                        <StarIcon
                          style={{ color: yellow[700], marginTop: -5 }}
                        />
                      </div>
                    </Box>
                    {/* <Box display="flex" alignItems={"center"}>

                      <FormControl
                        variant="outlined"
                        className={classes.form}
                        style={{ marginRight: 15 }}>                      
                        <InputLabel htmlFor="difficulty-simple">
                          Difficulty
                        </InputLabel>
                        <Select
                          value={difficulty}
                          onChange={handleChangeDifficulty}
                          label="Select difficulty"
                          inputProps={{
                            name: "difficulty",
                            id: "difficulty-simple"
                          }}
                          className={classes.denseSelect}>
                          
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl
                        variant="outlined"
                        className={classes.form}
                        style={{ marginRight: 15 }}>
                        
                        <InputLabel htmlFor="rating-simple">
                          Rating
                        </InputLabel>
                        <Select
                          value={rating}
                          onChange={handleChangeRating}
                          label="Select rating"
                          inputProps={{
                            name: "rating",
                            id: "rating-simple"
                          }}
                          className={classes.denseSelect}>
                          
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                        </Select>
                      </FormControl>                
                    </Box> */}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
      </Grid>
      <PageTitle title="You may also like" />
      {/* <Grid size={12}>
        <Box display="flex" flexWrap="wrap">
          <Box flexGrow={1} mr={3} mb={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={img1}
                  title={rows[0].title} />
                
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {rows[0].title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {rows[0].subtitle}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                style={{ display: "flex", justifyContent: "space-between" }}>
                
                <Typography variant="body2" component="p">
                  ${rows[0].price}
                </Typography>
                <div style={{ color: yellow[700], display: 'flex', alignItems: 'center' }}>
                  {rows[0].rating}
                  <StarIcon style={{ color: yellow[700], marginLeft: 5 }} />
                </div>
              </CardActions>
            </Card>
          </Box>
          <Box flexGrow={1} mr={3} mb={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={img2}
                  title={rows[1].img} />
                
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {rows[1].title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {rows[1].subtitle}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                style={{ display: "flex", justifyContent: "space-between" }}>
                
                <Typography variant="body2" component="p">
                  ${rows[1].price}
                </Typography>
                <div style={{ color: yellow[700], display: 'flex', alignItems: 'center' }}>
                  {rows[1].rating}
                  <StarIcon style={{ color: yellow[700], marginLeft: 5 }} />
                </div>
              </CardActions>
            </Card>
          </Box>
          <Box flexGrow={1} mr={3} mb={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={img3}
                  title={rows[2].img} />
                
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {rows[2].title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {rows[2].subtitle}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                style={{ display: "flex", justifyContent: "space-between" }}>
                
                <Typography variant="body2" component="p">
                  ${rows[2].price}
                </Typography>
                <div style={{ color: yellow[700], display: 'flex', alignItems: 'center' }}>
                  {rows[2].rating}
                  <StarIcon style={{ color: yellow[700], marginLeft: 5 }} />
                </div>
              </CardActions>
            </Card>
          </Box>
          <Box flexGrow={1} mb={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={img4}
                  title={rows[3].img} />
                
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {rows[3].title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {rows[3].subtitle}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                style={{ display: "flex", justifyContent: "space-between" }}>
                
                <Typography variant="body2" component="p">
                  ${rows[3].price}
                </Typography>
                <div style={{ color: yellow[700], display: 'flex', alignItems: 'center' }}>
                  {rows[3].rating}
                  <StarIcon style={{ color: yellow[700], marginLeft: 5 }} />
                </div>
              </CardActions>
            </Card>
          </Box>
        </Box>
      </Grid> */}
    </>
  );
};

export default Question;
