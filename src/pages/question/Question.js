// import React from "react";
import React, { useRef, useState, useEffect } from "react";
import {
  Grid,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  TextField,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  Star as StarIcon,
  StarBorder as StarOutlinedIcon,
  ShoppingCart as ShoppingCartIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Phone as PhoneIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import useStyles from "./styles";
import { yellow } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import PaletteIcon from "@mui/icons-material/Palette";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import axios from "axios";
import config from "../../config";

//components
import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography, Link, Button } from "../../components/Wrappers";

//context
import {
  useQuestionsState,
  getQuestionsRequest,
  QuestionsContext,
  getQuestionInfo,
} from "../../context/QuestionContext";

import { useParams, useNavigate } from "react-router-dom";

let row = {
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
  // "rubric":"",
  // "description":"",
  difficulty: "1",
  // "rating":"1",
  // "hashtag":"",
  preview: "",
  stat: "",
};

const Question = () => {
  const { id } = useParams();
  const questionId = Number(id);
  const classes = useStyles();
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const [difficulty, setDifficulty] = React.useState("");
  const handleChangeDifficulty = (event) => {
    setDifficulty(event.target.value);
  };
  const [rating, setRating] = React.useState("");
  const handleChangeRating = (event) => {
    setRating(event.target.value);
  };
  const context = useQuestionsState();
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

  if (!Number.isNaN(questionId)) {
    const rowfind = backQuestions.find((c) => c.id === questionId);
    if (rowfind) {
      row = rowfind;
    }
  }
  // console.log(row);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  function handleSubmit() {}

  // console.log('reset');

  const canvasRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  // FIX 1: Track drawing state via useRef so mutating it causes ZERO re-renders
  const isDrawingRef = useRef(false);

  // Brush size can stay in React state because it is only adjusted via the UI slider
  // const [brushSize, setBrushSize] = useState(5);

  const brushSize = 1;

  // Initialize Canvas config properties on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#3f51b5"; // MUI Primary Color
    ctx.lineWidth = brushSize;
  }, []);

  // Update brush size when state changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.lineWidth = brushSize;
  }, [brushSize]);

  const getScaledCoordinates = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();

    // Calculate scaling factors between internal resolution and screen size
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // Multiply the relative mouse position by the scale factor

    if (e.touches && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isDrawingRef.current = true;
    ctx.beginPath();

    // Get exact scaled coordinate position
    const coords = getScaledCoordinates(e, canvas);
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get exact scaled coordinate position
    const coords = getScaledCoordinates(e, canvas);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    // FIX 4: Releasing the mouse alters the reference.
    // Component rendering is completely skipped on mouse up!
    isDrawingRef.current = false;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.beginPath(); // Safely reset path connection
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // NEW: Axios & Base64 JSON Payload Handler
  const handleUploadJson = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsUploading(true);

    try {
      // 1. Convert pixels into a Base64 encoded string format
      // Note: This returns data:image/png;base64,iVBORw0KGgoAAAANS...
      const base64DataUrl = canvas.toDataURL("image/png");

      // OPTIONAL: If your server strictly demands ONLY the raw base64 string
      // without the "data:image/png;base64," metadata prefix, split it here:
      const rawBase64String = base64DataUrl.split(",")[1];

      // 2. Build your custom structured JSON object structure matching your API spec
      const jsonPayload = {
        title: "User Sketch Pad Artwork",
        format: "png",
        image_data: rawBase64String, // Send raw string, or use base64DataUrl depending on spec
        timestamp: new Date().toISOString(),
      };

      // 3. Post JSON via the configured Axios instance
      // The Axios request interceptor automatically attaches the bearer auth header here
      const response = await axios.post(
        `${config.baseURLApi}/execute/diagnostic`,
        jsonPayload,
      );

      alert("Base64 image uploaded successfully!");
      console.log("Server response data package:", response.data);
    } catch (error) {
      console.error("Axios transmission processing error:", error);

      // Axios error handling parsing patterns
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
              <AccordionDetails>
                <form onSubmit={handleSubmit}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* The Canvas Element */}
                    <Box
                      component="canvas"
                      ref={canvasRef}
                      style={{ touchAction: "none" }}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      sx={{
                        border: "1px dashed",
                        borderColor: "primary.main",
                        borderRadius: 1,
                        cursor: "crosshair",
                        backgroundColor: "background.paper",
                        display: "flex",
                        width: "100%",
                      }}
                    />
                  </Paper>
                  <TextField
                    id="outlined-multiline-static"
                    label=""
                    multiline
                    defaultValue=""
                    style={{ width: "100%" }}
                  />
                  <Box display="flex" justifyContent={"flex-end"}>
                    {/* <Button
                      variant={"contained"}
                      sx={{ 
                        backgroundColor: '#ffffff', 
                        color: '#ffffff',
                        '&:hover': {
                          backgroundColor: '#eeeeee', // Darker shade for hover state
                        }
                      }}
                      // startIcon={<DeleteIcon />}
                      // onClick={clearCanvas}
                      disabled={isUploading}
                    >
                      Preview
                    </Button> */}
                    <Button
                      variant={"contained"}
                      color={"secondary"}
                      startIcon={<DeleteIcon />}
                      onClick={clearCanvas}
                      disabled={isUploading}
                    >
                      Clear
                    </Button>

                    {/* NEW: Upload Action Interface Controller */}
                    <Button
                      variant={"contained"}
                      color={"primary"}
                      startIcon={
                        isUploading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <CloudUploadIcon />
                        )
                      }
                      onClick={handleUploadJson}
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : "Execute Diagnostic"}
                    </Button>
                  </Box>
                </form>
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
