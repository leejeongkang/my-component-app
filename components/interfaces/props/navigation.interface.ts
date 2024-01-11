import { Ref } from "vue";

export interface NavigationProps {
  data: Array<object>;
  labelKey: string;
  valueKey?: string;
  iconKey?: string;
  currentItem?: Ref<number>;
}

// export class NavigationConfig implements NavigationProps {
//   labelKey: string = "label";
//   valueKey: string = "value";
//   iconKey?: string = "icon";
//   currentItem: number = 0;
// }
//
// const config = new NavigationConfig();
