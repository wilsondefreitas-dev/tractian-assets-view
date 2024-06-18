import { ICompany } from "src/interfaces/apiData";

//

export type MainLayoutLoaderData = {
  promises: {
    companies: Promise<ICompany | null>;
  };
};
