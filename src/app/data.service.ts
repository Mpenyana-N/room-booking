import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";
import {User} from "./model/User";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

 private rooms: Array<Room>;
 private users: Array<User>;

 getRooms() : Observable<Array<Room>> {
   return of(this.rooms);
 }

 getUsers() : Observable<Array<User>> {
   return of(this.users)
 }

 updateUser(user: User) : Observable<any> {
  const originalUser = this.users.find((u) => u.id === user.id);
  if (originalUser) {
    originalUser.name = user.name;
  }
   return of(originalUser);

 }

 addNewUser(newUser: User, password: string) : Observable<User> {
   let id: any = 0;
   for (const user of this.users) {
     if (user.id) {
       if (user.id > id) {
         id = user.id
       }
     }
   }
   newUser.id = id + 1;
   this.users.push(newUser);
   return of(newUser);
 }

  constructor() {
    this.rooms = new Array<Room>();
    const room1 = new Room();
    room1.id = 1;
    room1.name = 'Blue room';
    room1.location = 'First floor';

    const capacity1 = new LayoutCapacity();
    capacity1.layout = Layout.THEATER;
    capacity1.capacity = '60';

    room1.capacities.push(capacity1);

    const room2 = new Room();
    room2.id = 2;
    room2.name = 'Red room';
    room2.location = 'Second floor'

    const capacity2 = new LayoutCapacity();
    capacity2.layout = Layout.USHAPE;
    capacity2.capacity = '20';

    room2.capacities.push(capacity2);

    this.rooms.push(room1);
    this.rooms.push(room2);

    this.users = new Array<User>();
    const user1 = new User();
    user1.id = 1;
    user1.name = 'Nick';

    const user2 = new User();
    user2.id = 2;
    user2.name = 'Matt';

    this.users.push(user1);
    this.users.push(user2);

  }

}
