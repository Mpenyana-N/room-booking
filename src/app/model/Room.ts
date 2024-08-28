export class Room {
id?: number;
name?: string | null;
location?: string | null;
capacities = new Array<LayoutCapacity>();

}

export class LayoutCapacity {
  id?: number;
  layout?: Layout;
  capacity?: number;
}

export enum Layout {
  THEATER = 'Theater',
  USHAPE = 'U-shape',
  Board = 'Board meeting'
}
