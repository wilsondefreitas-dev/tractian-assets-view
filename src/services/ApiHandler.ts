import { ICompanies } from "src/interfaces/apiData";
import { API_URL } from "src/utils/constants";

//

export default class ApiHandler{

  public async getCompanies() : Promise<ICompanies | null> {

    const res = await this.#fetchData('/companies');
    return res;

  }

  async #fetchData(endpoint:string){
    try {
      const res = await fetch(`${API_URL}${endpoint}`);
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  }

}