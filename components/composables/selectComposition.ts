// src/components/functional/composables/selectComposition.ts
import { ref, Ref } from "vue";
import { SelectProps } from "@/components/interfaces/props/select.interface";
import { SelectFunctionality } from "@/components/interfaces/functions/select.abstract";
import { SelectEvents } from "@/components/interfaces/events/select.abstract";

// SelectFunctionality를 상속받는 구체적인 클래스 정의 toggleList 추상 메서드를 구체적으로 구현
class CustomSelectFunctionality extends SelectFunctionality {
  toggleList(isShowBox: Ref<boolean>): void {
    // 실제 기능을 여기에 구현
    isShowBox.value = !isShowBox.value;
  }
}

export interface UseSelectCompositionOptions extends SelectProps, SelectEvents {
  selectedValue?: Ref<string | number | null>;
  selectedLabel?: Ref<string>;
  functionality?: SelectFunctionality; // SelectFunctionality를 옵션으로 받음
}

export function selectComposition(options: UseSelectCompositionOptions) {
  const selectedValue =
    options.selectedValue || ref<string | number | null>(null);
  const selectedLabel = ref<string>("");
  const isShowBox = ref(false);

  const handleSelect = (option: Record<string, string | number>) => {
    selectedValue.value = option[options.valueKey]; // valueKey에 해당하는 값을 selectedValue에 저장
    selectedLabel.value = option[options.labelKey].toString(); // labelKey에 해당하는 값을 selectedLabel에 저장
    options.onSelect(option[options.valueKey]); // onSelect 호출 시 valueKey에 해당하는 값 전달
    isShowBox.value = false;
  };

  const toggleList = () => {
    // options에서 functionality를 받아옴
    const functionality =
      options.functionality || new CustomSelectFunctionality(); // 구체적인 클래스를 사용
    functionality.toggleList(isShowBox); // toggleList를 호출
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
