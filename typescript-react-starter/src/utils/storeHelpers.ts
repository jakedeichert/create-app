export const actionErr = (type: string) => {
  return (err: Error) => ({
    type,
    err,
  });
};
