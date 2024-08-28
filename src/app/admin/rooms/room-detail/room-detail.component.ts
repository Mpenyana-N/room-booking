import {Component, Input} from '@angular/core';
import {Room} from "../../../model/Room";
import {Router} from "@angular/router";

@Component({
  selector: 'mn-room-detail',
  standalone: true,
  imports: [],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent {

@Input({required: true})  room!: Room;

constructor(private router: Router) {
}

editRoom() : void {
  this.router.navigate(['admin', 'rooms'], {queryParams: {id: this.room.id, action: 'edit'}})
}

}
