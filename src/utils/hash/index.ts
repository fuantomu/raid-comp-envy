import { sha512 } from "js-sha512";
import { random } from "lodash";

const MIN_SALT_SIZE = 4;
const MAX_SALT_SIZE = 8;

const createSalt = (minSize: number, maxSize: number) => {
  const saltSize = random(minSize, maxSize);
  const randomSalt = [...Array(maxSize)].map((item) => (item = random(8 * 8)));

  return randomSalt.slice(0, saltSize);
};

export const getHash = (username, password, saltBytes = undefined) => {
  if (saltBytes === undefined) {
    saltBytes = createSalt(MIN_SALT_SIZE, MAX_SALT_SIZE).join("");
  }

  const hash = sha512.update(btoa(`${username}:${password}`));
  return btoa(`${hash.hex()}${saltBytes}`);
};
