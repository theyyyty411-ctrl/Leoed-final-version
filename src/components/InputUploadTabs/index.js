import React, { useRef, useState, useEffect, useCallback } from "react";
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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import HeightIcon from "@mui/icons-material/Height";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import BackspaceIcon from "@mui/icons-material/Backspace";
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
  // Result props
  result = null,
  initialResult = null,
  // Submit props
  initialSubmit = null,
  // Text field props
  textFieldDefaultValue = "",
  // Tab labels
  inputTabLabel = "Input",
  uploadTabLabel = "Upload",
  resultTabLabel = "Result",
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
  const [textValue, setTextValue] = useState(textFieldDefaultValue);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [eraserMode, setEraserMode] = useState(false);
  const [penColor, setPenColor] = useState(strokeColor);
  const [penSize, setPenSize] = useState(brushSize);
  const isDrawingRef = useRef(false);
  const currentStrokeColor = useRef(strokeColor);
  const currentBrushSize = useRef(brushSize);
  const isEraserRef = useRef(false);

  useEffect(() => {
    currentStrokeColor.current = strokeColor;
    setPenColor(strokeColor);
  }, [strokeColor]);

  useEffect(() => {
    currentStrokeColor.current = penColor;
  }, [penColor]);

  useEffect(() => {
    currentBrushSize.current = penSize;
  }, [penSize]);

  useEffect(() => {
    currentBrushSize.current = brushSize;
    setPenSize(brushSize);
  }, [brushSize]);

  // Sync eraserRef with eraserMode state
  useEffect(() => {
    isEraserRef.current = eraserMode;
  }, [eraserMode]);

  // Auto-switch to Result tab when uploading starts or result becomes available
  useEffect(() => {
    if (isUploading || result || initialResult) {
      setValue(2);
    }
  }, [isUploading, result, initialResult]);

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
    if (
      preserveDrawing &&
      (canvas.width !== width || canvas.height !== height)
    ) {
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

  const handleEraserToggle = (event, newMode) => {
    if (newMode !== null) {
      setEraserMode(newMode === "eraser");
    }
  };

  const eraserRadiusRef = useRef(20);

  const startDrawing = (e) => {
    const canvas = canvasRef?.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    isDrawingRef.current = true;
    ctx.save();

    if (isEraserRef.current) {
      ctx.globalCompositeOperation = "destination-out";
      const coords = getScaledCoordinates(e, canvas);
      ctx.beginPath();
      ctx.arc(coords.x, coords.y, currentBrushSize.current * 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    } else {
      setHasDrawing(true);
      ctx.strokeStyle = currentStrokeColor.current;
      ctx.lineWidth = currentBrushSize.current;
      ctx.beginPath();
      const coords = getScaledCoordinates(e, canvas);
      ctx.moveTo(coords.x, coords.y);
    }
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;

    const canvas = canvasRef?.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getScaledCoordinates(e, canvas);

    if (isEraserRef.current) {
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(coords.x, coords.y, currentBrushSize.current * 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else {
      ctx.strokeStyle = currentStrokeColor.current;
      ctx.lineWidth = currentBrushSize.current;
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;

    const canvas = canvasRef?.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.restore();
      ctx.beginPath();
    }
  };

  const clearCanvas = () => {
    setTextValue(textFieldDefaultValue);
    const canvas = canvasRef?.current;
    if (!canvas) return;
    canvasDataRef.current = null;
    syncCanvasSizeToDisplay(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    setHasDrawing(false);
    if (onClearCanvas) onClearCanvas();
  };

  const [previews, setPreviews] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [canvasImageToRestore, setCanvasImageToRestore] = useState(null);

  // Initialize text field with text_input from initialSubmit if provided
  useEffect(() => {
    if (initialSubmit) {
      let submitData = initialSubmit;
      
      // If it's a string, try to parse it as JSON
      if (typeof initialSubmit === 'string') {
        try {
          submitData = JSON.parse(initialSubmit);
        } catch (e) {
          // If not valid JSON, just set the text value
          setTextValue(initialSubmit);
          return;
        }
      }
      
      // If it's an object, extract text_input property
      if (typeof submitData === 'object') {
        if (submitData.text_input) {
          setTextValue(submitData.text_input);
        }
        
        // Extract images from submit if present
        if (submitData.images && Array.isArray(submitData.images)) {
          setUploadedImages(submitData.images);
        }
        
        // Store canvas image to restore if from: "input"
        // This works even if there's no text_input
        if (submitData.from === "input" && submitData.images && submitData.images.length > 0) {
          setCanvasImageToRestore(submitData.images[0]);
          setShowDrawing(true);
        }
      }
    }
  }, [initialSubmit]);

  // Restore canvas when it becomes available and we have an image to restore
  useEffect(() => {
    if (!canvasImageToRestore || !showDrawing) {
      // Only proceed if we have an image AND canvas is shown
      return;
    }

    // Wait for canvas to be rendered and ref to be attached
    const timer = setTimeout(() => {
      if (!canvasRef?.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          // Set canvas size to match image
          canvas.width = img.width;
          canvas.height = img.height;
          // Draw the image on canvas
          ctx.drawImage(img, 0, 0);
          setHasDrawing(true);
          setCanvasImageToRestore(null);
        };
        img.src = canvasImageToRestore;
      }
    }, 100); // Small delay to ensure canvas is mounted

    return () => clearTimeout(timer);
  }, [canvasImageToRestore, showDrawing]);

  // Generate preview URLs for selected files
  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleClearFiles = () => {
    previews.forEach((url) => URL.revokeObjectURL(url));
    setFiles([]);
    setPreviews([]);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  // Convert file to Base64 as JPEG with quality 0.5
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          // Resize if width or height > max, maintaining aspect ratio
          const maxSize = 1024;
          if (width > maxSize || height > maxSize) {
            const aspectRatio = width / height;
            if (width > height) {
              width = maxSize;
              height = maxSize / aspectRatio;
            } else {
              height = maxSize;
              width = maxSize * aspectRatio;
            }
            width = Math.round(width);
            height = Math.round(height);
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Failed to get canvas context"));
            return;
          }
          // Fill with white background to remove alpha channel
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, width, height);
          const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.5);
          resolve(jpegDataUrl);
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Convert canvas drawing to Base64
  const canvasToBase64 = () => {
    const canvas = canvasRef?.current;
    if (!canvas) return null;
    // Create a temporary canvas to remove alpha channel
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const ctx = tempCanvas.getContext("2d");
    if (!ctx) return null;
    // Fill with white background to remove alpha channel
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    ctx.drawImage(canvas, 0, 0);
    return tempCanvas.toDataURL("image/jpeg", 0.5);
  };


  // Convert text input to image
  const textToImage = (text) => {
    if (!text || text.trim() === "") return null;
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    
    // Set canvas size
    const padding = 20;
    const lineHeight = 24;
    const fontSize = 16;
    const maxWidth = 800;
    
    ctx.font = `${fontSize}px Arial, sans-serif`;
    
    // Split text into lines and calculate dimensions
    const lines = text.split('\n');
    let maxLineWidth = 0;
    lines.forEach(line => {
      const metrics = ctx.measureText(line);
      maxLineWidth = Math.max(maxLineWidth, metrics.width);
    });
    
    const width = Math.min(maxLineWidth + padding * 2, maxWidth);
    const height = lines.length * lineHeight + padding * 2;
    
    canvas.width = width;
    canvas.height = height;
    
    // Fill with white background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);
    
    // Draw text
    ctx.fillStyle = "#000000";
    ctx.font = `${fontSize}px Arial, sans-serif`;
    ctx.textBaseline = "top";
    
    lines.forEach((line, index) => {
      ctx.fillText(line, padding, padding + index * lineHeight);
    });
    
    return canvas.toDataURL("image/jpeg", 0.5);
  };

  // Render JSON result in a better format
  const renderJsonResult = (data) => {
    if (!data) return null;
    
    // If it's a string, try to parse it
    let jsonData = data;
    if (typeof data === "string") {
      try {
        jsonData = JSON.parse(data);
      } catch (e) {
        // If it's not valid JSON, just return the string
        return (
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {data}
          </Typography>
        );
      }
    }
    
    // If it's not an object, just return it as a string
    if (typeof jsonData !== "object" || Array.isArray(jsonData)) {
      return (
        <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {JSON.stringify(jsonData, null, 2)}
        </Typography>
      );
    }
    
    // Render object as key-value pairs
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {Object.entries(jsonData)
          .map(([key, value]) => (
            <Box
              key={key}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                p: 1.5,
                backgroundColor: "#fafafa",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {key}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  color: "text.primary",
                }}
              >
                {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
              </Typography>
            </Box>
          ))}
      </Box>
    );
  };

  // Handle Execute from Input tab: convert drawing to Base64 and include text input
  const handleExecuteFromInput = async () => {
    if (!onUploadJson || isUploading) return;

    const drawingBase64 = canvasToBase64();
    const textInput = textValue !== textFieldDefaultValue ? textValue : "";
    const textImage = textToImage(textInput);
    
    // Only include drawing in upload, not text image
    const uploadImages = [];
    if (drawingBase64) uploadImages.push(drawingBase64);
    
    // Include both drawing and text image in preview
    const previewImages = [];
    if (textImage) previewImages.push(textImage);
    if (drawingBase64) previewImages.push(drawingBase64);
    
    setUploadedImages(previewImages);
    
    if (onUploadJson) {
      await onUploadJson(uploadImages, textInput, "input");
    }
  };

  // Handle Execute from Upload tab: convert files to Base64 and send as images array
  const handleExecuteFromUpload = useCallback(async () => {
    if (!onUploadJson || files.length === 0 || isUploading) return;

    const fileBase64Array = await Promise.all(
      files.map((file) => fileToBase64(file))
    );
    setUploadedImages(fileBase64Array);

    if (onUploadJson) {
      await onUploadJson(fileBase64Array, "", "upload");
    }
    setFiles([]);
    setPreviews([]);
  }, [files, isUploading, onUploadJson]);

  return (
    <>
      <AppBar position="static" color="default">
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
          <Tab label={resultTabLabel} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
          {canvasHeader}
          <TextField
            id="outlined-multiline-static"
            label=""
            multiline
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            style={{ width: "100%" }}
          />
        {textFieldFooter}
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          mb={1}
          mt={1}
          minHeight={36}
        >
          <Typography variant="body2" color="textSecondary" sx={{ whiteSpace: "nowrap" }}>
            Use Drawing
          </Typography>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              alignSelf: "stretch",
              visibility: showDrawing ? "visible" : "hidden",
            }}
          >
            <Slider
              value={currentHeight}
              onChange={(e, newValue) => setCurrentHeight(newValue)}
              min={100}
              max={900}
              step={50}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `${v}px`}
              sx={{ py: 0, my: 0 }}
            />
          </Box>
          <Box display="flex" alignItems="center" gap={0.5} minHeight={28}>
            {/* Tool controls - always rendered but toggled via visibility */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  visibility: showDrawing && !eraserMode ? "visible" : "hidden",
                }}
              >
                <Box
                  component="input"
                  type="color"
                  value={penColor}
                  onChange={(e) => setPenColor(e.target.value)}
                  sx={{
                    width: 24,
                    height: 24,
                    p: 0,
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                    "&::-webkit-color-swatch-wrapper": { p: 0 },
                    "&::-webkit-color-swatch": { border: "2px solid", borderColor: "divider", borderRadius: "50%" },
                  }}
                  title="Pen color"
                />
                <Box
                  component="input"
                  type="number"
                  value={penSize}
                  onChange={(e) => setPenSize(Math.max(1, Math.min(20, Number(e.target.value))))}
                  sx={{
                    width: 36,
                    height: 24,
                    p: 0,
                    textAlign: "center",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                    fontSize: 11,
                  }}
                  inputProps={{ min: 1, max: 20, style: { textAlign: "center" } }}
                  title="Pen thickness"
                />
              </Box>
              <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                visibility: showDrawing ? "visible" : "hidden",
              }}
            >
              <ToggleButtonGroup
                value={eraserMode ? "eraser" : "pen"}
                exclusive
                onChange={handleEraserToggle}
                size="small"
              >
                <ToggleButton
                  value="pen"
                  title="Draw"
                  sx={{ p: "4px 6px", minWidth: 0 }}
                >
                  <BorderColorIcon sx={{ fontSize: 16 }} />
                </ToggleButton>
                <ToggleButton
                  value="eraser"
                  title="Eraser"
                  sx={{ p: "4px 6px", minWidth: 0 }}
                >
                  <BackspaceIcon sx={{ fontSize: 16 }} />
                </ToggleButton>
              </ToggleButtonGroup>

            </Box>
            <IconButton
              size="small"
              onClick={() => setShowDrawing(!showDrawing)}
              color={showDrawing ? "primary" : "default"}
              title="Toggle drawing canvas"
              sx={{ p: "4px" }}
            >
              <HeightIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>
        {showDrawing && (
          <>
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
                  borderColor: eraserMode ? "error.main" : "primary.main",
                  borderRadius: 1,
                  cursor: eraserMode ? "url(\"data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2740%27 height=%2740%27%3E%3Ccircle cx=%2720%27 cy=%2720%27 r=%2718%27 fill=%27none%27 stroke=%27%23f44336%27 stroke-width=%272%27/%3E%3Ccircle cx=%2720%27 cy=%2720%27 r=%272%27 fill=%27%23f44336%27/%3E%3C/svg%3E\") 20 20, crosshair" : "crosshair",
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
            disabled={isUploading || (textValue === textFieldDefaultValue && !hasDrawing)}
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
            onClick={handleExecuteFromInput}
            disabled={isUploading || (textValue === textFieldDefaultValue && !hasDrawing)}
          >
            {isUploading ? "Uploading..." : textValue !== textFieldDefaultValue || hasDrawing
              ? `Execute Diagnostic (${(textValue !== textFieldDefaultValue ? 1 : 0) + (hasDrawing ? 1 : 0)})`
              : "Execute Diagnostic"}
          </Button>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box display="flex" flexDirection="column" alignItems="stretch" gap={2}>
          {/* Image previews */}
          {previews.length > 0 && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gap: 1,
                maxHeight: 280,
                overflowY: "auto",
                p: 1,
                border: "1px dashed",
                borderColor: "primary.main",
                borderRadius: 1,
              }}
            >
              {previews.map((url, idx) => (
                <Box
                  key={idx}
                  component="img"
                  src={url}
                  alt={`Preview ${idx + 1}`}
                  sx={{
                    width: "100%",
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
              ))}
            </Box>
          )}

          {/* File selection buttons side by side */}
          <Box display="flex" gap={1}>
            <label
              htmlFor="native-camera-input"
              style={{ cursor: "pointer", flex: 1, minWidth: 0 }}
            >
              <Button
                variant="contained"
                color="primary"
                component="span"
                fullWidth
                disabled={isUploading}
                startIcon={<CameraAltIcon />}
              >
                Camera
              </Button>
            </label>
            <input
              id="native-camera-input"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <label
              htmlFor="file-picker-input"
              style={{ cursor: "pointer", flex: 1, minWidth: 0 }}
            >
              <Button
                variant="contained"
                color="primary"
                component="span"
                fullWidth
                disabled={isUploading}
                startIcon={<AttachFileIcon />}
              >
                Files
              </Button>
            </label>
            <input
              id="file-picker-input"
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Box>

          {/* Action buttons side by side: Clear then Execute Diagnostic */}
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={handleClearFiles}
              disabled={isUploading || files.length === 0}
              sx={{ minWidth: 100 }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={isUploading || files.length === 0}
              startIcon={
                isUploading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <CloudUploadIcon />
                )
              }
              onClick={handleExecuteFromUpload}
            >
              {isUploading
                ? "Uploading..."
                : files.length > 0
                  ? `Execute Diagnostic (${files.length})`
                  : "Execute Diagnostic"}
            </Button>
          </Box>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box minHeight={200}>
          {isUploading ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              minHeight={200}
            >
              <CircularProgress size={48} />
              <Typography variant="body1" color="textSecondary" style={{ marginTop: 16 }}>
                Processing...
              </Typography>
            </Box>
          ) : (
            <Box>
              {uploadedImages.length > 0 && (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                    gap: 1,
                    mb: 2,
                    p: 1,
                    border: "1px dashed",
                    borderColor: "primary.main",
                    borderRadius: 1,
                  }}
                >
                  {uploadedImages.map((dataUrl, idx) => (
                    <Box
                      key={idx}
                      component="img"
                      src={dataUrl}
                      alt={`Uploaded ${idx + 1}`}
                      sx={{
                        width: "100%",
                        height: 100,
                        objectFit: "contain",
                        borderRadius: 1,
                        backgroundColor: "#f5f5f5",
                      }}
                    />
                  ))}
                </Box>
              )}
              {result || initialResult ? (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" color="primary" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
                    Diagnostic Result
                  </Typography>
                  {renderJsonResult(result || initialResult)}
                </Box>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  minHeight={200}
                >
                  <Typography variant="body1" color="textSecondary">
                    No results yet. Submit a diagnostic to see results here.
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </TabPanel>
    </>
  );
};

export default InputUploadTabs;