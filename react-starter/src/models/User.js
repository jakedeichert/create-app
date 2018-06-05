import BaseModel from './BaseModel';

export default class User extends BaseModel {
  constructor({ id = null, name = '', email = '' }) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
