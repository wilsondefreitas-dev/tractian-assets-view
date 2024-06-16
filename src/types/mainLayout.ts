import { ICompanies } from "src/interfaces/apiData";

//

export type MainLayoutLoaderData = {
  promises: {
    companies: Promise<ICompanies | null>;
  };
};