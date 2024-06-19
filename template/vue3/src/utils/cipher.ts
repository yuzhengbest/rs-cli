import CryptoJS from 'crypto-js/crypto-js'
import pkcs7 from 'crypto-js/pad-pkcs7'
import ECB from 'crypto-js/mode-ecb'
import md5 from 'crypto-js/md5'
import UTF8 from 'crypto-js/enc-utf8'
import Base64 from 'crypto-js/enc-base64'

export interface EncryptionParams {
  key: string;
  iv: string;
}

export class DesEncryption {
  private key;

  constructor(opt: Partial<EncryptionParams> = {}) {
    const { key} = opt;
    if (key) {
      // 密钥为base64格式的，按照base64格式解码转成字节格式
      this.key = Base64.parse(key);
    }
  }

  get getOptions() {
    return {
      mode: ECB,
      padding: pkcs7
    };
  }

  // DES加密，结果返回base64格式
  encryptByDES(cipherText: string) {
    const word = CryptoJS.enc.Utf8.parse(cipherText)
    const encrypted = CryptoJS.DES.encrypt(word, this.key, this.getOptions)
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
  }
  decryptByDES(cipherText: string) {
    return CryptoJS.DES.decrypt(cipherText, this.key, this.getOptions).toString(UTF8)
  }
}

export function encryptByBase64(cipherText: string) {
  return UTF8.parse(cipherText).toString(Base64);
}

export function decodeByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(UTF8);
}

export function encryptByMd5(password: string) {
  return md5(password).toString();
}
