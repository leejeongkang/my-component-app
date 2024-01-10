import { Ref } from "vue";

export abstract class NavigationFunctionality {
  abstract moveItem(currentItem: Ref, item: number): void;
  abstract moveNextItem(currentItem: Ref, item: number): void;
  abstract movePrevItem(currentItem: Ref): void;
}
