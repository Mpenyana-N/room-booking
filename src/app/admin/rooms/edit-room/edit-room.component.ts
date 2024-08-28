import {Component, Input, OnInit} from '@angular/core';
import {Layout, Room} from "../../../model/Room";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'mn-edit-room',
  standalone: true,
  //Importing the ReactiveFormsModule To work with Reactive Forms
  imports: [ReactiveFormsModule],
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.css'
})
export class EditRoomComponent implements OnInit{

 @Input({required: true}) room!: Room;

 // The Object.keys() static method returns an array of a given object's own enumerable string-keyed property names.
 layouts = Object.keys(Layout);

 layoutEnum: any = Layout;


  roomForm = new FormGroup({
    roomName: new FormControl('roomName'),
    location: new FormControl('location')
  })

  ngOnInit() {
    this.roomForm.patchValue({
      roomName: this.room.name,
      location: this.room.location
    })


  }

  onSubmit() {
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.controls['location'].value;
  }


}
