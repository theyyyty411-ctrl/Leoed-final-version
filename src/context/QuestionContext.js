import React from "react";
import axios from "axios";

import config from "../config";
import { rows as mockQuestions } from "../pages/question/mock";

const QuestionsContext = React.createContext();

const rootReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_QUESTIONS":
      return {
        isLoaded: true,
        questions: action.payload,
        images: state.images ? state.images : [],
      };
    case "EDIT_QUESTION": {
      const index = action.payload.id;
      return {
        ...state,
        isLoaded: true,
        questions: state.questions.map((c) => {
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

    case "CREATE_QUESTION":
      state.questions.push(action.payload);
      return {
        ...state,
        isLoaded: true,
        questions: state.questions,
      };

    default:
      return {
        ...state,
      };
  }
};

const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = React.useReducer(rootReducer, {
    isLoaded: !config.isBackend,
    questions: config.isBackend ? [] : mockQuestions,
    // images: config.isBackend ? [] : mockQuestions.map((question) => question.img),
  });
  return (
    <QuestionsContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionsContext.Provider>
  );
};

const useQuestionsState = () => {
  const context = React.useContext(QuestionsContext);
  return context;
};

export function getQuestionsRequest(dispatch) {
  // We check if app runs with backend mode
  if (config.isBackend) {
    return axios.get("/questions").then((res) => {
      dispatch({ type: "UPDATE_QUESTIONS", payload: res.data });
    });
  }

  dispatch({ type: "UPDATE_QUESTIONS", payload: mockQuestions });
}

export function deleteQuestionRequest({ id, navigate, pathname, dispatch }) {
  // We check if app runs with backend mode
  if (!config.isBackend) return;

  if (Array.isArray(id)) {
    for (let key in id) {
      axios.delete("/questions/" + id[key]).then(() => {});
    }
  } else {
    axios.delete("/questions/" + id).then(() => {
      getQuestionsRequest(dispatch);
      if (pathname !== "/app/question") {
        navigate("/app/question");
      }
      return;
    });
  }
  getQuestionsRequest(dispatch);
}

export function getQuestionInfo(id) {
  // We check if app runs with backend mode
  if (config.isBackend) {
    return axios.get("/questions/" + id).then((res) => {
      return res.data;
    });
  }
  return Promise.resolve(null);
}

// export function getQuestionInfo({ id, dispatch }) {
//   // We check if app runs with backend mode
//   if (config.isBackend) {
//     axios.get('/questions/' + id).then((res) => {
//       dispatch({ type: 'QUESTION', payload: res.data });
//     });
//   }
// }

// export function getQuestionInfo(dispatch) {
//   // We check if app runs with backend mode
//   if (config.isBackend) {
//     axios.get('/questions').then((res) => {
//       dispatch({ type: 'UPDATE_QUESTIONS', payload: res.data });
//     });
//   }
// }

export function updateQuestion(question, dispatch) {
  // We check if app runs with backend mode
  if (!config.isBackend) return;

  axios.put("/questions/" + question.id, question).then((res) => {
    dispatch({ type: "EDIT_QUESTION", payload: res.data });
  });
}

export function createQuestion(question, dispatch) {
  // We check if app runs with backend mode
  if (!config.isBackend) return;

  axios.post("/questions", question).then((res) => {
    dispatch({ type: "CREATE_QUESTION", payload: res.data });
  });
}

// export function getQuestionsImages(dispatch) {
//   // We check if app runs with backend mode
//   if (!config.isBackend) {
//     dispatch({
//       type: 'GET_IMAGES',
//       payload: mockQuestions.map((question) => question.img),
//     });
//     return;
//   }

//   const replacer = (data) => {
//     return data.map((c) => {
//       return c.replace(
//         /http:\/\/.+\//,
//         'https://localhost/assets/questions/',
//       );
//     });
//   };

//   axios.get('/questions/images-list').then((res) => {
//     dispatch({ type: 'GET_IMAGES', payload: replacer(res.data) });
//   });
// }

export { QuestionsProvider, QuestionsContext, useQuestionsState };
