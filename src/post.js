import { saveCache } from "@actions/cache";
import { warning } from "@actions/core";

import { err, tryCatch, validateInput } from "./util.js";

tryCatch(async () => {
  const { paths, keys } = validateInput();
  try {
    await saveCache(paths, keys[0]);
  } catch (e) {
    warning(err(e));
  }
});
