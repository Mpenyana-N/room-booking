import {Component, Input} from '@angular/core';
import {Room} from "../../../model/Room";
import {Router} from "@angular/router";
import {DataService} from "../../../data.service";

@Component({
  selector: 'mn-room-detail',
  standalone: true,
  imports: [],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent {

@Input({required: true})  room!: Room;

constructor(private router: Router,
            private dataService: DataService) {
}

editRoom() : void {
  this.router.navigate(['admin', 'rooms'], {queryParams: {id: this.room.id, action: 'edit'}})
}

removeRoom() {
  this.dataService.deleteRoom(this.room.id).subscribe((next) => {
    this.router.navigate(['admin', 'rooms']);
  })
}

}
