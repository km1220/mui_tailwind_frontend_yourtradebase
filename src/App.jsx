import React, { lazy, Suspense } from 'react'
import { useRoutes, BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

// import AppRouter from './routes';

import Loading from '@components/LoadingPage';
const LogInPage = lazy(() => import('@pages/auth/LogInPage'));
const SignUpPage = lazy(() => import('@pages/auth/SignUpPage'));
const HomePage = lazy(() => import('@pages/HomePage'));
const DashboardPage = lazy(() => import('@pages/Dashboard'));
const ContactUsPage = lazy(() => import('@pages/ContactUsPage'));
import TestComponent from './test.component';



const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#F5F5F5',
  }
}))

function App(props) {
  const classes = useStyles(props)
  const userData = useSelector(state => state.user)

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <div className={clsx(classes.root, "App flex flex-col items-center")}>
          {/* <AppRouter /> */}
          <Routes>
            <Route path="/" element={<Navigate to={userData.email_addr ? "/dashboard" : "/home"} replace />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />


            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard" element={<PrivateRoute> <DashboardPage /> </PrivateRoute>} />
            <Route path="/contact_us" element={<ContactUsPage />} />

            <Route path="/test" element={<TestComponent />} />

            <Route path="*" element={<Navigate to={"/"} replace />} />
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

let isLogged = true;
const PublicRoute = ({ children }) => (
  children
);
const PrivateRoute = ({ children }) => {
  const userData = useSelector(state => state.user)

  return (
    userData.email_addr ? children : <Navigate to='/login' replace />
  )
}

const LoadingMessage = () => (
  "I'm loading..."
)


export default App;
