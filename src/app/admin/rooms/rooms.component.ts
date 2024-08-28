import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../model/Room";
import {RoomDetailComponent} from "./room-detail/room-detail.component";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {EditRoomComponent} from "./edit-room/edit-room.component";


@Component({
  selector: 'mn-rooms',
  standalone: true,
  imports: [RoomDetailComponent, EditRoomComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent implements OnInit{
rooms!: Array<Room>;
selectedRoom!: Room | any;
action!: string | any;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router) {


  }
  ngOnInit() : void {
    this.dataService.getRooms().subscribe((next) => {
      this.rooms = next;
    })
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];

      if(id) {
        this.selectedRoom = this.rooms.find((room) => {
          this.action = params['action'];
          return room.id === parseInt(id);
        });
      }
      if(params['action'] === 'add') {
        this.selectedRoom = new Room();
        this.action = 'edit';
      }
    });
  }

  setRoom(id: any) {
    this.router.navigate(['admin', 'rooms'], {queryParams: {id, action: 'view'}})
  }

  addRoom() {
    this.router.navigate(['admin', 'rooms'], {queryParams: {action: 'add'}})

  }
}
