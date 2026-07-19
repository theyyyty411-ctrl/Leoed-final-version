import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  AppBar,
  TextField,
  Paper,
  CircularProgress,
  IconButton,
  Slider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import HeightIcon from "@mui/icons-material/Height";
import { Typography, Button } from "../Wrappers";

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

const InputUploadTabs = ({
  // Canvas props
  canvasRef,
  brushSize = 1,
  strokeColor = "#3f51b5",
  canvasHeight = 200,
  onClearCanvas,
  // Upload props
  isUploading = false,
  onUploadJson,
  onUploadFiles,
  // Text field props
  textFieldDefaultValue = "1.\n\n2.\n\n3.\n\n4.\n\n5.\n\n",
  // Tab labels
  inputTabLabel = "Input",
  uploadTabLabel = "Upload",
  // Custom action buttons in Input tab
  inputActions,
  // Custom content above the canvas
  canvasHeader,
  // Custom content below the text field
  textFieldFooter,
}) => {
  const [value, setValue] = useState(0);
  const [files, setFiles] = useState([]);
  const [currentHeight, setCurrentHeight] = useState(canvasHeight);
  const [showDrawing, setShowDrawing] = useState(false);
  const isDrawingRef = useRef(false);
  const currentStrokeColor = useRef(strokeColor);

  useEffect(() => {
    currentStrokeColor.current = strokeColor;
  }, [strokeColor]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const canvasDataRef = useRef(null);

  const syncCanvasSizeToDisplay = (canvas, preserveDrawing = false) => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const width = Math.round(rect.width);
    const height = Math.round(rect.height);

    // Save current drawing before resizing
    if (preserveDrawing && (canvas.width !== width || canvas.height !== height)) {
      canvasDataRef.current = canvas.toDataURL();
    }

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = currentStrokeColor.current;
    ctx.lineWidth = brushSize;

    // Restore drawing after resizing
    if (preserveDrawing && canvasDataRef.current) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        canvasDataRef.current = null;
      };
      img.src = canvasDataRef.current;
    }
  };

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;
    syncCanvasSizeToDisplay(canvas, true);
  }, [canvasRef, brushSize, currentHeight]);

  // Sync canvas size when drawing paper is shown
  useEffect(() => {
    if (!showDrawing) return;
    const canvas = canvasRef?.current;
    if (!canvas) return;
    const timer = setTimeout(() => {
      syncCanvasSizeToDisplay(canvas, true);
    }, 50);
    return () => clearTimeout(timer);
  }, [showDrawing]);

  const getScaledCoordinates = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

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
    const canvas = canvasRef?.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isDrawingRef.current = true;
    ctx.beginPath();
    ctx.strokeStyle = currentStrokeColor.current;

    const coords = getScaledCoordinates(e, canvas);
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;

    const canvas = canvasRef?.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = currentStrokeColor.current;

    const coords = getScaledCoordinates(e, canvas);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;

    const canvas = canvasRef?.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.beginPath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef?.current;
    if (!canvas) return;
    canvasDataRef.current = null;
    syncCanvasSizeToDisplay(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    if (onClearCanvas) onClearCanvas();
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUploadFiles = async (e) => {
    e.preventDefault();
    if (files.length === 0 || isUploading) return;

    if (onUploadFiles) {
      await onUploadFiles(files);
    }
    setFiles([]);
  };

  const handleUploadJson = async () => {
    if (onUploadJson) {
      await onUploadJson();
    }
  };

  return (
    <>
      <AppBar position="static" color="default" style={{ marginTop: 10 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label={inputTabLabel} {...a11yProps(0)} />
          <Tab label={uploadTabLabel} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {canvasHeader}
        <TextField
          id="outlined-multiline-static"
          label=""
          multiline
          defaultValue={textFieldDefaultValue}
          style={{ width: "100%" }}
        />
        {textFieldFooter}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1} mt={1}>
          <Typography variant="body2" color="textSecondary">
            Use Drawing
          </Typography>
          <IconButton
            size="small"
            onClick={() => setShowDrawing(!showDrawing)}
            color={showDrawing ? "primary" : "default"}
            title="Toggle drawing canvas"
          >
            <HeightIcon />
          </IconButton>
        </Box>
        {showDrawing && (
          <>
            <Box px={2} mb={1}>
              <Slider
                value={currentHeight}
                onChange={(e, newValue) => setCurrentHeight(newValue)}
                min={100}
                max={900}
                step={50}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${v}px`}
              />
            </Box>
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
                  width: "100%",
                  height: currentHeight,
                }}
              />
            </Paper>
          </>
        )}
        <Box display="flex" justifyContent={"flex-end"} mt={1}>
          {inputActions}
          <Button
            variant={"contained"}
            color={"secondary"}
            startIcon={<DeleteIcon />}
            onClick={clearCanvas}
            disabled={isUploading}
            style={{ marginRight: 8 }}
          >
            Clear
          </Button>
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
              capture="environment"
              onChange={handleFileChange}
              style={{
                display: "none",
              }}
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
              disabled={isUploading}
            />
          </div>
          <button
            type="submit"
            className="submit-media-btn"
            disabled={isUploading || files.length === 0}
          >
            {isUploading
              ? `Uploading Assets...`
              : files.length > 0
                ? `Upload Queued (${files.length}) Items`
                : "Select Files to Upload"}
          </button>
        </form>
      </TabPanel>
    </>
  );
};

export default InputUploadTabs;