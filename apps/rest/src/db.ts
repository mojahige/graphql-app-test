import { join } from 'path';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

const dbFilePath = join(__dirname, 'files/db/db.json');

class DBController {
  db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config(dbFilePath, false, true, '/'));
  }

  /**
   * Set data into the database
   *
   * @param options.path path leading to the data
   * @param options.value data to push
   */
  public setData<Data = unknown>({
    path,
    value,
  }: {
    path: string;
    value: unknown;
  }): Data {
    this.db.push(path, value, true);
    this.save();

    return this.getData(path);
  }

  /**
   * Returns the number of element which constitutes the array
   *
   * @param path
   */
  public getCount(path: string) {
    return this.db.count(path);
  }

  /**
   * Returns the index of the object that meets the criteria submitted.
   *
   * @param options.path  base dataPath from where to start searching
   * @param options.value value to look for in the dataPath
   * @param options.property name of the property to look for searchValue. default value is 'id'.
   */
  public getIndex({
    path,
    value,
    property = 'id',
  }: {
    path: string;
    value: string | number;
    property?: string;
  }) {
    return this.db.getIndex(path, value, property);
  }

  /**
   * Get the wanted data
   *
   * @param path path of the data to retrieve
   */
  public getData<Data = unknown>(path: string): Data {
    return this.db.getData(path);
  }

  /**
   * Delete the data
   *
   * @param path path leading to the data
   */
  public delete(path: string) {
    this.db.delete(path);
    this.save();
  }

  /**
   * Manually save the database By default you can't save the database if it's not loaded
   *
   * @param force - Force the save of the database
   */
  public save(force = false) {
    this.db.save(force);
    this.db.reload();
  }

  /**
   * Reload the database from the file
   */
  public reload() {
    this.db.reload();
  }
}

export const DB = new DBController();
