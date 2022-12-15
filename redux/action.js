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
