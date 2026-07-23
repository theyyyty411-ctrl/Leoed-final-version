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
import { executeGeminiDiagnostic } from "../../utils/gemini";

//components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import InputUploadTabs from "../../components/InputUploadTabs";
import { Typography, Button } from "../../components/Wrappers";

//context
import { getQuestionInfo } from "../../context/QuestionContext";

import { useParams, useNavigate } from "react-router-dom";

const Question = () => {
  const { id } = useParams();
  const questionId = Number(id);
  const classes = useStyles();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [row, setRow] = React.useState({ qlist: [] });
  const [initialSubmit, setInitialSubmit] = useState(null);
  const [initialResult, setInitialResult] = useState(null);


  useEffect(() => {
    if (questionId) {
      getQuestionInfo(questionId).then((data) => {
        if (data) {
          setRow(data);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);

  const canvasRef = useRef(null);


  const handleUploadJson = async (images = [], textInput = "", from = "input") => {
    setIsUploading(true);

    try {
      const jsonPayload = {
        from: from,
        type: "question",
        id: questionId,
        images,
        text_input: textInput,
        timestamp: new Date().toISOString(),
      };
contextQuestions = [row.question_ml || ""];
      const responseData = await executeGeminiDiagnostic(jsonPayload, contextQuestions);

      alert("Submission success!");
      // console.log("Server response data package:", responseData);
      setResult(responseData);
    } catch (error) {
      console.error("Gemini API processing error:", error);
      const serverMessage = error.message;
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
            <CardContent sx={{ position: "relative" }}>
              <Button
                color="success"
                size="small"
                variant="contained"
                onClick={(e) => openQuestionEdit(e, row.id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 1,
                }}
              >
                Edit
              </Button>
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
                  result={result}
                  initialSubmit={initialSubmit}
                  initialResult={initialResult}
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
