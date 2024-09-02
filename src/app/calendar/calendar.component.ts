import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../data.service";
import {Booking} from "../model/Booking";
import {CommonModule} from "@angular/common";
import {BookingEditComponent} from "../booking-edit/booking-edit.component";
import {Router} from "@angular/router";

@Component({
  selector: 'mn-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

  bookings!: Array<Booking>;

  constructor(private dataService: DataService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.dataService.getBookings().subscribe((next) => {
      this.bookings = next;
    })
  }

  editBooking(id: number | any) {
    this.router.navigate(['bookingEdit'], {queryParams: {id}})
  }

  addBooking() {
    this.router.navigate(['addBooking']);
  }

  deleteBooking(id: number | any) {
    this.dataService.deleteMyBooking(id).subscribe();
  }

}
