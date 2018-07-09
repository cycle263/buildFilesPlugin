"use strict";

class ShowBuildFilesPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    compiler.hooks.afterCompile.tap("ShowBuildFilesPlugin", compilation => {
      let files = '## Build files:\n\n';
      for (let file in compilation.assets) {
        files += `- ${file}\n`;
      }

      const name = this.options.fileName || 'buildFiles.md';

      compilation.assets[name] = {
        source: function () {
          return files;
        },
        size: function () {
          return files.length;
        }
      };
    });
  }
}

module.exports = ShowBuildFilesPlugin;