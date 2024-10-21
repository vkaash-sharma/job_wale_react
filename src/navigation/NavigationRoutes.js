import CreateOpportunity from '_pages/CreateOpportunity/CreateOpportunity1';
import EditUserProfile from '_pages/User/EditProfile';
import UserProfileView from '_pages/User/UserProfileView';
import HeaderNav from 'components/Header/HeaderNav';
import React, { lazy, useEffect } from 'react';
import { Route, Routes, Outlet, Link, useNavigate } from 'react-router-dom';


const UserDashboard1 = lazy(() =>
  import('../_pages/User/UserDashboard1')
);

// Import other components in the same way

function RoutesPath() {
  return (
    <div className="wrapper">
      <HeaderNav />
      <div id="content-page" className="content-page">
        <div className="container-fluid">
          <Routes>
          <Route path="/user/edit" element={<EditUserProfile />} /> 
          <Route path="/user/view" element={<UserProfileView />} />
          <Route path="/create-opportunity" element={<CreateOpportunity />} />
          <Route path="/user/dashboard" element={<UserDashboard1 />} /> 
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default RoutesPath;
