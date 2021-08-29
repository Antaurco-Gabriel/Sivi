import { Mongo } from './mongo-queries';
import { SQL } from './sql-queries';

class DataBase { }

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
}

interface DataBase extends Mongo, SQL {}
applyMixins(DataBase, [Mongo, SQL]);

export { DataBase };
