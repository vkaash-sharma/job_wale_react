import { lazy } from 'react';

export const customeRoutes={
     HomeSreen: lazy(() => import('../pages/home/HomeSreen')),
     PostScreen : lazy(() => import('../pages/post/PostScreen')),
     FormScreen : lazy(() => import('../pages/Form/FormValidation')),
     UserComponent : lazy(() => import('../layout/user/user')),
     //TeamManagementScreen : lazy(() => import('../pages/TeamManagement/TeamManagementScreen')),
     // TeamManagementListScreen : lazy(() => import('../pages/TeamManagement/TeamManagementListScreen')),
     TeamScreen : lazy(() => import('../pages/URT_management/team/team-screen')),
     URT_Management: lazy(() => import('../pages/URT_management/index')),
     CreateTeamScreen: lazy(() => import('../pages/CreateTeam/CreateTeam')),
     CreateRoleScreen: lazy(() => import('../pages/CreateRole/CreateRole')),
     LoginScreen: lazy(() => import('../pages/Login/Login')),
     TeamList: lazy(() => import('../pages/TeamList/TeamList')),
     UsersList: lazy(() => import('../pages/UserManagement/UsersList')),
     ManageUserPermissions: lazy(() => import('../pages/UserManagement/ManageUserPermissions')),
     ContactList: lazy(() => import('../pages/Contacts/ContactList')),
     ContactDetails: lazy(() => import('../pages/Contacts/ContactDetails')),
     TripDetails: lazy(() => import('../pages/Contacts/TripDetails')),
     
}

export const componentRoutes={
     HomeSreen: lazy(() => import('../pages/home/HomeSreen')),
     PostScreen : lazy(() => import('../pages/post/PostScreen')),
}