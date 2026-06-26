import { Routes } from '@angular/router';

import { About } from './component/about/about';
import { DocterDetails } from './component/docter-details/docter-details';
import { DocterSingleView } from './component/docter-single-view/docter-single-view';
import { Appointments } from './component/appointments/appointments';
import { Adminpannel } from './component/adminpannel/adminpannel';
import { Loginpage } from './component/loginpage/loginpage';
import { Registerpage } from './component/registerpage/registerpage';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { AddDoctor } from './component/add-doctor/add-doctor';
import { Update } from './component/update/update';
import { About2 } from './component/about2/about2';

import { DepartmentDoctor } from './component/department-doctor/department-doctor';
import { MainAbout } from './component/main-about/main-about';
import { Booking } from './component/booking/booking';
import { Booksuccsses } from './component/booksuccsses/booksuccsses';
import { Admindashboard } from './component/admindashboard/admindashboard';
import { AdminDepartment } from './component/admin-department/admin-department';
import { AddDepartment } from './component/add-department/add-department';
import { UpdateDepartment } from './component/update-department/update-department';
import { Adminappointment } from './component/adminappointment/adminappointment';
import { DoctorDashbord } from './component/doctor-dashbord/doctor-dashbord';
import { Profile } from './component/profile/profile';
import { UserDashbord } from './component/user-dashbord/user-dashbord';
import { ForgotPassword } from './component/forgot-password/forgot-password';
import { ResetPassword } from './component/reset-password/reset-password';
import { Unauthorized } from './component/unauthorized/unauthorized';

export const routes: Routes = [

  { path: 'about1', component: About },

  { path: 'details', component: DocterDetails },

  { path: 'doctor/:id', component: DocterSingleView },

  { path: 'login', component: Loginpage },
  
  { path: 'register', component: Registerpage },

  { 
    path: 'appointments', 
    component: Appointments,
    canActivate: [authGuard]
  },

  { 
    path: 'adminpannel', 
    component: Adminpannel,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] }
  },

  { 
    path: 'add', 
    component: AddDoctor,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] } 
  },

  { 
    path: 'update/:id', 
    component: Update,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] } 
  },

  { path: 'department/:id',component:About2},



  { path:"department",component:DepartmentDoctor},

  {path:"",component:MainAbout},
  // {path:"view",component:About2}

  {
    path:'booking',
    component:Booking

  },{
    path:"hiii",
    component:Booksuccsses
  },{
    path:"admin",
    component:Admindashboard,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] }
  },
 {
  path:'dp',
  component:AdminDepartment,
  canActivate: [authGuard, roleGuard],
  data: { roles: ['admin'] }
 },
 {
  path:'addd',
  component:AddDepartment,
  canActivate: [authGuard, roleGuard],
  data: { roles: ['admin'] }
 },

 {
  path: 'edit-department/:id',
  component: UpdateDepartment,
  canActivate: [authGuard, roleGuard],
  data: { roles: ['admin'] }
},
{
  path:'book',
  component:Appointments
},
{
  path:'appoint',
  component:Adminappointment,
  canActivate: [authGuard, roleGuard],
  data: { roles: ['admin'] }

},
  {
    path:'doctor-dashboard',
    component:DoctorDashbord,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['doctor', 'admin'] }
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard]
  },
  {
    path: 'user-dashboard',
    component: UserDashbord,
    canActivate: [authGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPassword
  },
  {
    path: 'reset-password',
    component: ResetPassword
  },
  {
    path: 'unauthorized',
    component: Unauthorized
  }

];
