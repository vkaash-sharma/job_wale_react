import "bootstrap/dist/css/bootstrap.min.css";
import "toastr/build/toastr.min.css";
import "./Assets/Styles/whoop.scss";
import "./Assets/Styles/responsive.scss";
import "react-image-crop/dist/ReactCrop.css";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./_pages/Login/Login";
import UserProfileView from "./_pages/User/UserProfileView";
import HeaderNav from "./components/Header/HeaderNav";
import EditProfile from "./_pages/User/EditUserProfile";
import ManagerProfile1 from "./_pages/Manager/ManagerProfile1";
// import UserDashboard1 from "./_pages/User/UserDashboard1";
import AwsCognito from "_pages/AwsCognito/AwsCongnito";
import CreateOpportunity from "./_pages/CreateOpportunity/CreateOpportunity1";
import Header from "components/Header/Header";
import PrivateRoute from "components/Routing/PrivateRoute";
import { auth_user, isLogin } from "_helpers/helper";
import { Suspense, lazy } from "react";
import UserDashboard1 from "_pages/User/UserDashboard1";
import Opportunity from "_pages/User/Opportunities/Opportunity";
import FeedbackScreen from "./_pages/Manager/FeedbackScreen";
import ManagerDashboard1 from "_pages/Manager/ManagerDashboard1";
import Home from "_pages/Login/Home";
import ApplicantProfile from "_pages/Manager/AppicantProfile";
import Register from "_pages/Login/Register";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-loading-skeleton/dist/skeleton.css";
import ChangePassword from "_pages/Login/ChangePassword";
import ForgotPassword from "_pages/Login/ForgotPassword";
import Notifications from "components/Notifications";
import AccountVerification from "_pages/Login/AccountVerification";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<h1>Loading...</h1>}>
        <HeaderNav />

        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/callback" element={<AwsCognito />} />
          <Route
            path="/auth/reset-password/:resetToken"
            element={<ChangePassword reset />}
          />
          <Route
            path="/auth/account-verify/:verifyToken"
            element={<AccountVerification />}
          />

          <Route path="/" element={<Login />} />

          <Route
            path="/register/complete-profile"
            element={<EditProfile register completeProfile />}
          />

          <Route path="/register" element={<Register />} />

          <Route path="/auth/forgot-password" element={<ForgotPassword />} />

          <Route element={<PrivateRoute />}>
            <Route path="/user/view" element={<UserProfileView />} />
            <Route path="/user/edit" element={<EditProfile />} />

            <Route path="/user/change-password" element={<ChangePassword />} />
            <Route path="/user/dashboard" element={<UserDashboard1 />}></Route>
            {/* <Route path="/user/dashboard" element={<UserDashboard />} /> */}
            <Route path="/create-opportunity" element={<CreateOpportunity />} />
            <Route
              path="/applicant/profile/:id"
              element={<ApplicantProfile />}
            />

            <Route path="/manager/profile/:id" element={<ApplicantProfile />} />

            {/* <Route path="/manager/profile" element={<Review />} /> */}
            {/* <Route path="/manager/profile" element={<ManagerProfile1 />} /> */}
            {/* <Route path="/opportunity/:id" element={<Opportunity />} /> */}
            <Route path="/manager/dashboard" element={<ManagerDashboard1 />} />
            {/* <Route path="/manager/dashboard" element={<ManagerDashboard />} /> */}

            <Route path="/notifications" element={<Notifications />} />

            <Route path="/manager/feedback/:id" element={<FeedbackScreen />} />
            <Route path="/user/feedback/:id" element={<FeedbackScreen />} />
            <Route
              path="/manager/completedFeedback/:id"
              element={<FeedbackScreen completed={true} />}
            />
          </Route>
          {/* Opportunities Details */}

          {/* <Route
            path="/opportunities/SunSmart-Global-UV-App"
            element={<SunSmartGlobalUVApp />}
          />
          <Route
            path="/opportunities/new-agreement-to-improve-global-access"
            element={<NewAgreementToImproveGlobal />}
          /> */}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
