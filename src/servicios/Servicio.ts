export class Servicio {
  Model: any;
  constructor(Model: any) {
    this.Model = Model;
  }
  async getAll(): Promise<object>;
  async getAll(params: object): Promise<object>;
  async getAll(params?: object) {
    if (params) {
      return await this.Model.findAll(params);
    } else {
      return await this.Model.findAll();
    }
  }
  async getById(id: number): Promise<any> {
    return await this.Model.findByPk(id);
  }
  async create(params: object): Promise<any> {
    return await this.Model.create(params);
  }
  async setById(id: number, params: object) {
    const instance = await this.getById(id);
    await instance.set(params);
  }
  async updateById(id:number, params:object){
    const instance = await this.getById(id);
    await instance.update(params)
  }
  async updateByInstance(instance:any, params:object){
    await instance.update(params)
  }
  async deleteById(id: number) {
    const instance = await this.getById(id);
    await instance.destroy();
  }
}
