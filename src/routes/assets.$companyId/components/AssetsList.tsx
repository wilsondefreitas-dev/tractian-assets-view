import glassIcon from "src/globals/assets/glass.svg";
import DataTree from "./DataTree";
import { ITree, ITreeNode } from "src/interfaces/tree";
import { useRouteLoaderData } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DataFilter from "src/services/DataFilter";
import classNames from "classnames";
import thunderIcon from "src/globals/assets/thunder.svg";
import roundExclamationIcon from "src/globals/assets/roundExclamation.svg";
import { IFilter } from "src/interfaces/assetsList";

//

const AssetsList = () => {
  const treeWorker = useRef<Worker | null>(null);
  const [data, setData] = useState<ITree | null>(null);
  const [filters, setFilter] = useState<IFilter[]>([]);
  const { locations, assets } = useRouteLoaderData("assets") as {
    locations: [];
    assets: [];
  };

  //

  const filterClasses = {
    energy: classNames("assetsList__filter", {
      activated: filters.some((d) => d?.value === "energy"),
    }),
    alert: classNames("assetsList__filter", {
      activated: filters.some((d) => d?.value === "alert"),
    }),
  };

  //

  useEffect(() => {
    let fullData: ITreeNode[] = [...locations, ...assets];

    if (filters.length > 0) {
      console.time("datafilter");
      const dataFilter = new DataFilter(fullData, filters);
      console.timeEnd("datafilter");
      fullData = dataFilter.filteredData;
    }

    setTreeData(fullData);
  }, [locations, assets, filters]);

  //

  function setTreeData(rawData: ITreeNode[]) {
    setData(null);

    if (treeWorker.current?.terminate) {
      treeWorker.current?.terminate();
    }

    treeWorker.current = new Worker(
      new URL("src/workers/treeGenerator.ts", import.meta.url)
    );

    treeWorker.current.onmessage = (e) => {
      setData(e?.data);
    };

    treeWorker.current.postMessage(rawData);
  }

  function handleFilterOnClick(newFilter: IFilter) {
    const filterActivated = filters.some((d) => d.value === newFilter?.value);

    if (filterActivated) {
      const filteredFilters = filters.filter(
        (d) => d.value !== newFilter?.value
      );

      setFilter(filteredFilters);
    } else {
      setFilter([...filters, newFilter]);
    }
  }

  //

  return (
    <div className="assetsList">
      <div className="assetsList__searchBar">
        <input placeholder="Buscar Ativo ou Local" />
        <img src={glassIcon} />
      </div>
      <div className="assetsList__filtersContainer">
        <b>Filtros:</b>
        <button
          className={filterClasses?.energy}
          onClick={() =>
            handleFilterOnClick({ type: "sensorType", value: "energy" })
          }
        >
          <img src={thunderIcon} />
          Sensor de Energia
        </button>
        <button
          className={filterClasses?.alert}
          onClick={() =>
            handleFilterOnClick({ type: "status", value: "alert" })
          }
        >
          <img src={roundExclamationIcon} />
          Crítico
        </button>
      </div>
      <div className="assetsList__tree">
        {!data?.root && "Carregando..."}

        {data?.root?.childrens?.length === 0 ? (
          "Nada foi encontrado. Tente mudar os filtros."
        ) : (
          <DataTree data={data?.root?.childrens} />
        )}
      </div>
    </div>
  );
};

export default AssetsList;