import {Component, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../model/Room";
import {RoomDetailComponent} from "./room-detail/room-detail.component";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";


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
          return room.id === parseInt(id);
        });
      }
    });
  }

  setRoom(id: any) {
    this.router.navigate(['admin', 'rooms'], {queryParams: {id}})
  }
}
