import {Component} from '@angular/core';
import {DataService} from "../../data.service";
import {Room} from "../../model/Room";


@Component({
  selector: 'mn-rooms',
  standalone: true,
  imports: [],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.css'
})
export class RoomsComponent {
rooms!: Array<Room>;
  constructor(private dataService: DataService) {
  }

}
