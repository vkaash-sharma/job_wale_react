import React, {  Suspense } from 'react';
import {  Routes, Route } from 'react-router-dom';
import Sidebar from '../components/atoms/sidebar/sidebar';
import {customeRoutes} from './lazy-load'
// import { Responsive } from '../pages/responsive/Responsive';
// import Grid from '../pages/grid/Grid';
export default function Navigation(props:any) {
  // const Users = lazy(() => {
  //     const result = import('./Users');
  //     result.then(a => console.log(a));
  //     return result;
  //   });
  // const HomeSreen = lazy(() => import('../pages/home/HomeSreen'))
  // const PostScreen = lazy(() => import('../pages/post/PostScreen'))
  // const {HomeSreen,PostScreen}=customeRoutes
  return (
    <div>
      {/* <Tabs></Tabs> */}
      <Sidebar>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route  path="/" element={<customeRoutes.HomeSreen />} />
          {/* <Route  path="/team-management" element={<customeRoutes.TeamManagementScreen />} /> 
          <Route  path="/team-management-list" element={<customeRoutes.TeamManagementListScreen />} />*/}
          <Route  path="/team-management" element={<customeRoutes.URT_Management />} />
          <Route  path="/create-team" element={<customeRoutes.CreateTeamScreen />} />
          <Route  path="/team" element={<customeRoutes.TeamScreen />} />

          <Route  path="/login" element={<customeRoutes.LoginScreen />} />
          <Route  path="/team-list" element={<customeRoutes.TeamList />} />
          <Route  path="/create-role" element={<customeRoutes.CreateRoleScreen />} />

          <Route  path="users/list" element={<customeRoutes.UsersList />} />
          <Route  path="users/manage-user-permissions" element={<customeRoutes.ManageUserPermissions />} />    

          <Route  path="contacts/list" element={<customeRoutes.ContactList />} />    
          <Route  path="contacts/details" element={<customeRoutes.ContactDetails />} />    
          <Route  path="contacts/trip-details" element={<customeRoutes.TripDetails />} />  


          {/*<Route  path="/post" element={<customeRoutes.PostScreen />} />
          <Route  path="/component" element={<customeRoutes.ComponentScreen />} />
          <Route  path="/form-validation" element={<customeRoutes.FormScreen />} />
          <Route  path="/grid" element={<customeRoutes.GridScreen />} />
          <Route  path="/responsive" element={<customeRoutes.CardList />} />
          <Route  path="/user-layout" element={<customeRoutes.UserComponent/>} />
           <Route  path="/grail-layout" element={<customeRoutes.GrailLayoutScreen />} />
          <Route  path="/image-galary" element={<customeRoutes.ImageGalaryScreen />} />
          <Route  path="/large-image" element={<customeRoutes.LargeImageScreen />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      </Sidebar>
    </div>
  );
}

function NotFound() {
  return <h2>NotFound</h2>;
}
