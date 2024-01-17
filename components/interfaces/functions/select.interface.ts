// src/interfaces/events/select.interface.ts

import { Ref } from "vue";

export interface SelectFunctionality {
  // select option toggle
  toggleList(isShowBox: Ref<boolean>): void;
}
