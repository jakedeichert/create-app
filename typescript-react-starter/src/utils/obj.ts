import { camelToSnake, snakeToCamel } from './string';

export const isIterable = (o: any) =>
  o !== null && typeof o[Symbol.iterator] === 'function';

interface IndexableObject {
  [key: string]: any;
}

interface IndexableArray {
  [key: string]: any;
  [key: number]: any;
}

type Indexable = IndexableObject | IndexableArray;

/**
 * Pick properties from an object.
 * @param   o       The original object
 * @param   props   The props to pick from the object
 */
export const pick = (o: IndexableObject, ...props: string[]): object => {
  return props.reduce((a: IndexableObject, x: string): object => {
    if (o.hasOwnProperty(x)) a[x] = o[x];
    return a;
  }, {});
};

/**
 * Pick valid properties from an object. Null and undefined values are excluded.
 * @param   o       The original object
 * @param   props   The props to pick from the object
 */
export const pickValid = (o: IndexableObject, ...props: string[]): object => {
  const newObj: IndexableObject = pick(o, ...props);
  // Remove undefined or null values.
  for (const k of Object.keys(newObj)) {
    if (typeof newObj[k] === 'undefined' || newObj[k] === null) {
      delete newObj[k];
    }
  }
  return newObj;
};

/**
 * Recursively loop through an object and rename all keys with a function.
 * @param   obj           The object to transform
 * @param   keyRenamer    The function that handles key renaming
 */
export const renameKeyDeep = (
  obj: Indexable,
  keyRenamer: (key: string) => string
): Indexable => {
  const newObj: Indexable = Array.isArray(obj) ? [] : {};
  for (const k of Object.keys(obj)) {
    const newKey = keyRenamer(k);
    newObj[newKey] =
      typeof obj[k] === 'object' && obj[k] !== null
        ? renameKeyDeep(obj[k], keyRenamer)
        : obj[k];
  }
  return newObj;
};

/**
 * Recursively loop through an object and convert all snake_case keys to camelCase.
 * @param   obj   The object to transform
 */
export const camelCaseDeep = (obj: {}): any => renameKeyDeep(obj, snakeToCamel);

/**
 * Recursively loop through an object and convert all camelCase keys to snake_case.
 * @param   obj   The object to transform
 */
export const snakeCaseDeep = (obj: {}): any => renameKeyDeep(obj, camelToSnake);
