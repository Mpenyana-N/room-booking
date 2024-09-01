import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Booking} from "../model/Booking";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'mn-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

  bookings!: Array<Booking>;


  constructor(private dataService: DataService ) {

  }

  ngOnInit(): void {
    this.dataService.getBookings().subscribe((next) => {
      this.bookings = next;
    })

    console.log(this.bookings)

  }



}
