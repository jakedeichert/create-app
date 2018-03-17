import BaseModel from './BaseModel';

export default class Data extends BaseModel {
  constructor({ id, value }) {
    super();
    this.id = id || null;
    this.value = value || '';
  }
}
