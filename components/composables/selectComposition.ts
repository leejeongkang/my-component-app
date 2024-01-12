// src/components/functional/composables/selectComposition.ts
import { ref, Ref } from "vue";
import { SelectProps } from "@/components/interfaces/props/select.interface";
import { SelectFunctionality } from "@/components/interfaces/functions/select.abstract";
import { SelectEvents } from "@/components/interfaces/events/select.abstract";

// SelectFunctionality를 상속받는 구체적인 클래스 정의 toggleList 추상 메서드를 구체적으로 구현
class CustomSelectFunctionality extends SelectFunctionality {
  // Overriding
  toggleList(isShowBox: Ref<boolean>): void {
    // 실제 기능을 여기에 구현
    isShowBox.value = !isShowBox.value;
  }
}

// options
export interface UseSelectCompositionOptions extends SelectProps, SelectEvents {
  selectedValue?: Ref<string | number | null>;
  selectedLabel?: Ref<string>;
  functionality?: SelectFunctionality;
}

export function selectComposition(options: UseSelectCompositionOptions) {
  const selectedValue =
    options.selectedValue || ref<string | number | null>(null);
  const selectedLabel = options.selectedValue || ref<string>("");
  const isShowBox = ref(false);

  // 선택
  const handleSelect = (option: Record<string, string | number>) => {
    // valueKey에 해당하는 값을 selectedValue에 저장
    selectedValue.value = option[options.valueKey];
    // labelKey에 해당하는 값을 selectedLabel에 저장
    selectedLabel.value = option[options.labelKey].toString();
    // onSelect 호출 시 valueKey에 해당하는 값 전달
    options.onSelect(option[options.valueKey]);
    isShowBox.value = false;
  };

  // option show/hide
  // toggleList 맵핑
  const toggleList = () => {
    // 사용자가 토글 함수를 정의하거나 재정의한 함수를 사용하거나
    const toggleListFunctionality =
      options.functionality?.toggleList ||
      new CustomSelectFunctionality().toggleList;
    toggleListFunctionality(isShowBox);
  };

  return {
    selectedLabel,
    selectedValue,
    handleSelect,
    toggleList,
    isShowBox,
    ...options,
  };
}
