export class Servicio {
  Modelo: any;
  constructor(Modelo: any) {
    this.Modelo = Modelo;
  }
  async obtener_todos(): Promise<object>;
  async obtener_todos(params: object): Promise<object>;
  async obtener_todos(params?: object) {
    if (params) {
      return await this.Modelo.findAll(params);
    } else {
      return await this.Modelo.findAll();
    }
  }
  async obtener_por_id(id: number): Promise<any> {
    return await this.Modelo.findByPk(id);
  }
  //createInstance
  async crear_instancia(params: object): Promise<any> {
    return await this.Modelo.create(params);
  }
  async establecer_segun_id(id: number, params: object) {
    const instance = await this.obtener_por_id(id);
    await instance.set(params);
  }
  async _segun_id(id: number, params: object) {
    const instance = await this.obtener_por_id(id);
    await instance.update(params);
  }
  async actualizar_segun_instancia(instance: any, params: object) {
    await instance.update(params);
  }
  async eliminar_segun_id(id: number) {
    const instance = await this.obtener_por_id(id);
    await instance.destroy();
  }
}
