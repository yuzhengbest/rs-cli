import * as fs from 'node:fs'
import * as path from 'node:path'

type DirCallback = (path: string) => void
type FileCallback = (path: string) => void

export function preOrderDirectoryTraverse(dir: string, dirCallback: DirCallback, fileCallback: FileCallback) {
  // 同步读取当前目录下所有的文件和文件夹，不涉及下一级的文件夹
  for(const filename of fs.readdirSync(dir)) {
    if (filename === '.git') {
      continue
    }

    const fullPath = path.resolve(dir, filename)
    // 同步返回当前路径下的stats信息，用以判断是否是文件夹
    if (fs.lstatSync(fullPath).isDirectory()) {
      dirCallback(fullPath)
      // 判断当前路径下是否存在文件
      if (fs.existsSync(fullPath)) {
        preOrderDirectoryTraverse(fullPath, dirCallback, fileCallback)
      }
      continue
    }
    fileCallback(fullPath)
  }
}

export function postOrderDirectoryTraverse(dir: string, dirCallback: DirCallback, fileCallback: FileCallback) {
  for (const filename of fs.readdirSync(dir)) {
    if (filename === '.git') {
      continue
    }

    const fullPath = path.resolve(dir, filename)
    if (fs.lstatSync(fullPath).isDirectory()) {
      postOrderDirectoryTraverse(fullPath, dirCallback, fileCallback)
      dirCallback(fullPath)
      continue
    }
    fileCallback(fullPath)
  }
}