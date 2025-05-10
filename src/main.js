import { restoreCache } from "@actions/cache";
import { getInput, info, saveState, setOutput, warning } from "@actions/core";

import { tryCatch, validateInput } from "./util.js";

tryCatch(async () => {
  const { paths, deps, keys } = validateInput();

  const matchedKey = await restoreCache(paths, keys[0], keys);

  const cacheHit = matchedKey === keys[0];
  if (cacheHit) {
    info(`cache hit with fresh key ${JSON.stringify(matchedKey)}`);
  } else if (matchedKey) {
    info(`cache hit with stale key ${JSON.stringify(matchedKey)}`);
  } else {
    warning(`cache miss with deps ${JSON.stringify(deps)}`);
  }

  saveState("cache-hit", cacheHit);
  setOutput("cache-hit", cacheHit);

  setOutput("primary-key", keys[0]);
  setOutput("restore-key", keys.join("\n"));
  setOutput("path", getInput("path"));
});
