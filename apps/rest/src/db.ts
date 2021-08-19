import { join } from 'path';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

const filePath = join(__dirname, 'files/db.json');
export const db = new JsonDB(new Config(filePath, false, true, '/'));
