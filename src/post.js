import process from "node:process";

import { saveCache } from "@actions/cache";
import { getState, warning } from "@actions/core";
import { exec } from "@actions/exec";

import { tryCatch, validateInput } from "./util.js";

tryCatch(async () => {
  const { paths, keys } = validateInput();

  if (getState("cache-hit") === "true") {
    try {
      await exec("gh", ["cache", "delete", keys[0]], {
        env: {
          ...process.env,
          GH_TOKEN: String(process.env.GITHUB_TOKEN),
        },
      });
    } catch (e) {
      warning(`could not evict cache: ${e}`);
    }
  }

  try {
    await saveCache(paths, keys[0]);
  } catch (e) {
    warning(String(e));
  }
});
