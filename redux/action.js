import axios from "axios";
import { serverUrl } from "./store";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    console.log(email);
    console.log(password);
    const { data } = await axios.post(
      `${serverUrl}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFailure", payload: error.response.data.error });
  }
};

export const logout = (token) => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    await axios.post(
      `${serverUrl}/logout`,
      { token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "logoutSuccess" });
  } catch (error) {
    dispatch({
      type: "logoutFailure",
      payload: error.response.data.message,
    });
  }
};

export const register = (email, password, password_confirmation) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });

    const { data } = await axios.post(`${serverUrl}/register`, { email, password, password_confirmation }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "registerSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "registerFailure",
      payload: error.response.data.error,
    });
  }
};

export const getTasks = (token) => async (dispatch) => {
  try {
    console.log(token);
    dispatch({ type: "getTasksRequest" });
    const { data } = await axios.get(`${serverUrl}/items`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    });
    dispatch({ type: "getTasksSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getTasksFailure",
      payload: error.response.data.message,
    });
  }
};

export const addTask = (title, description, token) => async (dispatch) => {
  try {
    dispatch({ type: "addTaskRequest" });

    const { data } = await axios.post(`${serverUrl}/item`, { title, description }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    });
    dispatch({ type: "addTaskSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "addTaskFailure",
      payload: error.response.data.error,
    });
  }
};


export const deleteTask = (taskId, token) => async (dispatch) => {
  try {
    dispatch({ type: "deleteTaskRequest" });

    const { data } = await axios.delete(`${serverUrl}/item/${taskId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    });
    dispatch({ type: "deleteTaskSuccess", payload: data.message });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: "deleteTaskFailure",
      payload: error.response.data.error,
    });
  }
};

export const updateTask = (title, description, token, taskId) => async (dispatch) => {
  try {
    dispatch({ type: "updateTaskRequest" });

    console.log("Title", title);
    console.log("Description", description);
    const { data } = await axios.put(`${serverUrl}/item/${taskId}`, { title, description }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
    });
    console.log("Data : ", data);
    dispatch({ type: "updateTaskSuccess", payload: data.message });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: "updateTaskFailure",
      payload: error.response.data.error,
    });
  }
};