import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "../../../model/Room";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";
import {FormResetService} from "../../../form-reset.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'mn-edit-room',
  standalone: true,
  //Importing the ReactiveFormsModule To work with Reactive Forms
  imports: [ReactiveFormsModule],
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.css'
})
export class EditRoomComponent implements OnInit, OnDestroy{

 @Input({required: true}) room!: Room;

 // The Object.keys() static method returns an array of a given object's own enumerable string-keyed property names.
  layouts = Object.keys(Layout) as Array<keyof typeof Layout>;

  layoutEnum: any = Layout;

  resetRoomFormEvent: typeof Subscription | any = Subscription;


  roomForm!: FormGroup<{
    roomName: FormControl<string | null>;
    location: FormControl<string | null>;
    // A specific type assertion is added to the roomForm to indicate that it can have additional string keys with FormControl<string | null> values.
    [key: string]: FormControl<string | any>;
  }>;


  constructor(private fb: FormBuilder,
              private dataService: DataService,
              private router: Router,
              private formResetService: FormResetService) {
 }

  ngOnInit(): void {
  //  Then we call our method here
    this.initializeForm();
  //  Here we subscribe.
    this.formResetService.resetRoomFormEvent.subscribe((room) => {
      this.room = room;
      this.initializeForm();
    })

  }


  //Moving the code in ngOnInit() method to a new method to fix the lifecycle bug.

  initializeForm() {

    this.roomForm = this.fb.group({
      roomName: this.fb.control('roomName', Validators.required),
      location: this.fb.control('location', Validators.required)
    });

    for (const layout of this.layouts) {
      //finding our initial layout capacity values.Note the "Layout" is our enum
      const layoutCapacity = this.room.capacities.find((lc) => lc.layout === Layout[layout]);
      //when we get our layoutCapacity we then add it to our initialCapacity.
      const initialCapacity = layoutCapacity == null ? '0' : layoutCapacity.capacity;
      this.roomForm.addControl(
        `layout${layout}`,
        this.fb.control(initialCapacity)
      );

    }
  }

  onSubmit() {
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.controls['location'].value;
    this.room.capacities = new Array<LayoutCapacity>();

    for (const layout of this.layouts) {
      const layoutCapacity = new LayoutCapacity();
      layoutCapacity.layout = Layout[layout];
      layoutCapacity.capacity = this.roomForm.controls[`layout${layout}`].value;
      this.room.capacities.push(layoutCapacity);

    }
    if (this.room.id == null) {
      this.dataService.addNewRoom(this.room).subscribe((next) => {
        this.router.navigate(['admin', 'rooms'], {queryParams: {action: 'view', id: next.id}});

      })
    } else {
      this.dataService.updateRoom(this.room).subscribe((next) => {
        this.router.navigate(['admin', 'rooms'], {queryParams: {action: 'view', id: next.id}});

      });
    }
  }

  ngOnDestroy() {
    if (!this.resetRoomFormEvent) {
      this.resetRoomFormEvent.unsubscribe();
    }
  }


}
