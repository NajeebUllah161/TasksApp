import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer(
  {},
  {
    //login
    loginRequest: (state) => {
      state.loadingLogin = true;
    },
    loginSuccess: (state, action) => {
      state.loadingLogin = false;
      state.successLogin = true;
      state.userLogin = action.payload.user;
    },
    loginFailure: (state, action) => {
      state.loadingLogin = false;
      state.successLogin = false;
      state.errorLogin = action.payload;
    },
    clearLoginUserData: (state) => {
      state.userLogin = null;
    },
    clearLoginUserError: (state) => {
      state.errorLogin = null;
    },

    //register
    registerRequest: (state) => {
      state.loadingRegister = true;
    },
    registerSuccess: (state, action) => {
      state.loadingRegister = false;
      state.successRegister = true;
      state.messageRegister = action.payload.message;
    },
    registerFailure: (state, action) => {
      state.loadingRegister = false;
      state.successRegister = false;
      state.errorRegister = action.payload;
    },
    clearRegisterMessage: (state) => {
      state.messageRegister = null;
    },
    clearRegisterError: (state) => {
      state.errorRegister = null;
    },

    //logout
    logoutRequest: (state) => {
      state.loadingLogout = true;
    },
    logoutSuccess: (state) => {
      state.loadingLogout = false;
      state.successLogout = true;
    },
    logoutFailure: (state, action) => {
      state.loadingLogout = false;
      state.errorLogout = true;
      state.messageLogout = action.payload
    },
    clearLogoutMessage: (state) => {
      state.messageLogout = null;
    },
    clearSuccessLogout: (state) => {
      state.successLogout = false;
    }

  }
);

export const tasksReducer = createReducer(
  {},
  {
    // get tasks
    getTasksRequest: (state) => {
      state.loadingGetTasks = true;
    },
    getTasksSuccess: (state, action) => {
      state.loadingGetTasks = false;
      state.successGetTasks = true;
      state.dataGetTasks = action.payload.items;
    },
    getTasksFailure: (state, action) => {
      state.loadingGetTasks = false;
      state.errorGetTasks = true;
      state.messageGetTasks = action.payload;
    },
    clearGetTasksData: (state) => {
      state.dataGetTasks = null;
    },
    clearGetTasksMessage: (state) => {
      state.messageGetTasks = null;
    },
    clearGetTasksError: (state) => {
      state.errorGetTasks = false;
    },


    addTaskRequest: (state) => {
      state.loadingAddTask = true;
    },
    addTaskSuccess: (state, action) => {
      state.loadingAddTask = false;
      state.successAddTask = true;
      state.dataAddTask = action.payload.item;
    },
    addTaskFailure: (state, action) => {
      state.loadingAddTask = false;
      state.errorAddTask = action.payload;
    },
  }
);
