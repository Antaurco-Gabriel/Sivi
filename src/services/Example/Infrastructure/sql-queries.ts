const data = "";

export class SQL {
  async duck(name: string){ 
    console.log(name, data);
  };
  async num(): Promise<number>{
    return 4;
  }
}
