import React, {CSSProperties, FC} from "react";
import { PageStyle } from "./Stack";
import { AppStateModel, BlockModel, StoreModel } from "src/models/types";
import considerZooming from "src/store/considerZooming";
import { MI_LISTITEM_TYPE, ONE, ZERO } from "src/models/constants";
import { TemplateMIs } from "src/models/templateMIs";
import { Block } from "./Block";

interface EditStackModel{
  store: StoreModel
}

export const EditStack: FC<EditStackModel> = ({store}) => {
  
  const pageStyles: (arg: AppStateModel) => React.CSSProperties = (state) => {
    let ret:CSSProperties = {};
    state.templates[0].menuItems.filter(
      mi => TemplateMIs.find(tmi => tmi.name === mi.miListItemName)?.miType === MI_LISTITEM_TYPE.templateCSS || false).map(
      cssMI => {
        const listMI = TemplateMIs.find(tmi => tmi.name === cssMI.miListItemName);
        if(!listMI || listMI.miType !== MI_LISTITEM_TYPE.templateCSS) {
          return;
        }
        if(!listMI.CSSParam) {
          return;
        }
        ret = {
          ...ret,
          [listMI.CSSParam]: considerZooming(String(cssMI.miListItemValue))
        };
      });
    return ret;
  };
  const renderPage: (block: BlockModel[], store: StoreModel) => React.ReactNode = (blocks, store) => {
    const pageKey = `${blocks[0].uuid}${blocks[blocks.length - ONE].uuid}`;
    return <PageStyle
      key={pageKey}
      className="page"
      style={pageStyles(store.state)}
    >
      {
        blocks.map(block => 
          <Block key={block.uuid} classes="rootBlock" store={store} block={block}></Block>
        )
      }
    </PageStyle>;
  };
  const rootChildren = store.state.templates[0].blocks.filter(block => block.parentId === null);
  const rootBlocks: (blocks: BlockModel[]) => BlockModel[][] = (blocks) => {
    //v.3
    //we expect page style to be
    // display: flex, justify-content: start, align-content: start
    const ret:BlockModel[][] = [];
    let pageIndex = ZERO;
    let blockIndex = ZERO;
    const blocksLength = blocks.length - ONE;
    let rowTop = ZERO;
    let borderB = ZERO;
    let borderR = ZERO;
    while(blockIndex <= blocksLength) {
      const blockFtpW = blocks[blockIndex].FTPProportions.width;
      const blockFtpH = blocks[blockIndex].FTPProportions.height;
      //do we need to break page?
      if(rowTop + blockFtpH > ONE) {
        pageIndex++;
        rowTop = ZERO;
        borderB = ZERO;
        borderR = ZERO;
      }else{
        //do we need to break line?
        if(borderR + blockFtpW > ONE) {
          rowTop = borderB;
          borderR = blockFtpW;
          borderB = borderB + blockFtpH;
          //do we need to break page now?
          if(borderB > ONE) {
            pageIndex++;
            rowTop = ZERO;
            borderB = ZERO;
            borderR = ZERO;
            //do we need to update borderB?
            if(rowTop + blockFtpH > borderB) {
              borderB = rowTop + blockFtpH;
            }
            //at least updating borderR
            borderR += blockFtpW;
          }
        }else{
          //do we need to update borderB?
          if(rowTop + blockFtpH > borderB) {
            borderB = rowTop + blockFtpH;
          }
          //at least updating borderR
          borderR += blockFtpW;
        }
      }
      if(!ret[pageIndex]) {
        ret[pageIndex] = [];
      }
      ret[pageIndex].push(blocks[blockIndex]);
      blockIndex++;
    }
    return ret;
  };
  return <>{
    rootBlocks(rootChildren).map(childList => {
      return renderPage(childList, store);
    })
  }
  </>;
};