const https = require('https');
let url = 'https://raw.githubusercontent.com/cxtch/zarscript-docs/main/zarscript.d.ts';
const fs = require('fs').promises;
const FS = require('fs')
let user = process.env['USERPROFILE'].split('\\');
let home = user[user.length - 1];
let globalPath = `${findHomeDir()}node_modules/@types/node/globals.d.ts`
let docs = []
let newSize = 40186
let uninstallSize = 22203
process.title = 'Zarscript Api Installer'
process.stdout.write(`
███████╗█████╗██████╗███████╗████████████╗████████╗████████╗
╚══███╔██╔══████╔══████╔════██╔════██╔══██████╔══██╚══██╔══╝
  ███╔╝█████████████╔█████████║    ██████╔████████╔╝  ██║   
 ███╔╝ ██╔══████╔══██╚════████║    ██╔══██████╔═══╝   ██║   
█████████║  ████║  █████████╚████████║  ██████║       ██║   
╚══════╚═╝  ╚═╚═╝  ╚═╚══════╝╚═════╚═╝  ╚═╚═╚═╝       ╚═╝    
                                                          
`)
console.log(`install or uninstall? [0/1]`)

function getZarDocs() {
  let text = '';
  https.get(url, (res) => {
    res.on('data', (chunk) => {
      text = chunk.toString();
      docs.push(text)
      if (docs.length == 1)
        triggerAppend()
    });
  });
}

function triggerAppend() {
  console.log(`successfully fetched documentation`)
  setTimeout(() => {
    for (i = 0; i < docs.length; i++) {
      if (i == 0) {
        appendToGlobal(`\n${docs[i]}`)
        continue;
      }
      appendToGlobal(docs[i])
    }
    console.log('appended global file, checking for errors')
    checkForFault()
  }, 1500)
}

function checkForFault() {
  setTimeout(() => {
    let globalFile = FS.statSync(globalPath)
    if (globalFile.size != newSize) {
      console.log(`FAULTY INSTALLATION: the target file's size is ${globalFile.size}, the expected size is ${newSize}`)
      console.log(`Please run uninstall.js and try again`)
    } else
      console.log('installation successful!')
    process.exit()
  }, 750)
}

function findHomeDir() {
  let parents = __dirname.split('\\');
  let homepath = '';
  for (let i = parents.length - 1; i >= 0; i--) {
    if (parents[i] === home) {
      break;
    }
    homepath += '../';
  }
  return homepath;
}

function appendToGlobal(text) {
  fs.appendFile(globalPath, text)
    .catch(err => {
      console.log(err);
    });
}

function removeFromGlobal() {
  let globalFile = FS.statSync(globalPath);
  if (globalFile.size === uninstallSize) {
    console.log('you do not have the zarscript api installed');
    process.exit()
  }
  FS.truncateSync(globalPath, uninstallSize)
  console.log('uninstalled')
  process.exit()
}
process.stdin.on('data', input => {
  data = input.toString();
  if (data == 0) {
    getZarDocs()
  }
  if (data == 1) {
    removeFromGlobal()
  }
})