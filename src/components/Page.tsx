import React, { FC } from "react";
import { ACTION_NAMES, THEME_TYPE } from "src/models/constants";
import { ActionModel, AppStateModel } from "src/models/types";

interface PageModel {
  state: AppStateModel
  dispach: (arg: ActionModel)=> void
}

const Page: FC<PageModel> = ({state, dispach}) => {
  const handleClick = () => {
    dispach({
      name: ACTION_NAMES.app_setTheme,
      payload: state.theme === THEME_TYPE.light ? THEME_TYPE.dark : THEME_TYPE.light
    });
  };
  return <button onClick={handleClick}>{state.theme}</button>;
};

export default Page;