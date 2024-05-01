export interface Member {
  id: number;
  name: string;
  level: Level;
  active: boolean;
}

export enum Level {
  Red = 'red',
  Blue = 'blue',
  Green = 'green',
  Yellow = 'yellow',
}
