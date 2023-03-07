import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { extraReducers } from "../reducer/userReducer";

axios.defaults.baseURL = process.env.REACT_APP_APIURL;
const user = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : null;
axios.defaults.headers.common["Authorization"] =user?.user_authentication;
const initialState = {
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  user: user,
  TcPp: null,
  categories: null,
  dashboard: null,
  lineChart: null,
  areaChart: null,
  charges: null,
  campaigns: null,
};

export const signinUser = createAsyncThunk(
  "admin/login",
  async (bodyData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`admin/login`, bodyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboard = createAsyncThunk(
  "admin/dashboard",
  async (bodyData = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`admin/dashboard`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const recentCampaigns = createAsyncThunk(
  "admin/recentCampaigns",
  async (bodyData = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`admin/recentCampaigns`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "admin//users",
  async (bodyData = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`admin//users`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllDoctors = createAsyncThunk(
  "admin/dentists",
  async (bodyData = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`admin/dentists`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const PendingDentists = createAsyncThunk(
  "admin/pending-dentist-profile",
  async (bodyData = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`admin/pending-dentist-profile`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveDentist = createAsyncThunk(
  "admin/approve-profile",
  async (bodyData, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `admin/approve-profile/${bodyData.id}` 
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getReportedPosts = createAsyncThunk(
  "admin/getReportedPosts",
  async (bodyData = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`admin/getReportedPosts`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveDisapproveReport = createAsyncThunk(
  "admin/approveDisapproveReport",
  async (bodyData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `admin/approveDisapproveReport/${bodyData.id}`,
        bodyData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "admin/deleteAccount",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`admin/deleteAccount/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const blockUnblock = createAsyncThunk(
  "admin/blockunblock",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`admin/blockunblock/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "admin/updatepassword",
  async (bodyData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`admin/updatepassword`, bodyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTcpp = createAsyncThunk(
  "admin/TcPp",
  async (bodyData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`admin/TcPp`, bodyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userLogout = createAsyncThunk(
  "admin/signout",
  async (bodyData = null, { rejectWithValue }) => {
    try {
      const response = await axios.post(`admin/signout`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const TcPp = createAsyncThunk(
  "getTcPp",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`getTcPp`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCategory = createAsyncThunk(
  "admin/categories",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.post(`admin/categories`, category);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategory = createAsyncThunk(
  "admin/allCategories",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/allCategories`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "admin/deletecategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`admin/deletecategory/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    token: (state) => {
      var user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        state.user = user;
      }
    },
  },
  extraReducers,
});
export const getUserStatus = (state) => state?.users?.status;
export const getUserError = (state) => state?.users?.error;
export const getUserToken = (state) => state?.users?.user?.user_authentication;
export const getProfile = (state) => state?.users?.user;
export const getTcPp = (state) => state?.users?.TcPp;
export const getAllCategories = (state) => state?.users?.categories;
export const getAllCharges = (state) => state?.users?.charges;
export const getDashboard = (state) => state?.users?.dashboard;
export const getareaChart = (state) => state?.users?.areaChart;
export const getlineChart = (state) => state?.users?.lineChart;
export const getcampaigns = (state) => state?.users?.campaigns;

export const { token } = userSlice.actions;

export default userSlice.reducer;
