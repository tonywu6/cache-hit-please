import { restoreCache } from "@actions/cache";
import { setOutput } from "@actions/core";

import { tryCatch, validateInput } from "./util.js";

tryCatch(async () => {
  const { paths, keys } = validateInput();
  const matchedKey = await restoreCache(paths, keys[0], keys);
  setOutput("cache-hit", matchedKey === keys[0]);
  setOutput("primary-key", keys[0]);
  setOutput("restore-key", keys.join("\n"));
});
