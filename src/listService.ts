/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import { action, observable, runInAction } from 'mobx';

export default class ListService<T> {
  getAPI: Function;

  @observable found: Array<T> = [];

  @observable total = 0;

  @observable isLoading = false;


  constructor(getAPI: Function) {
    this.getAPI = getAPI;
    this.total = 0;
  }

  getFind() {
  };

  parseJsonToInstance(json: any): T {
    return null;
  };

  @action
  reset(): void {
    this.total = 0;
    this.found = [];
    this.isLoading = true;
  }

  @action
  async request(): Promise<void> {
    try {
      this.isLoading = true;
      const find = this.getFind();

      // _.mergeWith(find, this.filters, this.customizer);

      const { data } = await this.getAPI({
        find
      });
      this.total = data.total;

      runInAction(() => {
        try {
          this.found = data.found.map((item: any) =>
            this.parseJsonToInstance(item)
          );
        } catch (error) {
          throw new Error(
            `500 - Incorrect data type received from API: ${error}`
          );
        }

        this.isLoading = false;
      });
    } catch (error) {
      console.error(error);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
