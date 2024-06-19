import storageIcon from "src/globals/assets/storage.svg";
import eDotIcon from "src/globals/assets/eDot.svg";
import mDotIcon from "src/globals/assets/mDot.svg";
import radioIcon from "src/globals/assets/radio.svg";
import sensorIcon from "src/globals/assets/sensor.svg";
import greenDotIcon from "src/globals/assets/greenDot.svg";
import greenThunderIcon from "src/globals/assets/greenThunder.svg";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { ITreeNode } from "src/interfaces/tree";

//

const AssetDetails = () => {
  const assetView: ITreeNode | null = useSelector(
    (state: RootState) => state.assetView.data
  );
  const sensorIconClasses = classNames("sensorIcon", {
    operating: assetView?.status === "operating",
  });

  //

  function getSensorIcon() {
    if (assetView?.sensorType === "energy") {
      return greenThunderIcon;
    }

    return greenDotIcon;
  }

  //

  return (
    <div className="assetsDetails">
      {!assetView ? (
        <div style={{ textAlign: "center" }}>
          <h4>
            Selecione um asset no menu ao lado para visualizar os detalhes
          </h4>
        </div>
      ) : (
        <>
          <div className="assetsDetails__header">
            <span>{assetView?.name}</span>
            {assetView?.sensorType && assetView?.status && (
              <img
                className={sensorIconClasses}
                src={getSensorIcon()}
                title={`status: ${assetView?.status}`}
              />
            )}
          </div>
          <div className="assetsDetails__file">
            <div className="assetsDetails__data">
              <div className="assetsDetails__addImage">
                <img src={storageIcon} />
                <span>Adicionar imagem do Ativo</span>
              </div>
              <div className="assetsDetails__informations">
                <div className="assetsDetails__info">
                  {assetView?.sensorType && (
                    <div className="assetsDetails__infoData">
                      <div className="assetsDetails__lable">
                        Tipo de Equipamento
                      </div>
                      <div className="assetsDetails__value">
                        <span>Motor Elétrico (Trifásico)</span>
                      </div>
                    </div>
                  )}

                  {assetView?.sensorType && (
                    <div className="assetsDetails__infoData">
                      <div className="assetsDetails__lable">Responsáveis</div>
                      <div className="assetsDetails__value">
                        {assetView?.sensorType === "energy" ? (
                          <>
                            <img src={eDotIcon} />
                            <span>Elétrica</span>
                          </>
                        ) : (
                          <>
                            <img src={mDotIcon} />
                            <span>Mecânica</span>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="assetsDetails__hardware">
              {assetView?.sensorId && (
                <div className="assetsDetails__infoData">
                  <div className="assetsDetails__lable">Sensor</div>
                  <div className="assetsDetails__value">
                    <img src={sensorIcon} />
                    <span>{assetView?.sensorId}</span>
                  </div>
                </div>
              )}

              {assetView?.gatewayId && (
                <div className="assetsDetails__infoData">
                  <div className="assetsDetails__lable">Receptor</div>
                  <div className="assetsDetails__value">
                    <img src={radioIcon} />
                    <span>{assetView?.gatewayId}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AssetDetails;
