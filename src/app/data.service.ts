import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";
import {User} from "./model/User";
import {Observable, of} from "rxjs";
import {Booking} from "./model/Booking";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DataService {

 private rooms: Array<Room>;
 private users: Array<User>;
 private bookings: Array<Booking>;

 getRooms() : Observable<Array<Room>> {
   return of(this.rooms);
 }

 getUsers() : Observable<Array<User>> {
   return of(this.users)
 }

 getBookings(date: string | any) : Observable<Array<Booking>> {
   return  of(this.bookings.filter((d) => d.date === date));
 }

 getBooking(id: number) : Observable<Booking | any> {
   return of(this.bookings.find((b) => b.id === id))
 }

 updateUser(user: User) : Observable<any> {
  const originalUser = this.users.find((u) => u.id === user.id);
  if (originalUser) {
    originalUser.name = user.name;
  }
   return of(originalUser);

 }

 updateRoom(room: Room) : Observable<any> {
   const originalRoom = this.rooms.find((r) => r.id === room.id);
   if (originalRoom) {
     originalRoom.name = room.name;
   }
   return of(originalRoom);
 }

 saveBooking(booking: Booking) : Observable<Booking | any> {
  booking = new Booking();
   const existingBooking = this.bookings.find((b) => b.id === booking.id);
   if (existingBooking) {
     existingBooking.id = booking.id;
     existingBooking.date = booking.date;
     existingBooking.user = booking.user;
     existingBooking.room = booking.room;
     existingBooking.layout = booking.layout;
     existingBooking.title = booking.title;
     existingBooking.participants = booking.participants;
     existingBooking.endTime = booking.endTime;
     existingBooking.startTime = booking.startTime;
   }
   return of(existingBooking);
 }

 addNewRoom(newRoom: Room) : Observable<Room> {
   let id: number | null = 0;
   for (const room of this.rooms) {
     if(room.id) {
       if (room.id > id) {
         id = room.id
       }
     }
   }
   newRoom.id = id + 1;
   this.rooms.push(newRoom);
   return  of(newRoom);
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

 addNewBooking(newBooking: Booking) : Observable<Booking> {
   let id: number | any = 0;
   for (let booking of this.bookings) {
     if (booking.id) {
       if (booking.id > id) {
         id = booking.id
       }
     }
   }
   newBooking.id = id + 1;
   this.bookings.push(newBooking);
   return of(newBooking);
 }

 deleteMyBooking(id: number | undefined) : Observable<any> {
   const delBooking = this.rooms.find((r) => r.id === id);
   if (delBooking) {
     this.bookings.splice(this.rooms.indexOf(delBooking), 1);
   }
   return of(null)
 }

  deleteRoom(id: number | undefined) : Observable<any> {
   const delRoom = this.rooms.find((r) => r.id === id);
   if(delRoom) {
     this.rooms.splice(this.rooms.indexOf(delRoom), 1)
   }
   return of(null);
 }

  deleteUser(id: number | undefined) : Observable<any> {
   const user = this.users.find((u) => u.id === id)
    if (user) {
      this.users.splice(this.users.indexOf(user), 1)

    }
   return of(null)
 }

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

    this.users = new Array<User>();
    const user1 = new User();
    user1.id = 1;
    user1.name = 'Nick';

    const user2 = new User();
    user2.id = 2;
    user2.name = 'Matt';

    this.users.push(user1);
    this.users.push(user2);

    this.bookings = new Array<Booking>();
    const booking1 = new Booking();
    booking1.id = 1;
    booking1.title = 'Meeting Conference With the CEO';
    booking1.layout = Layout.USHAPE;
    booking1.user = user1;
    booking1.room = room1;
    booking1.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-ZA');
    booking1.endTime = '12:00';
    booking1.startTime = '09:00';
    booking1.participants = 20;


    const booking2 = new Booking();
    booking2.id = 1;
    booking2.title = 'Meeting with the investors';
    booking2.layout = Layout.THEATER;
    booking2.user = user2;
    booking2.room = room2;
    booking2.date = formatDate(new Date(), 'yyyy-MM-dd', 'en-ZA');
    booking2.endTime = '08:00';
    booking2.startTime = '11:00';
    booking2.participants = 40;

    this.bookings.push(booking1);
    this.bookings.push(booking2);


  }

}
