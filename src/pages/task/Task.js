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
  useTasksState,
  getTasksRequest,
  TasksContext,
  getTaskInfo,
} from "../../context/TaskContext";

import { useParams, useNavigate } from "react-router-dom";

let qlist = [];
let row = { qlist: [] };

const Task = () => {
  const { id } = useParams();
  const taskId = Number(id);
  const classes = useStyles();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
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
  const context = useTasksState();
  const [backTasks, setBackTasks] = React.useState(context.tasks.tasks);

  useEffect(() => {
    // sendNotification();
    getTasksRequest(context.setTasks);
  }, []);

  useEffect(() => {
    setBackTasks(context.tasks.tasks);
  }, [context]);

  if (!Number.isNaN(taskId)) {
    const rowfind = backTasks.find((c) => c.id === taskId);
    if (rowfind) {
      row = rowfind;
    }
  }

  if (backTasks.length > 0) {
    row = backTasks[0];
  }

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

  const openTaskEdit = (event, id) => {
    navigate(`/app/task/edit/${id}`);
    event.stopPropagation();
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUploadFiles = async (e) => {
    e.preventDefault();
    if (files.length === 0 || uploading) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("Image", files[i]);
    }

    setIsUploading(true);

    try {
      const jsonPayload = {
        title: "User Sketch Pad Artwork",
        format: "png",
        form_data: formData, // Send raw string, or use base64DataUrl depending on spec
        timestamp: new Date().toISOString(),
      };

      const response = await axios.post(
        `${config.baseURLApi}/execute/diagnostic`,
        jsonPayload,
      );

      alert("form image uploaded successfully!");
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

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 12, lg: 6 }}>
          {row.qlist.map((c, index) => (
            <Card className={classes.card} key={index}>
              <CardContent>
                <Typography variant="h5" style={{ marginBottom: 16 }}>
                  {index + 1}.
                </Typography>
                <Box
                  sx={{
                    fontFamily: '"Cambria Math", "Latin Modern Math", "STIX"',
                    fontSize: {
                      xs: "0.8rem",
                      sm: "1rem",
                    },
                  }}
                  dangerouslySetInnerHTML={{
                    __html: c.question_ml,
                  }}
                />
              </CardContent>
            </Card>
          ))}
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Widget disableWidgetMenu inheritHeight size={12} noBodyPadding>
            <AppBar position="static" color="default" style={{ marginTop: 10 }}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Input" {...a11yProps(0)} />
                <Tab label="Upload" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
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
                  defaultValue="1.

2.

3.

4.

5.

"
                  style={{ width: "100%" }}
                />
                <Box display="flex" justifyContent={"flex-end"}>
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
            </TabPanel>
            <TabPanel value={value} index={1}>
              {/* UNIFIED COMPACT UPLOAD ENGINE FORM */}
              <form onSubmit={handleUploadFiles} className="upload-form">
                {/* PATH A: Custom trigger opening mobile's real system built-in camera app instantly */}
                <div className="native-camera-wrapper">
                  <label
                    htmlFor="native-camera-input"
                    className="system-camera-label-btn"
                  >
                    Take a Photo
                  </label>
                  <input
                    id="native-camera-input"
                    type="file"
                    accept="image/*"
                    capture="environment" /* Standard parameter triggers native iOS/Android camera app */
                    onChange={handleFileChange}
                    style={{
                      display: "none",
                    }} /* Hide native default button elements */
                  />
                </div>

                <hr className="drawer-divider-thin" />

                {/* PATH B: Standard system files selector picker */}
                <div className="file-picker-wrapper">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                </div>
                <button
                  type="submit"
                  className="submit-media-btn"
                  disabled={uploading || files.length === 0}
                >
                  {uploading
                    ? `Uploading Assets...`
                    : files.length > 0
                      ? `Upload Queued (${files.length}) Items`
                      : "Select Files to Upload"}
                </button>
              </form>
            </TabPanel>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default Task;
