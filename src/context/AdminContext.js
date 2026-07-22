import React from "react";
import axios from "axios";

import config from "../config";

const FieldsContext = React.createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELDS":
      // console.log('UPDATE_FIELDS');
      let f1 = [];
      let f2 = [];
      let f3 = [];
      action.payload.map((c) => {
        if (c.field === "subject") {
          f1.push({ value: c.value, label: c.label });
        }
        if (c.field === "type") {
          f2.push({ value: c.value, label: c.label });
        }
        if (c.field === "grade") {
          f3.push({ value: c.value, label: c.label });
        }
      });
      return {
        isLoaded: true,
        fields: action.payload,
        subject: f1,
        type: f2,
        grade: f3,
      };
    case "EDIT_FIELD": {
      const index = action.payload.id;
      return {
        ...state,
        isLoaded: true,
        fields: state.fields.map((c) => {
          if (c.id === index) {
            return { ...c, ...action.payload };
          }
          return c;
        }),
      };
    }
    case "CREATE_FIELD":
      state.fields.push(action.payload);
      return {
        ...state,
        isLoaded: true,
        fields: state.fields,
      };

    default:
      console.log("default");
      return {
        ...state,
      };
  }
};

const FieldsProvider = ({ children }) => {
  const [fields, setFields] = React.useReducer(rootReducer, {
    isLoaded: !config.isBackend,
    fields: [],
  });
  // console.log(fields);
  return (
    <FieldsContext.Provider value={{ fields, setFields }}>
      {children}
    </FieldsContext.Provider>
  );
};

const useFieldsState = () => {
  const context = React.useContext(FieldsContext);
  return context;
};

export function getFieldsRequest(dispatch) {
  if (config.isBackend) {
    return axios.get("/fields").then((res) => {
      dispatch({ type: "UPDATE_FIELDS", payload: res.data });
    });
  }

  dispatch({ type: "UPDATE_FIELDS", payload: [] });
}

export function deleteFieldRequest({ id, navigate, pathname, dispatch }) {
  if (!config.isBackend) return;

  if (Array.isArray(id)) {
    for (let key in id) {
      axios.delete("/fields/" + id[key]).then(() => {});
    }
  } else {
    axios.delete("/fields/" + id).then(() => {
      getFieldsRequest(dispatch);
      if (pathname !== "/app/admin/field") {
        navigate("/app/admin/field");
      }
      return;
    });
  }
  getFieldsRequest(dispatch);
}

export function updateField(field, dispatch) {
  if (!config.isBackend) return;

  axios.put("/fields/" + field.id, field).then((res) => {
    dispatch({ type: "EDIT_FIELD", payload: res.data });
  });
}

export function createField(field, dispatch) {
  if (!config.isBackend) return;

  axios.post("/fields", field).then((res) => {
    dispatch({ type: "CREATE_FIELD", payload: res.data });
  });
}

export { FieldsProvider, FieldsContext, useFieldsState };
