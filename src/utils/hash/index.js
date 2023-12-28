import { sha512 } from 'js-sha512';

export const checkHash = (hash) => {
  return hash === process.env.REACT_APP_LOGIN
}

export const getHash = (username, password) => {
  return sha512.update(btoa(`${username}:${password}`)).hex()
}
