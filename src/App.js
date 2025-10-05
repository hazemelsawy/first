import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NoMatch } from './NoMatch';
import { MedicalStaffDashboard } from './dashboard/MedicalStaff';
import { ImageGalleryDashboard } from './dashboard/ImageGallery';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ImageGallery } from './pages/ImageGallery';
import { MedicalStaff } from './pages/MedicalStaff';
import { Promotions } from './pages/Promotions';
import { Services } from './pages/Services';
import { BookingsPreview } from './pages/BookingsPreview';
import { Book } from './pages/Book';
import { ConfirmOrder } from './pages/ConfirmOrder';
import faq from './pages/FAQ';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';

//admin dashboard
import { DashboardPromotions } from './dashboard/Promotions';
import { Members } from './dashboard/Members';
import { Purchases } from './dashboard/Purchases';
import { Archive } from './dashboard/Archive';
import { Reports } from './dashboard/Reports';
import { Admin } from './dashboard/Admin';
import AboutDashboard from './dashboard/About';
import ContactDashboard from './dashboard/Contact';
import PrivacyPolicyDashboard from './dashboard/PrivacyPolicy';
import ServicesDashboard from './dashboard/Services';
import TermsAndConditionsDashboard from './dashboard/TermsAndConditions';
import JumbotronGallery from './dashboard/JumbotronGallery';

import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';



import { Signup } from './Signup';
import { Signin } from './Signin';
import { SigninDash } from './SigninDash';


function App() {

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path={["/", "/about", "/contact",
            "/image-gallery", "/medical-staff", "/promotions",
            "/services", "/book", "/confirm-order", "/terms-and-conditions", "/privacy-policy", "/faq", "/bookings-preview",
            "/signup", "/signin", "/signindash"]}>
            <MainLayout>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/image-gallery" component={ImageGallery} />
              <Route path="/medical-staff" component={MedicalStaff} />
              <Route path="/promotions" component={Promotions} />
              <Route path="/services" component={Services} />
              <Route path="/book" component={Book} />
              <Route path="/bookings-preview" component={BookingsPreview} />
              <Route path="/terms-and-conditions" component={TermsConditions} />
              <Route path="/privacy-policy" component={PrivacyPolicy} />
              <Route path="/faq" component={faq} />
              <Route path="/confirm-order" component={ConfirmOrder} />
              <Route path="/signup" component={Signup} />
              <Route path="/signin" component={Signin} />
              <Route path="/signindash" component={SigninDash} />
            </MainLayout >
          </Route>

          <Route
            path="/dashboard"
            render={({ match: { url } }) => {
              return (
                <DashboardLayout>
                  <Route path={`${url}/`} component={Purchases} exact />
                  <Route path={`${url}/promotions`} component={DashboardPromotions} />
                  <Route path={`${url}/members`} component={Members} />
                  <Route path={`${url}/purchases`} component={Purchases} />
                  <Route path={`${url}/archive`} component={Archive} />
                  <Route path={`${url}/reports`} component={Reports} />
                  <Route path={`${url}/medical-staff`} component={MedicalStaffDashboard} />
                  <Route path={`${url}/image-gallery`} component={ImageGalleryDashboard} />
                  <Route path={`${url}/admin`} component={Admin} />
                  <Route path={`${url}/About`} component={AboutDashboard} />
                  <Route path={`${url}/Contact`} component={ContactDashboard} />
                  <Route path={`${url}/privacy-policy`} component={PrivacyPolicyDashboard} />
                  <Route path={`${url}/services`} component={ServicesDashboard} />
                  <Route path={`${url}/terms-and-conditions`} component={TermsAndConditionsDashboard} />
                  <Route path={`${url}/jumbotron-gallery`} component={JumbotronGallery} />

                </DashboardLayout>
              )
            }}
          />
          <Route exact path={"/"}>
            <Route component={NoMatch} />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
