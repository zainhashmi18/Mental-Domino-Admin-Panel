// import { toast } from "react-toastify";
import toast from 'react-hot-toast';
import axios from "axios";
import {
  addCategory,
  approveDisapproveReport,
  blockUnblock,
  dashboard,
  deleteAccount,
  deleteCategory,
  getAllDoctors,
  getAllUsers,
  getCategory,
  PendingDentists,
  getReportedPosts,
  recentCampaigns,
  signinUser,
  TcPp,
  updatePassword,
  updateTcpp,
  userLogout,
  approveDentist,
} from "../slices/userSlice";
export const extraReducers = (builder) => {
  builder

    // Sign In
    .addCase(signinUser.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(signinUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      toast.success(action.payload.message);
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      state.user = action.payload.data;
      axios.defaults.headers.common["Authorization"] = action.payload.data.user_authentication
      state.error = null;
    })
    .addCase(signinUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      toast.error(action.payload.message)
    })

    // Dashboard
    .addCase(dashboard.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(dashboard.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.dashboard = {
        totalCount: action.payload.data.totalUsers,
        userCount: action.payload.data.users,
        doctorCount: action.payload.data.doctor,
      };
      state.lineChart = action.payload.users;
      state.areaChart = action.payload.business;
    })
    .addCase(dashboard.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    })

    // Recent Campaigns
    .addCase(recentCampaigns.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(recentCampaigns.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.campaigns = action.payload.campaigns;
    })
    .addCase(recentCampaigns.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    })

    // update Password
    .addCase(updatePassword.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(updatePassword.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      toast.success(action.payload.message);
    })
    .addCase(updatePassword.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      toast.error(action.payload.message);
    })

    // Get Users
    .addCase(getAllUsers.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    })

    // Get Business
    .addCase(getAllDoctors.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(getAllDoctors.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
    })
    .addCase(getAllDoctors.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    })

    // Get Ads
    .addCase(PendingDentists.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(PendingDentists.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
    })
    .addCase(PendingDentists.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    })

    // Ads Management
    .addCase(approveDentist.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(approveDentist.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      toast.success(action.payload.message);
    })
    .addCase(approveDentist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    })

    // Get Reported Posts
    .addCase(getReportedPosts.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(getReportedPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
    })
    .addCase(getReportedPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    })

    // Report Management
    .addCase(approveDisapproveReport.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(approveDisapproveReport.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      toast.success(action.payload.message);
    })
    .addCase(approveDisapproveReport.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    })

    // Delete Account
    .addCase(deleteAccount.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(deleteAccount.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      toast.success(action.payload.message);
    })
    .addCase(deleteAccount.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      toast.error(action.payload.message);
    })

    // Block unBlock
    .addCase(blockUnblock.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(blockUnblock.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      toast.success(action.payload.message);
    })
    .addCase(blockUnblock.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      toast.error(action.payload.message);
    })

    // Log Out
    .addCase(userLogout.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(userLogout.fulfilled, (state, action) => {
      toast.success(action.payload.message);
      localStorage.clear();
      state.status = "succeeded";
      state.user = null;
      state.error = null;
      state.TcPp = null;
      state.categories = null;
      state.dashboard = null;
      state.lineChart = null;
      state.areaChart = null;
      state.charges = null;
      state.campaigns = null;
    })
    .addCase(userLogout.rejected, (state, action) => {
      toast.error(action.payload.message);
      state.status = "failed";
      state.error = action.payload.message;
    })

    // Get TcPp
    .addCase(TcPp.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(TcPp.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.TcPp = action.payload.tcAndPp;
    })
    .addCase(TcPp.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    })

    // Update TcPp
    .addCase(updateTcpp.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(updateTcpp.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.TcPp = action.payload.tcAndPp;
      toast.success(action.payload.message);
    })
    .addCase(updateTcpp.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
    })

    // Add Category
    .addCase(addCategory.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(addCategory.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      toast.success(action.payload.message);
    })
    .addCase(addCategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      toast.error(action.payload.message);
    })

    // Get Category
    .addCase(getCategory.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
      state.categories = null;
    })
    .addCase(getCategory.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.categories = action.payload.categories;
    })
    .addCase(getCategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.categories = null;
    })

    // Delete Category
    .addCase(deleteCategory.pending, (state, action) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(deleteCategory.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      toast.success(action.payload.message);
    })
    .addCase(deleteCategory.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload.message;
      state.categories = null;
    });
};
