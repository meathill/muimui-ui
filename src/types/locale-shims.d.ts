import { Locale } from "moment";

declare module "moment/dist/locale/*" {
  const _temp : Locale;
  export = _temp;
  export default _temp;
}
