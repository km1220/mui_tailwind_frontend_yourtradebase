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
const MaterialsPage = lazy(() => import('@pages/setting/material'));
const LabourRatesPage = lazy(() => import('@pages/setting/labour'));
const PriceListPage = lazy(() => import('@pages/setting/pricelist'));
const PriceListAddPage = lazy(() => import('@pages/setting/pricelist/AddPriceList'));
const PriceListEditPage = lazy(() => import('@pages/setting/pricelist/EditPriceList'));
const TeamManagePage = lazy(() => import('@pages/setting/team'));
const TeamAddPage = lazy(() => import('@pages/setting/team/AddTeammate'));


const CustomerPage = lazy(() => import('@pages/customer'));
const CustomerAddPage = lazy(() => import('@pages/customer/AddCustomer'));
const CustomerEditPage = lazy(() => import('@pages/customer/EditCustomer'));
const QuotePage = lazy(() => import('@pages/quote'));
const QuoteAddPage = lazy(() => import('@pages/quote/AddQuote'));
const QuoteEditPage = lazy(() => import('@pages/quote/EditQuote'));
const TaskPage = lazy(() => import('@pages/task'));
const TaskAddPage = lazy(() => import('@pages/task/AddTask'));
const TaskEditPage = lazy(() => import('@pages/task/EditTask'));
import TestComponent from './test.component';



const useStyles = makeStyles(theme => ({
  root: {
    // width: '100vw',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    // backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}))

function App(props) {
  const classes = useStyles(props)
  const userData = useSelector(state => state.user)

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <div className={clsx(classes.root)}>
          {/* <AppRouter /> */}
          <Routes>
            <Route index element={<Navigate to={userData.email_addr ? "/dashboard" : "/home"} replace />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />



            <Route path="/" element={<DefaultLayout />}>
              <Route path="home" element={<HomePage />} />
              <Route element={<PrivateRoute />}>
                <Route path="dashboard" element={<DashboardPage />} />

                <Route path="customer" element={<CustomerPage />} />
                <Route path="customer/new" element={<CustomerAddPage />} />
                <Route path="customer/:id" element={<CustomerEditPage />} />

                <Route path="quote" element={<QuotePage />} />
                <Route path="quote/new" element={<QuoteAddPage />} />
                <Route path="quote/:id" element={<QuoteEditPage />} />

                <Route path="task" element={<TaskPage />} />
                <Route path="task/new" element={<TaskAddPage />} />
                <Route path="task/:id" element={<TaskEditPage />} />
              </Route>
              <Route path="contact_us" element={<ContactUsPage />} />
            </Route>

            <Route path="/setting">
              <Route element={<SettingLayout />}>
                <Route path="material" element={<MaterialsPage />} />
                <Route path="labour_rate" element={<LabourRatesPage />} />
                <Route path="price_list" element={<PriceListPage />} />
                <Route path="team" element={<TeamManagePage />} />

                <Route index element={<Navigate to={"/setting/material"} replace />} />
                <Route path="*" element={<Navigate to={"/setting"} replace />} />
              </Route>
              <Route path="price_list/new" element={<PriceListAddPage />} />
              <Route path="price_list/:id" element={<PriceListEditPage />} />
              <Route path="team/new" element={<TeamAddPage />} />
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
