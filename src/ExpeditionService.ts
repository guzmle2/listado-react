import ListService from './listService';
import { IFoundItem } from './models';
import { data } from './fake-data';

export class ExpeditionService extends ListService<IFoundItem> {

  query: string = '';

  constructor() {
    super(() => Promise.resolve({
      data: {
        total: data.found.length,
        found: data.found.filter(item => !this.query || item.reference.includes(this.query))
      }
    }));
  }

  getFind(): any {
    return this.query;
  }

  parseJsonToInstance(json: any): IFoundItem {
    return json;
  }
}
