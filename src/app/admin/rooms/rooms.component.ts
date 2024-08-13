import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../model/Room";
import {RoomDetailComponent} from "./room-detail/room-detail.component";


@Component({
  selector: 'mn-rooms',
  standalone: true,
  imports: [RoomDetailComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit{
rooms!: Array<Room>;
selectedRoom!: Room | any;
  constructor(private dataService: DataService) {
  }
  ngOnInit() : void {
    this.rooms = this.dataService.rooms;
  }

  setRoom(id: any) {
    this.selectedRoom = this.rooms.find((room) => {
      return room.id === id;
    })
  }
}
