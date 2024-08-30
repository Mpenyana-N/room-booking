export class Room {
id?: number;
name?: string | null;
location?: string | null;
capacities = new Array<LayoutCapacity>();

}

export class LayoutCapacity {
  id?: number;
  layout?: string;
  capacity?: string | null;
}

export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-shape',
  Board = 'Board meeting'
}
