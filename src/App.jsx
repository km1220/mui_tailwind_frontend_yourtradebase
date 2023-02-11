import React, { lazy, Suspense } from 'react'
import { useRoutes, BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

// import AppRouter from './routes';

const PrivateRoute = lazy(() => import('./layouts/auth/PrivateRoute'));
import Loading from '@components/LoadingPage';
const LogInPage = lazy(() => import('@pages/auth/LogInPage'));
const SignUpPage = lazy(() => import('@pages/auth/SignUpPage'));

const DefaultLayout = lazy(() => import('@layouts/DefaultLayout'));
const HomePage = lazy(() => import('@pages/HomePage'));
const DashboardPage = lazy(() => import('@pages/dashboard'));
const ContactUsPage = lazy(() => import('@pages/ContactUsPage'));

const SettingLayout = lazy(() => import('@layouts/setting/SettingLayout'));
const MaterialsPage = lazy(() => import('@pages/setting/MaterialsPage'));
const LabourRatesPage = lazy(() => import('@pages/setting/LabourRatesPage'));
const PriceListPage = lazy(() => import('@pages/setting/pricelist/index.jsx'));
const AddPriceListPage = lazy(() => import('@pages/setting/pricelist/AddPriceList'));
const EditPriceListPage = lazy(() => import('@pages/setting/pricelist/EditPriceList'));
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
            <Route index element={<Navigate to={userData.email_addr ? "/dashboard" : "/home"} replace />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />



            <Route path="/" element={<DefaultLayout />}>
              <Route path="home" element={<HomePage />} />
              <Route path="" element={<PrivateRoute />}>
                <Route path="dashboard" element={<DashboardPage />} />
              </Route>
              <Route path="contact_us" element={<ContactUsPage />} />
            </Route>

            <Route path="/setting">
              <Route element={<SettingLayout />}>
                <Route path="materials" element={<MaterialsPage />} />
                <Route path="labour_rates" element={<LabourRatesPage />} />
                <Route path="price_list" element={<PriceListPage />} />
                <Route index element={<Navigate to={"/setting/price_list"} replace />} />
                <Route path="*" element={<Navigate to={"/setting"} replace />} />
              </Route>
              <Route path="price_list/new" element={<AddPriceListPage />} />
              <Route path="price_list/:id" element={<EditPriceListPage />} />
            </Route>

            <Route path="/test" element={<TestComponent />} />

            <Route path="*" element={<Navigate to={"/"} replace />} />
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
