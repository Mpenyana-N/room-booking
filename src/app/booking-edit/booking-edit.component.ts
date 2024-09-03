import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../model/Booking";
import {FormsModule} from "@angular/forms";
import {Layout, Room} from "../model/Room";
import {User} from "../model/User";
import {DataService} from "../data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {formatDate} from "@angular/common";

@Component({
  selector: 'mn-booking-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booking-edit.component.html',
  styleUrl: './booking-edit.component.css'
})
export class BookingEditComponent implements OnInit {

booking!: Booking;
rooms!: Array<Room>;
users!: Array<User>;
layouts = Object.keys(Layout);

layoutEnum: typeof Layout | any =  Layout;


constructor(private dataService: DataService,
            private route: ActivatedRoute,
            private router: Router) {
}

  ngOnInit(): void {
    this.dataService.getRooms().subscribe((next) => {
      this.rooms = next;
    })

    this.dataService.getUsers().subscribe((next) => this.users = next);


      const id = this.route.snapshot.queryParams['id'];
      if (id) {
        this.dataService.getBooking(+id).subscribe((next) => {
          this.booking = next;
        })
      } else {
        this.booking = new Booking();
      }

  }


  onSubmit() {
  if (this.booking.id != null) {
    this.dataService.saveBooking(this.booking).subscribe((next) => {
      this.router.navigate(['']);
    })
  } else {
    this.dataService.addNewBooking(this.booking).subscribe((next) => {
      this.router.navigate(['']);
    })
  }


  }



}
