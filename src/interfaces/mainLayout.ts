import { ICompany } from "src/interfaces/apiData";

//

export interface MainLayoutLoaderData {
  promises: { companies: Promise<ICompany[] | null> };
}
