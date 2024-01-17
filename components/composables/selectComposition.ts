import { ref, Ref } from "vue";
import { SelectProps } from "@/components/interfaces/props/select.interface";
import { SelectFunctionality } from "@/components/interfaces/functions/select.interface";
import { SelectEvents } from "@/components/interfaces/events/select.interface";

// 공통 속성, 내부함수, 이벤트를 상속받은 클래스 정의
export class UseSelectCompositionOptions
  implements SelectProps, SelectEvents, SelectFunctionality
{
  selectedValue?: Ref<string | number | null>;
  selectedLabel?: Ref<string>;
  // toggleList는 select box의 옵션의 값을 show/hide 하는 기능이다.
  // 공통 Composition API에서는 컴포넌트의 기본 기능을 제공한다.
  toggleList(isShowBox: Ref<boolean>): void {
    console.log("composition toggleList");
    isShowBox.value = !isShowBox.value;
  }
}

// 공통 Composition API
export function selectComposition(options: UseSelectCompositionOptions) {
  // 객체 생성
  const selectComposition = new UseSelectCompositionOptions();
  const selectedValue =
    options.selectedValue || ref<string | number | null>(null);
  const selectedLabel = options.selectedValue || ref<string>("");
  const isShowBox = ref(false);

  // select 계열 컴포넌트 옵션 선택 기능
  const handleSelect = (option: Record<string, string | number>) => {
    // valueKey에 해당하는 값을 selectedValue에 저장
    selectedValue.value = option[options.valueKey];
    // labelKey에 해당하는 값을 selectedLabel에 저장
    selectedLabel.value = option[options.labelKey].toString();
    // onSelect 호출 시 valueKey에 해당하는 값 전달
    options.onSelect(option[options.valueKey]);
    isShowBox.value = false;
  };

  // select 계열 option show/hide
  const handleToggleList = () => {
    // 컴포넌트에서 직접 작성한 toggleList를 사용할지
    // UseSelectCompositionOptions 클래스에서 정의한 toggleList를 사용할지 여부를 결정한다.
    const toggleListFunctionality =
      options.toggleList || selectComposition.toggleList;
    toggleListFunctionality(isShowBox);
  };

  return {
    selectedLabel,
    selectedValue,
    handleSelect,
    handleToggleList,
    isShowBox,
    ...options,
  };
}
