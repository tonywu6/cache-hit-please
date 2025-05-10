import { restoreCache } from "@actions/cache";
import { getInput, info, setOutput, warning } from "@actions/core";

import { tryCatch, validateInput } from "./util.js";

tryCatch(async () => {
  const { paths, deps, keys } = validateInput();

  const matchedKey = await restoreCache(paths, keys[0], keys);

  if (matchedKey === keys[0]) {
    info(`Cache hit with fresh key ${JSON.stringify(matchedKey)}`);
  } else if (matchedKey) {
    info(`Cache hit with stale key ${JSON.stringify(matchedKey)}`);
  } else {
    warning(`Cache miss with deps ${JSON.stringify(deps)}`);
  }

  setOutput("primary-key", keys[0]);
  setOutput("restore-key", keys.join("\n"));
  setOutput("cache-hit", matchedKey === keys[0]);
  setOutput("path", getInput("path"));
});
