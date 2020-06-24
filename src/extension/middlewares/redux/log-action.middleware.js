export default ({getState}) => (next) => (action) => {
  console.log("------------------------------------");
  console.log("state", getState());
  console.log("action", action);
  return Promise.resolve(next(action)).then(() => {
    console.log("newState", getState());
  });
};
