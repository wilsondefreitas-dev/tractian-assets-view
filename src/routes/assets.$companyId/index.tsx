import "./styles.scss";
import { Params, useLoaderData } from "react-router-dom";
import { ICompany } from "src/interfaces/apiData";
import apiHandler from "src/services/ApiHandler";
import AssetsList from "./components/AssetsList";
import AssetDetails from "./components/AssetDetails";

//

async function loader({ params }: { params: Params }) {
  const { companyId } = params;
  const [company, locations, assets] = await Promise.all([
    apiHandler.getCompany(companyId),
    apiHandler.getCompanyLocations(companyId),
    apiHandler.getCompanyAssets(companyId),
  ]);

  return { company, locations, assets };
}

//

const Component = () => {
  const { company } = useLoaderData() as { company: ICompany };

  //

  //

  return (
    <div className="assetsPage">
      <div className="assetsPage__header">
        <div className="assetsPage__title">
          <b>Ativos</b> / {company?.name}
        </div>
      </div>

      <div className="assetsPage__container">
        <AssetsList />
        <AssetDetails />
      </div>
    </div>
  );
};

export default {
  $companyId: {
    Component,
    loader,
  },
};
