export const actionErr = (dispatch: Function, type: string) => {
  return (err: Error) => {
    dispatch({
      type,
      err,
    });
  };
};
