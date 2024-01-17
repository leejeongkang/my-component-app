import { Ref } from "vue";

export interface NavigationFunctionality {
  moveItem(currentItem: Ref<number | string>, item: number): void;
}
