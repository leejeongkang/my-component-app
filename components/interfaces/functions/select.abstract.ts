// src/interfaces/functions/select.abstract.ts

import { Ref } from 'vue';

export abstract class SelectFunctionality {
  abstract toggleList(isShowBox: Ref<boolean>): void;
}
