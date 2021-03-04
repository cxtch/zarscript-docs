const fs = require('fs')
let user = process.env['USERPROFILE'].split('\\')
let home = user[user.length - 1]
let targetSize = 22203

function findHomeDir() {
  let parents = __dirname.split('\\')
  let homepath = ''
  for (let i = parents.length - 1; i >= 0; i--) {
    if (parents[i] === home) {
      break;
    }
    homepath += '../'
  }
  return homepath
}
let globalPath = `${findHomeDir()}node_modules/@types/node/globals.d.ts`

function removeFromGlobal() {
  let globalFile = fs.statSync(globalPath);
  if (globalFile.size === targetSize) {
    console.log('you do not have the zarscript api installed');
    return
  }
  fs.truncateSync(globalPath, targetSize)
  console.log('uninstalled')
}
removeFromGlobal()