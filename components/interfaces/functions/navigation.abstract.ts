import { Ref } from "vue";

export abstract class NavigationFunctionality {
  abstract moveItem(currentItem: Ref, item: number): void;
}
