import { IFilter } from "src/interfaces/assetsList";
import { ITreeNode } from "src/interfaces/tree";

//

export default class DataFilter {
  filters: IFilter[];
  data: ITreeNode[];
  filteredData: ITreeNode[] = [];
  idsToLook: string[] = [];

  constructor(data: ITreeNode[], filters: IFilter[]) {
    this.filters = filters;
    this.data = data;

    this.filterData();
  }

  filterData() {
    this.data = this.data.filter((child) => {
      const matchFilters = this?.filters.every((filter) => {
        const childAttr: string = child[filter?.type] as string;

        return childAttr?.toLowerCase().includes(filter?.value?.toLowerCase());
      });

      if (matchFilters) {
        const parentIdAlreadyPushed = this.idsToLook.some(
          (id) => id === child?.parentId
        );

        const locationIdAlreadyPushed = this.idsToLook.some(
          (id) => id === child?.locationId
        );

        if (child?.parentId && !parentIdAlreadyPushed) {
          this.idsToLook.push(child?.parentId);
        }

        if (child?.locationId && !locationIdAlreadyPushed) {
          this.idsToLook.push(child?.locationId);
        }

        this?.filteredData.push(child);

        return false;
      }

      return true;
    });

    if (this.data.length > 0) this.findParents();
  }

  stillMatching = false;

  findParents() {
    const idsToLookOnStart = [...this.idsToLook];

    this.data = this.data.filter((child) => {
      const matchId = this.idsToLook?.some((id) => child?.id === id);

      if (matchId) {
        const parentIdAlreadyPushed = this.idsToLook.some(
          (id) => id === child?.parentId
        );

        const locationIdAlreadyPushed = this.idsToLook.some(
          (id) => id === child?.locationId
        );

        if (child?.parentId && !parentIdAlreadyPushed) {
          this.idsToLook.push(child?.parentId);
        }

        if (child?.locationId && !locationIdAlreadyPushed) {
          this.idsToLook.push(child?.locationId);
        }

        this?.filteredData.push(child);

        return false;
      }

      return true;
    });

    if (this.idsToLook.length > idsToLookOnStart.length) this.findParents();
  }
}
