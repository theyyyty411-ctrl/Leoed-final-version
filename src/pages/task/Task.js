import React, { useRef, useState, useEffect } from "react";
import { Grid, Box, Card, CardContent } from "@mui/material";
import useStyles from "./styles";

import axios from "axios";
import config from "../../config";

//components
import Widget from "../../components/Widget";
import InputUploadTabs from "../../components/InputUploadTabs";
import { Typography } from "../../components/Wrappers";

//context
import { getTaskInfo } from "../../context/TaskContext";

import { useParams } from "react-router-dom";

const Task = () => {
  const { id } = useParams();
  const taskId = Number(id);
  const classes = useStyles();
  const [isUploading, setIsUploading] = useState(false);
  const [row, setRow] = React.useState({ qlist: [] });

  useEffect(() => {
    if (taskId) {
      getTaskInfo(taskId).then((data) => {
        if (data) {
          setRow(data);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  const canvasRef = useRef(null);

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
            <InputUploadTabs
              canvasRef={canvasRef}
              isUploading={isUploading}
              onUploadJson={handleUploadJson}
              onUploadFiles={handleUploadFiles}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default Task;
