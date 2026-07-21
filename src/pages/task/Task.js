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
  const [result, setResult] = useState(null);
  const [row, setRow] = React.useState({ qlist: [] });
  const [initialSubmit, setInitialSubmit] = useState(null);
  const [initialResult, setInitialResult] = useState(null);

  useEffect(() => {
    if (taskId) {
      getTaskInfo(taskId).then((data) => {
        if (data) {
          setRow(data);
          // Parse submit and result from JSON strings
          if (data.submit) {
            try {
              const submitData = JSON.parse(data.submit);
              setInitialSubmit(submitData);
            } catch (e) {
              console.error("Failed to parse submit JSON:", e);
              setInitialSubmit(data.submit);
            }
          }
          if (data.result) {
            try {
              setInitialResult(JSON.parse(data.result));
            } catch (e) {
              console.error("Failed to parse result JSON:", e);
              setInitialResult(data.result);
            }
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  const canvasRef = useRef(null);

  const handleUploadJson = async (images = [], textInput = "", from = "input") => {
    setIsUploading(true);

    try {
      const jsonPayload = {
        from: from,
        type: "task",
        id: taskId,
        images,
        text_input: textInput,
        timestamp: new Date().toISOString(),
      };

      const response = await axios.post(
        `${config.baseURLApi}/execute/diagnostic`,
        jsonPayload,
      );

      alert("Submission success!");
      // console.log("Server response data package:", response.data);
      setResult(response.data);
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
              result={result}
              initialSubmit={initialSubmit}
              initialResult={initialResult}
            />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default Task;