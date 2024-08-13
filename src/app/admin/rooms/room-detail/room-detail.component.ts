import {Component, Input} from '@angular/core';
import {Room} from "../../../model/Room";

@Component({
  selector: 'mn-room-detail',
  standalone: true,
  imports: [],
  templateUrl: './room-detail.component.html',
  styleUrl: './room-detail.component.css'
})
export class RoomDetailComponent {

@Input({required: true})  room!: Room;

}
