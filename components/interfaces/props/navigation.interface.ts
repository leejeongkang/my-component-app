import { Ref } from "vue/dist/vue";

export interface NavigationProps {
  data: Array<string | number>;
  labelKey: string;
  valueKey?: string;
  iconKey?: string;
  currentIdx?: Ref<number>;
}

// export class NavigationConfig implements NavigationProps {
//   labelKey: string = "label";
//   valueKey: string = "value";
//   iconKey?: string = "icon";
//   currentItem: number = 0;
// }
//
// const config = new NavigationConfig();
