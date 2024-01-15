import { sha512 } from 'js-sha512';

export const getHash = (username, password) => {
  return sha512.update(btoa(`${username}:${password}`)).hex()
}
