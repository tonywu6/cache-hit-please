import { debug, getMultilineInput, setFailed } from "@actions/core";

export function validateInput() {
  const paths = getMultilineInput("path", { required: true });
  const deps = getMultilineInput("deps", { required: true });
  const keys = deriveKeys(deps);
  return dbg({ paths, deps, keys });
}

/**
 * @param {() => Promise<void>} fn
 */
export async function tryCatch(fn) {
  try {
    await fn();
  } catch (e) {
    setFailed(err(e));
  }
}

/**
 * @param {unknown} e
 */
export function err(e) {
  if (e instanceof Error) {
    return e;
  } else {
    return String(e);
  }
}

/**
 * @template T
 * @param {T} v
 * @returns {T}
 */
export function dbg(v) {
  debug(JSON.stringify(v, null, 2));
  return v;
}

/**
 * @param {string[]} deps
 */
function deriveKeys(deps) {
  /** @type {string[]} */
  const keys = [];
  for (let i = 1; i <= deps.length; i++) {
    keys.push(deps.slice(0, i).join("-"));
  }
  return keys;
}
