export default () => {
  if (!window.__config) {
    throw new Error("Environment config not found");
  }

  return window.__config;
};
