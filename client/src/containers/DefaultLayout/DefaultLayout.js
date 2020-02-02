import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));


function DefaultLayout({...props}) {

  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  function signOut(e) {
    e.preventDefault()
    localStorage.removeItem('token')
    props.history.push('/')
  }

  const key = localStorage.getItem('token')

  
  return (
    <>
     { key ? (
         <div className="app">
         <AppHeader fixed>
           <Suspense  fallback={loading()}>
             <DefaultHeader onLogout={e=>signOut(e)}/>
           </Suspense>
         </AppHeader>
         <div className="app-body">
           <AppSidebar fixed display="lg">
             <AppSidebarHeader />
             <AppSidebarForm />
             <Suspense>
             <AppSidebarNav navConfig={navigation} {...props} router={router}/>
             </Suspense>
             <AppSidebarFooter />
             <AppSidebarMinimizer />
           </AppSidebar>
           <main className="main">
             <AppBreadcrumb appRoutes={routes} router={router}/>
             <Container fluid>
               <Suspense fallback={loading()}>
                 <Switch>
                   {routes.map((route, idx) => {
                     return route.component ? (
                       <Route
                         key={idx}
                         path={route.path}
                         exact={route.exact}
                         name={route.name}
                         render={props => (
                           <route.component {...props} />
                         )} />
                     ) : (null);
                   })}
                   {/* <Redirect from="/" to="/" /> */}
                 </Switch>
               </Suspense>
             </Container>
           </main>
           <AppAside fixed>
             <Suspense fallback={loading()}>
               <DefaultAside />
             </Suspense>
           </AppAside>
         </div>
         {/* <AppFooter>
           <Suspense fallback={this.loading()}>
             <DefaultFooter />
           </Suspense>
         </AppFooter> */}
       </div>
     ) : (
       <Redirect to="/" />
     )}
    </>
  );
}

export default DefaultLayout

