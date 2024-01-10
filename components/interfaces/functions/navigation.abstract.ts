export abstract class NavigationFunctionality {
  abstract moveItem(currentItem: RefImpl, item: number): void;
  abstract moveNextItem(currentItem: RefImpl, item: number): void;
  abstract movePrevItem(currentItem: RefImpl): void;
}

type RefImpl = {
  value: any;
};
