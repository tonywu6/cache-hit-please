import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/main.js", "src/post.js"],
  outdir: "dist",
  format: "esm",
  target: ["node20"],
  platform: "node",
  bundle: true,
  treeShaking: true,
  minify: false,
});
