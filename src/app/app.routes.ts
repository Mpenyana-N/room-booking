import { Routes } from '@angular/router';
import {RoomsComponent} from "./admin/rooms/rooms.component";
import {UsersComponent} from "./admin/users/users.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {BookingEditComponent} from "./booking-edit/booking-edit.component";

export const routes: Routes = [
  {path: 'admin/users', component: UsersComponent},
  {path: 'admin/rooms', component: RoomsComponent},
  {path: '', component: CalendarComponent},
  {path:'bookingEdit', component: BookingEditComponent},
  {path:'addBooking', component: BookingEditComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}
];
