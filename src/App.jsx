import React, { lazy, Suspense } from 'react'
import { useRoutes, BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RESET_ALERT } from '@store/actions';

import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

// import AppRouter from './routes';


const PublicRoute = lazy(() => import('./layouts/auth/PublicRoute'));
const PrivateRoute = lazy(() => import('./layouts/auth/PrivateRoute'));
import Loading from '@components/LoadingPage';
import Snackbar from '@components/Snackbar';
import { ClimbingBoxLoader } from 'react-spinners';
const LogInPage = lazy(() => import('@pages/auth/LogInPage'));
const SignUpPage = lazy(() => import('@pages/auth/SignUpPage'));

const DefaultLayout = lazy(() => import('@layouts/DefaultLayout'));
const HomePage = lazy(() => import('@pages/HomePage'));
const DashboardPage = lazy(() => import('@pages/dashboard'));
const ContactUsPage = lazy(() => import('@pages/ContactUsPage'));

const SettingLayout = lazy(() => import('@layouts/setting/SettingLayout'));
const ProfilePage = lazy(() => import('@pages/setting/user'));
const ChangePwdPage = lazy(() => import('@pages/setting/user/ChangePwd'));
const ReminderPage = lazy(() => import('@pages/setting/user/Reminder'));

const CompanyTaxPage = lazy(() => import('@pages/setting/company/CompanyTax'));
const LogosPage = lazy(() => import('@pages/setting/company/Logos'));
const QuoteDetailsPage = lazy(() => import('@pages/setting/company/QuoteDetails'));
const InvoiceDetailsPage = lazy(() => import('@pages/setting/company/InvoiceDetails'));
const ExtraCustomerInfoPage = lazy(() => import('@pages/setting/company/customer'));
const EmailTemplatesPage = lazy(() => import('@pages/setting/template/email'));
const AddEmailTemplatePage = lazy(() => import('@pages/setting/template/email/AddEmailTemplate'));
const EditEmailTemplatePage = lazy(() => import('@pages/setting/template/email/EditEmailTemplate'));
const NotificationsPage = lazy(() => import('@pages/setting/company/notification'));

const MaterialsPage = lazy(() => import('@pages/setting/material'));
const LabourRatesPage = lazy(() => import('@pages/setting/labour'));
const PriceListPage = lazy(() => import('@pages/setting/pricelist'));
const PriceListAddPage = lazy(() => import('@pages/setting/pricelist/AddPriceList'));
const PriceListEditPage = lazy(() => import('@pages/setting/pricelist/EditPriceList'));

const AutoMsgsPage = lazy(() => import('@pages/setting/powerup/AutoMsgs'));
const StripePage = lazy(() => import('@pages/setting/powerup/Stripe'));
const XeroPage = lazy(() => import('@pages/setting/powerup/Xero'));
const QuickBooksPage = lazy(() => import('@pages/setting/powerup/QuickBooks'));


const TeamManagePage = lazy(() => import('@pages/setting/team'));
const TeamAddPage = lazy(() => import('@pages/setting/team/AddTeammate'));
const TeamEditPage = lazy(() => import('@pages/setting/team/EditTeammate'));
const AccountManagePage = lazy(() => import('@pages/setting/account'));


