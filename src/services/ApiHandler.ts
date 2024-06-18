import { ICompany } from "src/interfaces/apiData";
import { API_URL } from "src/utils/constants";

//

class ApiHandler {
  #companies: ICompany[] | null;
  #errorsMessages = {
    missingCompanyId: "companyId was not passed",
  };

  constructor() {
    this.#companies = null;
  }

  public async getCompanies(): Promise<ICompany[] | null> {
    if (this.#companies === null) {
      this.#companies = await this.#fetchData("/companies");
    }

    return this.#companies;
  }

  public async getCompany(companyId: string | undefined) {
    if (!companyId) return console.error(this.#errorsMessages);

    const res = await this.getCompanies();
    const company = res?.find((company) => company?.id === companyId);

    return company;
  }

  public async getCompanyLocations(companyId: string | undefined) {
    if (!companyId) return console.error(this.#errorsMessages);

    return await this.#fetchData(`/companies/${companyId}/locations`);
  }

  public async getCompanyAssets(companyId: string | undefined) {
    if (!companyId) return console.error(this.#errorsMessages);

    return await this.#fetchData(`/companies/${companyId}/assets`);
  }

  async #fetchData(endpoint: string) {
    try {
      const res = await fetch(`${API_URL}${endpoint}`);
      return await res.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

//

const apiHandler = new ApiHandler();

export default apiHandler;
