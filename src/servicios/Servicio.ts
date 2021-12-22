export class Servicio {
  Modelo: any;
  constructor(Modelo: any) {
    this.Modelo = Modelo;
  }
  async obtener_todos(): Promise<object>;
  async obtener_todos(parametros: object): Promise<object>;
  async obtener_todos(parametros?: object) {
    if (parametros) {
      return await this.Modelo.findAll(parametros);
    } else {
      return await this.Modelo.findAll();
    }
  }
  async obtener_por_id(id: number): Promise<any> {
    return await this.Modelo.findByPk(id);
  }
  //crear instancia
  async crear_instancia(parametros: object): Promise<any> {
    return await this.Modelo.create(parametros);
  }
  async establecer_segun_id(id: number, parametros: object) {
    const instancia = await this.obtener_por_id(id);
    await instancia.set(parametros);
  }
  async _segun_id(id: number, parametros: object) {
    const instancia = await this.obtener_por_id(id);
    await instancia.update(parametros);
  }
  async actualizar_segun_instancia(instancia: any, parametros: object) {
    await instancia.update(parametros);
  }
  async eliminar_segun_id(id: number) {
    const instancia = await this.obtener_por_id(id);
    await instancia.destroy();
  }
}