const CustomerPage = lazy(() => import('@pages/customer'));
const CustomerAddPage = lazy(() => import('@pages/customer/AddCustomer'));
const CustomerEditPage = lazy(() => import('@pages/customer/EditCustomer'));
const QuotePage = lazy(() => import('@pages/quote'));
const QuoteAddPage = lazy(() => import('@pages/quote/AddQuote'));
const QuoteEditPage = lazy(() => import('@pages/quote/EditQuote'));
const TaskPage = lazy(() => import('@pages/task'));
const TaskAddPage = lazy(() => import('@pages/task/AddTask'));
const TaskEditPage = lazy(() => import('@pages/task/EditTask'));
const JobPage = lazy(() => import('@pages/job'));
const JobAddPage = lazy(() => import('@pages/job/AddJob'));
// const JobEditPage = lazy(() => import('@pages/task/EditJob'));
const InvoicePage = lazy(() => import('@pages/invoice'));
const InvoiceAddPage = lazy(() => import('@pages/invoice/AddInvoice'));
// const JobEditPage = lazy(() => import('@pages/task/EditJob'));
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
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const { userData, isLoading, alert } = useSelector(state => ({
		userData: state.user,
		isLoading: state.loading_status,
		alert: state.alert
	}));
	// console.log('redux data: ', userData, isLoading, alert);

	return (
		<Suspense fallback={<Loading />}>

			{isLoading ?
				<div className='flex items-center justify-center w-full min-h-screen'>
					{/* <ClimbingBoxLoader size='1.5rem' /> */}
					<Loading />
				</div>
				:
				<>
					<Router>
						<div className={clsx(classes.root)}>
							{/* <AppRouter /> */}
							<Routes>
								<Route index element={<Navigate to={userData.id ? "/dashboard" : "/home"} replace />} />

								<Route element={<PublicRoute />}>
									<Route path="/login" element={<LogInPage />} />
									<Route path="/signup" element={<SignUpPage />} />
									<Route element={<DefaultLayout />}>
										<Route path="home" element={<HomePage />} />
									</Route>
								</Route>

								<Route element={<PrivateRoute />}>
									<Route element={<DefaultLayout />}>
										<Route path="dashboard" element={<DashboardPage />} />

										<Route path="customer" element={<CustomerPage />} />
										<Route path="customer/new" element={<CustomerAddPage />} />
										<Route path="customer/:id" element={<CustomerEditPage />} />

										<Route path="quote" element={<QuotePage />} />
										<Route path="quote/new" element={<QuoteAddPage />} />
										<Route path="quote/:id" element={<QuoteEditPage />} />

										<Route path="job" element={<JobPage />} />
										<Route path="job/new" element={<JobAddPage />} />
										{/* <Route path="job/:id" element={<JobEditPage />} /> */}

										<Route path="invoice" element={<InvoicePage />} />
										<Route path="invoice/new" element={<InvoiceAddPage />} />
										{/* <Route path="job/:id" element={<JobEditPage />} /> */}

										<Route path="task" element={<TaskPage />} />
										<Route path="task/new" element={<TaskAddPage />} />
										<Route path="task/:id" element={<TaskEditPage />} />
									</Route>
									<Route path="contact_us" element={<ContactUsPage />} />
								</Route>

								<Route path="/setting">
									<Route element={<PrivateRoute />}>
										<Route element={<SettingLayout />}>
											<Route path="profile" /* index */ element={<ProfilePage />} />
											<Route path="change_password" element={<ChangePwdPage />} />
											<Route path="reminder" element={<ReminderPage />} />

											<Route path="company_tax" element={<CompanyTaxPage />} />
											<Route path="logo" element={<LogosPage />} />
											<Route path="quote" element={<QuoteDetailsPage />} />
											<Route path="invoice" element={<InvoiceDetailsPage />} />
											<Route path="customer/extra_info" element={<ExtraCustomerInfoPage />} />
											<Route path="template/email" element={<EmailTemplatesPage />} />
											<Route path="notification" element={<NotificationsPage />} />

											<Route path="material" element={<MaterialsPage />} />
											<Route path="labour_rate" element={<LabourRatesPage />} />
											<Route path="price_list" element={<PriceListPage />} />

											<Route path="automation_categories" element={<AutoMsgsPage />} />
											<Route path="stripe/connection" element={<StripePage />} />
											<Route path="xero/connection" element={<XeroPage />} />
											<Route path="quickbooks/connection" element={<QuickBooksPage />} />


											<Route path="team" element={<TeamManagePage />} />
											<Route path="account" element={<AccountManagePage />} />

											<Route index element={<Navigate to={"/setting/profile"} replace />} />
											<Route path="*" element={<Navigate to={"/setting"} replace />} />
										</Route>
										<Route path="price_list/new" element={<PriceListAddPage />} />
										<Route path="price_list/:id" element={<PriceListEditPage />} />
										<Route path="team/new" element={<TeamAddPage />} />
										<Route path="team/:id" element={<TeamEditPage />} />
										<Route path="template/email/new" element={<AddEmailTemplatePage />} />
										<Route path="template/email/:id" element={<EditEmailTemplatePage />} />
									</Route>
								</Route>

								<Route path="/test" element={<TestComponent />} />
								<Route path="*" element={<Navigate to={"/"} replace />} />
							</Routes>
						</div>
					</Router>

					{alert.open &&
						<Snackbar open={alert.open} onClose={() => dispatch(RESET_ALERT())}
							autoHideDuration={alert.time} severity={alert.type} message={alert.message}
						/>
					}
				</>
			}

		</Suspense >
	);
}

export default App;
