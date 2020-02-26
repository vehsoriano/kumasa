import React from 'react';


const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

const Orders = React.lazy(() => import('./views/Kumasa/Orders'));
const Riders = React.lazy(() => import('./views/Kumasa/Riders'));
const Affiliates = React.lazy(() => import('./views/Kumasa/Affiliates'));




const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },  
  { path: '/users', exact: true,  name: 'Riders', component: Users },
  { path: '/users/:id', exact: true, name: 'Rider Details', component: User },
  // { path: '/kumasa', exact: true, name: 'Kumasa', component: Orders },
  { path: '/kumasa/orders', name: 'Orders', component: Orders },
  { path: '/kumasa/riders', name: 'Manage Riders', component: Riders },
  { path: '/kumasa/affiliates', name: 'Affiliates', component: Affiliates },
  


  
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
];

export default routes;
