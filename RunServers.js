module.exports = async () => {
  const { RUN_APOLLO_SERVER } = process.env;

  await fetch(RUN_APOLLO_SERVER);
};
