import { NavigationFunctionality } from "@/components/interfaces/functions/navigation.interface";
import { NavigationProps } from "@/components/interfaces/props/navigation.interface";
import { NavigationEvents } from "@/components/interfaces/events/navigation.interface";
import { Ref, ref } from "vue";
import { NavigationItemEnum } from "@/components/types/navigationItemEnum";

export class UseNavigationCompositionOptions
  implements NavigationProps, NavigationEvents, NavigationFunctionality
{
  data: Array<object>;
  activeItem?: Ref<number | string>;
  currentItemType?: NavigationItemEnum;
  moveItem(activeItem: Ref<number | string>, item: number | string): void {
    activeItem.value = item;
  }
}

export function navigationComposition(
  options: UseNavigationCompositionOptions,
) {
  const navigationComposition = new UseNavigationCompositionOptions();
  const activeItem = options.activeItem || ref<number>(0);
  const currentItemType = options.currentItemType;

  function activeCurrentItem(value: string, index: number) {
    if (currentItemType === NavigationItemEnum.String) {
      return value;
    } else if (currentItemType === NavigationItemEnum.Number) {
      return index;
    }
  }
  function handleMoveItem(item: number | string) {
    const moveItemFunctionality =
      options.moveItem || navigationComposition.moveItem;
    moveItemFunctionality(activeItem, item);
    options.onChange(item);
  }

  return {
    ...options,
    activeCurrentItem,
    handleMoveItem,
  };
}
