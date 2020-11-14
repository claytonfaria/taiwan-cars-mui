import { getAsString } from './getAsString';

export function getSelectStr(value?: string | string[]): string | undefined {
  const str = getAsString(value);
  return !str || str.toLowerCase() === 'all' ? undefined : str;
}
