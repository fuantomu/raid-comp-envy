export abstract class AsyncFactory {
  public static getInstance<T>(constructor: new (callback: Function) => T): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const object = new constructor(() => {
          resolve(object);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}
