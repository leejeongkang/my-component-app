import { NavigationFunctionality } from "@/components/interfaces/functions/navigation.interface";
import { NavigationProps } from "@/components/interfaces/props/navigation.interface";
import { NavigationEvents } from "@/components/interfaces/events/navigation.interface";
import { NavigationItemEnum } from "@/components/types/navigationItemEnum";
import { ComparisonOperator } from "@/components/types/comparisonOperator";
import { Ref, ref } from "vue";

export class UseNavigationCompositionOptions
  implements NavigationProps, NavigationEvents, NavigationFunctionality
{
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
  // TODO: 현재 인덱스 저장 하는 변수 하나 만들기

  function getValueBasedOnType(value: string, index: number) {
    if (currentItemType === NavigationItemEnum.String) {
      return value;
    } else if (currentItemType === NavigationItemEnum.Number) {
      return index;
    }
  }

  /**
   * class style 비교 로직
   * currentItemType 이 String 일 경우 에는 EQUAL 사용 권장
   * @param a
   * @param b
   * @param comparison
   */
  const compareValues = (
    a: number,
    b: number,
    comparison: ComparisonOperator,
  ): boolean => {
    switch (comparison) {
      case ComparisonOperator.GREATER_THAN_OR_EQUAL:
        return a >= b;
      case ComparisonOperator.EQUAL:
        return a === b;
      default:
        throw new Error(`Unsupported comparison operator: ${comparison}`);
    }
  };

  function handleMoveItem(item: number | string) {
    const moveItemFunctionality =
      options.moveItem || navigationComposition.moveItem;
    moveItemFunctionality(activeItem, item);
    options.onChange(item);
  }

  return {
    ...options,
    getValueBasedOnType,
    compareValues,
    handleMoveItem,
  };
}
/** TODO
 * 내부는 무조건 index 로 로직
 * value로 줘도 내부에서 index 찾아서 처리
 * 이유 : 탭, 스탭 동작 통일 시키기 위해서
 * 방법 : index
 */
