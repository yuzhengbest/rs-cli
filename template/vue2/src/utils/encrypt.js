import md5 from 'md5';
import { pbkdf2 } from 'pt-utils';

function encrypt(value, type) {
  return type ? pbkdf2(value) : md5(value);
}
export default encrypt;
