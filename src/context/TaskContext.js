import React from "react";
import axios from "axios";

import config from "../config";

const mockTasks = [];

const TasksContext = React.createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TASKS":
      return {
        isLoaded: true,
        tasks: action.payload,
        images: state.images ? state.images : [],
      };
    case "EDIT_TASK": {
      const index = action.payload.id;
      return {
        ...state,
        isLoaded: true,
        tasks: state.tasks.map((c) => {
          if (c.id === index) {
            return { ...c, ...action.payload };
          }
          return c;
        }),
      };
    }

    case "GET_IMAGES":
      return {
        ...state,
        images: action.payload,
      };

    case "CREATE_TASK":
      state.tasks.push(action.payload);
      return {
        ...state,
        isLoaded: true,
        tasks: state.tasks,
      };

    default:
      return {
        ...state,
      };
  }
};

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = React.useReducer(rootReducer, {
    isLoaded: !config.isBackend,
    tasks: [],
  });
  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

const useTasksState = () => {
  const context = React.useContext(TasksContext);
  return context;
};

export function getTasksRequest(dispatch) {
  // We check if app runs with backend mode
  if (config.isBackend) {
    return axios.get("/tasks").then((res) => {
      dispatch({ type: "UPDATE_TASKS", payload: res.data });
    });
  }

  dispatch({ type: "UPDATE_TASKS", payload: mockTasks });
}

export function deleteTaskRequest({ id, navigate, pathname, dispatch }) {
  // We check if app runs with backend mode
  if (!config.isBackend) return;

  if (Array.isArray(id)) {
    for (let key in id) {
      axios.delete("/tasks/" + id[key]).then(() => {});
    }
  } else {
    axios.delete("/tasks/" + id).then(() => {
      getTasksRequest(dispatch);
      if (pathname !== "/app/task") {
        navigate("/app/task");
      }
      return;
    });
  }
  getTasksRequest(dispatch);
}

export function getTaskInfo(id) {
  // We check if app runs with backend mode
  if (config.isBackend) {
    return axios.get("/tasks/" + id).then((res) => {
      return res.data;
    });
  }
  return Promise.resolve(null);
}

export function updateTask(task, dispatch) {
  // We check if app runs with backend mode
  if (!config.isBackend) return;

  axios.put("/tasks/" + task.id, task).then((res) => {
    dispatch({ type: "EDIT_TASK", payload: res.data });
  });
}

export function createTask(task, dispatch) {
  // We check if app runs with backend mode
  if (!config.isBackend) return;

  axios.post("/tasks", task).then((res) => {
    dispatch({ type: "CREATE_TASK", payload: res.data });
  });
}

export function createQuickTask(dispatch, count = 5) {
  if (config.isBackend) {
    return axios.post("/tasks/quick", { count }).then((res) => {
      dispatch({ type: "CREATE_TASK", payload: res.data });
    });
  }
}

export { TasksProvider, TasksContext, useTasksState };
