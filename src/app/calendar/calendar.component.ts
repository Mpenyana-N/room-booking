import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../data.service";
import {Booking} from "../model/Booking";
import {CommonModule, formatDate} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'mn-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

  bookings!: Array<Booking>;
  selectedDate!: string;



  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedDate = params['date'];
      if (!this.selectedDate) {
        this.selectedDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-ZA');
      }
      this.dataService.getBookings(this.selectedDate).subscribe((next) => {
        this.bookings = next;
      })
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

  dateChanged() {
    this.router.navigate([''], {queryParams: {date: this.selectedDate}})
  }

}
