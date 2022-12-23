import React, { FC } from "react";
import { BlockModel, StoreModel } from "src/models/types";
import { PageStyle } from "./Stack";
import { Block } from "./Block";
import { ONE } from "src/models/constants";
import { clasterByFTP, pageStyles } from "./EditStack";

interface CopiesStackModel{
  store: StoreModel
}

export const CopiesStack: FC<CopiesStackModel> = ({store}) => {

  const rootCopyChildren = store.state.templates[0].copyRows.map(copyRow => 
    store.state.templates[0].blocks.filter(block => block.parentId === null).map(b => {
      return {
        ...b,
        copyRowUUID: copyRow.uuid
      }; 
    })
  ).flat();


  const renderPage = (childList: BlockModel[], store: StoreModel) => {
    const pageKey = `${childList[0].uuid}-${childList[0].copyRowUUID}-${childList[childList.length - ONE].uuid}-${childList[childList.length - ONE].copyRowUUID}`;
    return <PageStyle
      key={pageKey}
      style={pageStyles(store.state)}
      className={"page"}
    >
      {childList.map(child => {
        const blockKey = `${child.uuid}-${child.copyRowUUID}`;
        return <Block key={blockKey} store={store} block={child} copyRowUUID={child.copyRowUUID}></Block>;
      }) 
      }
    </PageStyle>;
  };
  return <>
    {
      clasterByFTP(rootCopyChildren).map(childList => {
        return renderPage(childList, store);
      })
    }
  </>;
};