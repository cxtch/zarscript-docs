const https = require('https');
let url = 'https://raw.githubusercontent.com/cxtch/zarscript-docs/main/zarscript.d.ts';
const fs = require('fs').promises;
const FS = require('fs')
let user = process.env['USERPROFILE'].split('\\');
let home = user[user.length - 1];
let globalPath = `${findHomeDir()}node_modules/@types/node/globals.d.ts`

fs.readFile(globalPath)
  .catch(err => {
    console.log('You do not have @types/node installed! please use "npm install --save @types/node" before installing zarscript documentation')
    process.exit()
  })
  .then(() => {
    process.stdout.write(`
███████╗█████╗██████╗███████╗████████████╗████████╗████████╗
╚══███╔██╔══████╔══████╔════██╔════██╔══██████╔══██╚══██╔══╝
  ███╔╝█████████████╔█████████║    ██████╔████████╔╝  ██║   
 ███╔╝ ██╔══████╔══██╚════████║    ██╔══██████╔═══╝   ██║   
█████████║  ████║  █████████╚████████║  ██████║       ██║   
╚══════╚═╝  ╚═╚═╝  ╚═╚══════╝╚═════╚═╝  ╚═╚═╚═╝       ╚═╝    
                                                          
`)
    fs.stat(globalPath)
      .then(stats => {
        console.log(`current file size of globals.d.ts is ${stats.size}`);
        console.log('install[0] or uninstall?[1]')
      })
  })
let docs = []
let newSize = 41655
let uninstallSize = 23691
process.title = 'Zarscript Api Installer'

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
      console.log(`Please uninstall and try again`)
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