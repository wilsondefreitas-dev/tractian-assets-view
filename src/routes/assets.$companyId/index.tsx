import "./styles.scss";
import { Params, useLoaderData } from "react-router-dom";
import { ICompany } from "src/interfaces/apiData";
import apiHandler from "src/services/ApiHandler";
import greenDotIcon from "src/globals/assets/greenDot.svg";
import storageIcon from "src/globals/assets/storage.svg";
import eDotIcon from "src/globals/assets/eDot.svg";
import radioIcon from "src/globals/assets/radio.svg";
import sensorIcon from "src/globals/assets/sensor.svg";
import AssetsList from "./components/AssetsList";

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

        <div className="assetsDetails">
          <div className="assetsDetails__header">
            <span>MOTOR RT COAL AF01</span>
            <img src={greenDotIcon} />
          </div>
          <div className="assetsDetails__file">
            <div className="assetsDetails__data">
              <div className="assetsDetails__addImage">
                <img src={storageIcon} />
                <span>Adicionar imagem do Ativo</span>
              </div>
              <div className="assetsDetails__informations">
                <div className="assetsDetails__info">
                  <div className="assetsDetails__infoData">
                    <div className="assetsDetails__lable">
                      Tipo de Equipamento
                    </div>
                    <div className="assetsDetails__value">
                      <span>Motor Elétrico (Trifásico)</span>
                    </div>
                  </div>

                  <div className="assetsDetails__infoData">
                    <div className="assetsDetails__lable">Responsáveis</div>
                    <div className="assetsDetails__value">
                      <img src={eDotIcon} />
                      <span>Elétrica</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="assetsDetails__hardware">
              <div className="assetsDetails__infoData">
                <div className="assetsDetails__lable">Sensor</div>
                <div className="assetsDetails__value">
                  <img src={sensorIcon} />
                  <span>HIO4510</span>
                </div>
              </div>

              <div className="assetsDetails__infoData">
                <div className="assetsDetails__lable">Receptor</div>
                <div className="assetsDetails__value">
                  <img src={radioIcon} />
                  <span>EUH4R27</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
