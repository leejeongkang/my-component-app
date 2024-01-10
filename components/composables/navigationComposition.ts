import { NavigationFunctionality } from "@/components/interfaces/functions/navigation.abstract";
import { NavigationProps } from "@/components/interfaces/props/navigation.interface";
import { NavigationEvents } from "@/components/interfaces/events/navigation.abstract";
import { Ref, ref } from "vue";

class CustomNavigationFunctionality extends NavigationFunctionality {
  // implements UseNavigationCompositionOptions
  //currentItem: Ref<number>;
  // currentItem: Ref<number> = 0;
  // constructor(options: UseNavigationCompositionOptions) {
  //   //TODO: super, constructor
  //   super();
  //   // super(options);
  //   this.currentItem = options.currentItem || ref<number>(0);
  // }
  moveItem(currentItem: RefImpl, item: number): void {
    currentItem.value = item;
  }
  moveNextItem(currentItem: RefImpl, dataLen: number): void {
    if (currentItem.value + 1 < dataLen) {
      currentItem.value++;
    } else {
      alert("data 길이 초과");
    }
  }
  //TODO: navigationComposition 에서 currentItem 넘기면 RefImplement 라 타입 지정 필요함
  // currentItem 을 이 클래스에서 상속받아오는게 맞는건지 navigationComposition 여기서 파라미터로 넘기는게 맞는건지
  // 궁금
  movePrevItem(currentItem: RefImpl): void {
    if (currentItem.value - 1 >= 0) {
      currentItem.value--;
    } else {
      alert("0 보다 적게 이동 불가능");
    }
  }
}
type RefImpl = {
  value: any;
};
export interface UseNavigationCompositionOptions
  extends NavigationProps,
    NavigationEvents {
  currentItem: Ref<number>;
  functionality?: NavigationFunctionality;
}

export function navigationComposition(
  options: UseNavigationCompositionOptions,
) {
  // if (options.currentItem === undefined) {
  //   options.currentItem = ref<number>(0);
  // }
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
