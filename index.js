/**
 * @param {string} pathPrefix
 * @return {(path:string) => string}
 */
const subtractPathParent = (pathPrefix) => (path) => {
  return path.substring(pathPrefix.length);
};

/**
 * @param {string} pathToIgnore - The top exclusion
 * @return {(exclusion:string) => string[]} - Exclusion-to-paths mapper
 */
const buildExclusionSteps = (pathToIgnore) => {
  const subtractParent = subtractPathParent(pathToIgnore);
  /**
   * @param {string} exclusion - The exclusion path
   * @return {string[]} - The unrolled exclusion path
   */
  return (exclusion) => {
    const dirs = subtractParent(exclusion).split("/").filter(Boolean);
    const paths = [];
    for (let i = 0; i < dirs.length; i++) {
      const accumDir = pathToIgnore + "/" + dirs.slice(0, i + 1).join("/");
      paths.push(`!${accumDir}`);
      if (i !== dirs.length - 1) {
        paths.push(`${accumDir}/*`);
      }
    }
    return paths;
  };
};

/**
 * @param {string} pathToIgnore
 * @param {string[]=} exclusions
 * @return {string[]}
 */
const buildIgnorePaths = (pathToIgnore, exclusions) => [
  `${pathToIgnore}/*`,
  ...exclusions
    .filter((e) => e.startsWith(pathToIgnore))
    .flatMap(buildExclusionSteps(pathToIgnore)),
];

module.exports = {
  buildIgnorePaths,
};
