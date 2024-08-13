import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  rooms: Array<Room>;

  constructor() {
    this.rooms = new Array<Room>();
    const room1 = new Room();
    room1.id = 1;
    room1.name = 'Blue room';
    room1.location = 'First floor';

    const capacity1 = new LayoutCapacity();
    capacity1.layout = Layout.THEATER;
    capacity1.capacity = 60;

    room1.capacities.push(capacity1);

    const room2 = new Room();
    room2.id = 2;
    room2.name = 'Red room';
    room2.location = 'Second floor'

    const capacity2 = new LayoutCapacity();
    capacity2.layout = Layout.USHAPE;
    capacity2.capacity = 20;

    room2.capacities.push(capacity2);

    this.rooms.push(room1);
    this.rooms.push(room2);
  }

}
