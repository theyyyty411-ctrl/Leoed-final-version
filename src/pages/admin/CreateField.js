import React, { useEffect } from "react";
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
  getFieldsRequest,
  useFieldsState,
  updateField,
  createField,
} from "../../context/AdminContext";

//components
import Widget from "../../components/Widget";
import { Typography, Button } from "../../components/Wrappers";
import config from "../../config";

const CreateField = () => {
  const { id } = useParams();
  const context = useFieldsState();

  const getId = (id) => {
    return context.fields.fields.findIndex((c) => {
      return c.id == id;
    });
  };

  const [localFields, setLocalFields] = React.useState(
    context.fields.fields[getId(id)],
  );

  const [newField, setNewField] = React.useState({
    field: "subject",
    value: "",
    label: "",
  });

  useEffect(() => {
    getFieldsRequest(context.setFields);
  }, []);

  useEffect(() => {
    setLocalFields(context.fields.fields[getId(id)]);
  }, [context]);

  const navigate = useNavigate();
  const location = useLocation();

  const editField = (e) => {
    setLocalFields({
      ...localFields,
      [e.target.id]: e.currentTarget.value,
    });
  };

  const editNewField = (e) => {
    setNewField({
      ...newField,
      [e.target.id]: e.currentTarget.value,
    });
  };

  const getEditField = () => {
    updateField(localFields, context.setFields);
    navigate("/app/admin/field");
    // sendNotification();
  };

  const createNewField = () => {
    createField(newField, context.setFields);
    navigate("/app/admin/field");
  };

  const changeField = (e) => {
    if (isCreateField) {
      setNewField({ ...newField, field: e.target.value });
    } else {
      setLocalFields({ ...localFields, field: e.target.value });
    }
  };

  const fields = [
    {
      id: 0,
      value: "subject",
      label: "Subject",
    },
    {
      id: 1,
      value: "type",
      label: "Type",
    },
    {
      id: 2,
      value: "grade",
      label: "Grade",
    },
  ];

  const isCreateField = location.pathname === "/app/admin/field/create";

  return (
    <>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Widget
            title={isCreateField ? "New field" : "Edit field"}
            disableWidgetMenu
          >
            <Box display={"flex"} flexDirection="column">
              <Box display={"flex"} alignItems={"center"}>
                <Box width={120} sx={{ pl: 2 }}>
                  <Typography variant={"h6"}>Field</Typography>
                </Box>
                <Box width={280}>
                  <Select
                    id="field"
                    style={{ alignSelf: "flex-end" }}
                    value={isCreateField ? newField.field : localFields.field}
                    onChange={(e) => changeField(e)}
                  >
                    {fields.map((c) =>
                      c.type === "divider" ? (
                        <Divider key={c.id} />
                      ) : (
                        <MenuItem value={c.value} key={c.id}>
                          {c.label}
                        </MenuItem>
                      ),
                    )}
                  </Select>
                </Box>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Box width={120} sx={{ pl: 2 }}>
                  <Typography variant={"h6"}>Value</Typography>
                </Box>
                <Box width={200}>
                  <Input
                    id="value"
                    margin="normal"
                    variant="outlined"
                    value={isCreateField ? newField.value : localFields.value}
                    name="value"
                    fullWidth
                    onChange={(e) =>
                      isCreateField ? editNewField(e) : editField(e)
                    }
                  />
                </Box>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Box width={120} sx={{ pl: 2 }}>
                  <Typography variant={"h6"}>Label</Typography>
                </Box>
                <Box width={200}>
                  <Input
                    id="label"
                    margin="normal"
                    variant="outlined"
                    value={isCreateField ? newField.label : localFields.label}
                    fullWidth
                    onChange={(e) =>
                      isCreateField ? editNewField(e) : editField(e)
                    }
                  />
                </Box>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Button
                  variant={"contained"}
                  color={"success"}
                  style={{ marginRight: 8 }}
                  onClick={() =>
                    isCreateField ? createNewField() : getEditField()
                  }
                >
                  {isCreateField ? "Save" : "Edit"}
                </Button>
                <Button
                  variant={"contained"}
                  onClick={() => navigate("/app/admin/field")}
                >
                  Back
                </Button>
              </Box>
            </Box>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateField;
