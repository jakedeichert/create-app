export const snakeToCamel = (s: string) =>
  s.replace(/_\w/g, (m: string) => m[1].toUpperCase());
export const camelToSnake = (s: string) =>
  s.replace(/[A-Z]/g, (m: string) => '_' + m.toLowerCase());
