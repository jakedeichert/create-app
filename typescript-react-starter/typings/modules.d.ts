declare module '*package.json' {
  export const name: string;
  export const version: string;
}

declare module '*.json' {
  const value: any | {};
  export default value;
}

// Was used for css modules
// declare module '*.css' {
//   const value: any;
//   export default value;
// }
