import { DataBase } from '../Infrastructure/database';
import { encrypt, decrypt } from '@Helpers/globals';

class Repository extends DataBase {

   public encryptPassword(password: string): string{
    return encrypt( password );
  }

  public decryptPassword(password: string): string{
    return decrypt( password );
  }

}

export const repository = new Repository();
