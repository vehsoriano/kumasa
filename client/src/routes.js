import React from 'react';


const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));


const Orders = React.lazy(() => import('./views/Kumasa/Orders'));
const Riders = React.lazy(() => import('./views/Kumasa/Riders'));


const Modals = React.lazy(() => import('./views/Notifications/Modals'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },  
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  // { path: '/kumasa', exact: true, name: 'Kumasa', component: Orders },
  { path: '/kumasa/orders', name: 'Orders', component: Orders },
  { path: '/kumasa/riders', name: 'Riders', component: Riders },


  
  { path: '/notifications/modals', name: 'Modals', component: Modals },
];

export default routes;
