import glassIcon from "src/globals/assets/glass.svg";
import DataTree from "./DataTree";
import { ITree } from "src/interfaces/tree";
import { useRouteLoaderData } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IStringsObject } from "src/interfaces/commom";

//

const AssetsList = ({ filters }: { filters: IStringsObject[] }) => {
  const [data, setData] = useState<ITree | null>(null);
  const treeWorker = useRef<Worker | null>(null);
  const { locations, assets } = useRouteLoaderData("assets") as {
    locations: [];
    assets: [];
  };

  //

  useEffect(() => {
    const fullData: [] = [...locations, ...assets];

    setTreeData(fullData);
  }, [locations, assets]);

  //

  console.log(filters);

  function setTreeData(rawData: []) {
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

  //

  return (
    <div className="assetsList">
      <div className="assetsList__searchBar">
        <input placeholder="Buscar Ativo ou Local" />
        <img src={glassIcon} />
      </div>
      <div className="assetsList__tree">
        {!data?.root ? (
          "Carregando..."
        ) : (
          <DataTree data={data?.root?.childrens} />
        )}
      </div>
    </div>
  );
};

export default AssetsList;
