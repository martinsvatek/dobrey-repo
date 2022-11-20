export const joinClassNames = (classNamesArray: (string | false | undefined)[]): string =>
  classNamesArray.filter((className) => !!className).join(' ');
