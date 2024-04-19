import { message } from 'antd';
import queryString from 'query-string';
import { IndexedObject } from 'types/common';
import { isEmptyObject } from './common';

export const developing = () => {
  message.warning('Tính năng chưa phát triển !');
};

export const omitObject = (obj: IndexedObject, keys: Array<any>): IndexedObject => {
  if (!keys.length) return obj;
  const { [keys.pop()]: omitted, ...rest } = obj;
  return omitObject(rest, keys);
};

export const replacePathParams = (path: string, params: IndexedObject<string>): string =>
  path.replace(/:([^/]+)/g, (_, p1) => encodeURIComponent(params[p1] ? params[p1] : ''));

export const parseFloatNum = (str: string) => {
  const trimmed = str && typeof str.trim === 'function' ? str.trim() : null;
  if (!trimmed) {
    return null;
  }
  const num = parseFloat(trimmed);
  const isNumber = !isNaN(num);
  const isFullyParsedNum = isNumber && num.toString() === trimmed;
  return isFullyParsedNum ? num : null;
};
export const parse = (search: string) => {
  const params = queryString.parse(search);
  return Object.keys(params).reduce((result: IndexedObject, key) => {
    const val = params[key];
    if (val === 'true') {
      result[key] = true;
    } else if (val === 'false') {
      result[key] = false;
    } else {
      const num = parseFloatNum(val ? val.toString() : '');
      result[key] = num === null ? val : num;
    }
    return result;
  }, {});
};

export const createQueryUrl = (location: IndexedObject, params: IndexedObject) => {
  const { pathname } = location;
  if (isEmptyObject(params)) return pathname;
  const query = queryString.stringify(params);
  return `${pathname}?${query}`;
};

export const percentCal = (cur: number | string, total: number | string, fixed: number = 0) => {
  if (!cur || !total) return 0;
  const per = (parseFloat(cur.toString()) / parseFloat(total.toString())) * 100;
  return per.toFixed(fixed);
};

export const openUrlInNewTab = (url?: string) => {
  url && window.open(url, '_blank')?.focus();
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const sortByOrder = (arrayToOrder: Array<any>, acs?: boolean) => {
  const arraySort = [...arrayToOrder].sort((a, b) => (acs ? b.order - a.order : a.order - b.order));
  return arraySort;
};

export const sortByView = (arrayToOrder: Array<any>, acs?: boolean) => {
  const arraySort = [...arrayToOrder].sort((a, b) =>
    acs ? b.collectionP.view - a.collectionP.view : a.collectionP.view - b.collectionP.view,
  );
  return arraySort;
};

export const isImage = (url: string) => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};

export const copyTextToClipboard = (text: string): boolean => {
  let textArea = document.createElement('textarea');
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = '0';
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';

  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  } catch (err) {
    document.body.removeChild(textArea);
    return false;
  }
};

const isObject = (object: any) => {
  return object !== null && typeof object === 'object';
};
export const isDeepEqualObject = (object1: IndexedObject, object2: IndexedObject) => {
  if (!isObject(object1) || !isObject(object2)) return false;
  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) return false;

  for (const key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const isObjects = isObject(value1) && isObject(value2);

    if ((isObjects && !isDeepEqualObject(value1, value2)) || (!isObjects && value1 !== value2)) {
      return false;
    }
  }
  return true;
};

export const reOrderArray: (list: any[], startIndex: number, endIndex: number) => any[] = (
  list: any[],
  startIndex: number,
  endIndex: number,
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
