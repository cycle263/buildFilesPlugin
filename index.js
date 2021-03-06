"use strict";

class ShowBuildFilesPlugin {
  constructor(options) {
    this.options = options || {};
  }

  apply(compiler) {
    compiler.hooks.afterCompile.tap("ShowBuildFilesPlugin", compilation => {
      let content = '## Build files:\n\n';
      for (let file in compilation.assets) {
        content += `- ${file}\n`;
      }

      for (let i = 0, l = compilation.chunks.length; i < l; i++) {
        content += `- ${compilation.chunks[i]}\n`;
      }

      const name = this.options.fileName || 'buildFiles.md';

      compilation.assets[name] = {
        source: function () {
          return content;
        },
        size: function () {
          return content.length;
        }
      };
    });
  }
}

module.exports = ShowBuildFilesPlugin;