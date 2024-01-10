import { NavigationFunctionality } from "@/components/interfaces/functions/navigation.abstract";
import { NavigationProps } from "@/components/interfaces/props/navigation.interface";
import { NavigationEvents } from "@/components/interfaces/events/navigation.abstract";
import { Ref, ref } from "vue";

class CustomNavigationFunctionality extends NavigationFunctionality {
  moveItem(currentItem: Ref, item: number): void {
    currentItem.value = item;
  }
  moveNextItem(currentItem: Ref, dataLen: number): void {
    if (currentItem.value + 1 < dataLen) {
      currentItem.value++;
    } else {
      alert("data 길이 초과");
    }
  }
  movePrevItem(currentItem: Ref): void {
    if (currentItem.value - 1 >= 0) {
      currentItem.value--;
    } else {
      alert("0 보다 적게 이동 불가능");
    }
  }
}

export interface UseNavigationCompositionOptions
  extends NavigationProps,
    NavigationEvents {
  currentItem: Ref<number>;
  functionality?: NavigationFunctionality;
}

export function navigationComposition(
  options: UseNavigationCompositionOptions,
) {
  const currentItem = options.currentItem || ref<number>(0);

  function moveItem(item: number) {
    const functionality =
      options.functionality || new CustomNavigationFunctionality();
    functionality.moveItem(currentItem, item);
    options.onChange(item);
  }
  function moveNextItem() {
    const functionality =
      options.functionality || new CustomNavigationFunctionality();
    functionality.moveNextItem(currentItem, options.data.length);
    options.onChange(currentItem.value);
  }
  function movePrevItem() {
    const functionality =
      options.functionality || new CustomNavigationFunctionality();
    functionality.movePrevItem(currentItem);
    options.onChange(currentItem.value);
  }

  return {
    ...options,
    currentItem,
    moveItem,
    moveNextItem,
    movePrevItem,
  };
}
