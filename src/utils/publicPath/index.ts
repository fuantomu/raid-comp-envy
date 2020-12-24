/**
 * Prefixes the provided path with the public path.
 *
 * @param path The file name/path that exists inside the public directory.
 */
export default (path: string) => `${process.env.PUBLIC_URL}${path}`;
