/* eslint no-console:0 */
function pascalCase(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/-(\w)/g, (m, n) => n.toUpperCase());
}

// Just import style for https://github.com/ant-design/ant-design/issues/3745
const componentReq = require.context('./components', true, /^\.\/[^_][\w-]+\/style\/index\.tsx?$/);
const scenesReq = require.context('./scenes', true, /^\.\/[^_][\w-]+\/style\/index\.tsx?$/);

componentReq.keys().forEach(mod => {
  let v = componentReq(mod);
  if (v && v.default) {
    v = v.default;
  }
  const match = mod.match(/^\.\/([^_][\w-]+)\/index\.tsx?$/);
  if (match && match[1]) {
    if (match[1] === 'message' || match[1] === 'notification') {
      // message & notification should not be capitalized
      exports[match[1]] = v;
    } else {
      exports[pascalCase(match[1])] = v;
    }
  }
});

scenesReq.keys().forEach(mod => {
    let v = scenesReq(mod);
    if (v && v.default) {
      v = v.default;
    }
    const match = mod.match(/^\.\/([^_][\w-]+)\/index\.tsx?$/);
    if (match && match[1]) {
        exports[pascalCase(match[1])] = v
    }
  });

const Components = require('./components')
const Scenes = require('./scenes')

module.exports = {
    ...Components,
    ...Scenes,
};
