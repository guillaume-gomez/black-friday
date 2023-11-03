# Black Friday Project

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v18 or higher) installed on your machine.

## Getting Started

1. Clone the project repository from [GitHub](https://github.com/les-enovateurs/black-friday.git) to your local machine.
`git clone https://github.com/les-enovateurs/black-friday.git`

2. Change into the project directory: `cd black-friday`

3. Install project dependencies using npm: `npm install`

## Scripts

This project comes with a set of predefined npm scripts to help with development and building the extension. 
You can run these scripts using the following commands:

- `npm run start-v2`: Starts the extension in firefox with `web-ext run` for the V2 version of the extension.
- `npm run start-v3`: Starts the extension in firefox with `web-ext run` for the V3 version of the extension.
- `npm run build-v2`: Generate manifest, build and packs V2 version of the extension for production.
- `npm run build-v3`: Generate manifest, build and packs V3 version of the extension for production.
- `npm run manifest-v2`: Generate extension manifestV2.
- `npm run manifest-v3`: Generate extension manifestV3.
- `npm run build-ext-v2`: Packs the V2 extension with `web-ext build`.
- `npm run build-ext-v3`: Packs the V3 extension with `web-ext build`.
- `npm run build`: Build both V2 and V3 versions.
- `npm run manifests`: Generate both manifest versions.
- `npm run build-ext`: Packs both V2 and V3 versions.

Adjust the target and mode as needed when running these scripts. For example:

- `npm run start-v2` will start a development server for the V2 version in development mode.
- `npm run build-v3` will build the V3 version in production mode.

## Project Structure

The project has a specific directory structure to separate the code for the V2 and V3 versions of the extension. 
The primary files and directories are:

- `src/`: Contains the source code for the extension.
- `dist/`: Output directory for the built extension.
  - `v2/`: Output directory for the V2 version code.
  - `v3/`: Output directory for the V3 version code.
  - `artifacts_v2/`: Output directory for the V2 version of the packed extension.
  - `artifacts_v3/`: Output directory for the V3 version of the packed extension.
- `scripts/`: Contains scripts for npm (manifest generation, etc).

## Webpack configuration

The project uses Webpack, Babel and WebExtension-Polyfill for code generation/transpiling/bundling/minifying.
Configuration of webpack is done in [`webpack.config.js`](webpack.config.js).

### Sources

These variable defines the sources for both versions of the extension. Any file provided here will only be transpiled,
imported files that are not featured here will be bundled with the importing files. This allows to cut huge files in 
several smaller files without any compromise, without bundling all the unrelated files in a single file.

```js
const commonSources = {
    // Add common sources to both versions here
    file_1: './src/file_1.js',
    file_2: './src/file_2.js',
}

const v2Sources = {
    // Add v2 specific sources here
}

const v3Sources = {
    // Add v3 specific sources here
}
```

Example with file_1 being :
```js
import hello from "./file_3"
import goodbye from "./file_2"

hello("world")
goodbye("world")
```

As `file_3` is not in webpack sources, it will be bundled with `file_1`, meanwhile `file_2` will not be bundled
since it is in the webpack sources.


### Additional configuration

Additional configuration can be provided through the `commonConfig` (and specific `Config` elements).
Static files (such as icons) can be sent to dist folder with the `CopyPlugin` webpack plugin.

```js
plugins: [
  new CopyPlugin({
    patterns: [
      { from: "src/icons", to: "icons" },
      { from: "node_modules/webextension-polyfill/dist/browser-polyfill.js", to: "polyfill.js" },
    ],
  }),
]
```

## Manifest

Extension's Manifest only needs to be written in the V2 version as `src/manifest.json`, it will automatically be
copied (and adapted to V3) in the `dist` folders during build time.

To import WebExtension-Polyfill into the extension, the file `polyfill.js` must be used in all `content_scripts` targets.

```json
{
  "content_scripts": [
    {
      "matches": ["https://www.example.com/*"],
      "js": [
        "polyfill.js",
        "file_com.js"
      ]
    },
    {
      "matches": ["*://*.example.fr/*"],
      "js": [
        "polyfill.js",
        "file_fr.js"
      ]
    }
  ]
}
```
