// src/interfaces/events/select.abstract.ts

export abstract class SelectEvents {
  abstract onSelect: (value: string | number) => void;
}