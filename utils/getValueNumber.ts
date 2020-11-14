import { getSelectStr } from './getSelectStr';

export function getValueNumber(value?: string | string[]): number | undefined {
  const str = getSelectStr(value);
  if (str === undefined) {
    return;
  }
  const number = Number.parseInt(str);
  return Number.isNaN(number) ? undefined : number;
}
