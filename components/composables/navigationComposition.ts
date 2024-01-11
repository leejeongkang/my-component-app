import { NavigationFunctionality } from "@/components/interfaces/functions/navigation.abstract";
import { NavigationProps } from "@/components/interfaces/props/navigation.interface";
import { NavigationEvents } from "@/components/interfaces/events/navigation.abstract";
import { Ref, ref } from "vue";

class CustomNavigationFunctionality extends NavigationFunctionality {
  moveItem(currentItem: Ref, item: number): void {
    currentItem.value = item;
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

  return {
    ...options,
    moveItem,
  };
}
