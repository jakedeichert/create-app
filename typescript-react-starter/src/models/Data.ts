import BaseModel from './BaseModel';

type model = {
  id?: number;
  value?: string;
};

export default class Data extends BaseModel {
  id: number | null;
  value: string;

  constructor({ id, value }: model) {
    super();
    this.id = id || null;
    this.value = value || '';
  }
}
