export const isNotNumber = (argument: string): boolean =>
  isNaN(Number(argument));

export default isNotNumber;