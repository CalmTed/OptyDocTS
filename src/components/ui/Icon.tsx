import React, {CSSProperties, FC} from "react";
import { ICON, IconTypeKey } from "src/models/icons";
import styled from "styled-components";

interface IconModel{
  iconType: IconTypeKey
  style?: CSSProperties
}

const IconStyle = styled.div`
  width: 1em;
  height: 1em;
  --icon-color: var(--text-color);
  --icon-bg: var(--section-bg);
`;

const Icon: FC<IconModel> = ({iconType, style}) => {
  return <IconStyle className='icon' style={style} dangerouslySetInnerHTML={{ __html: ICON[iconType]}}></IconStyle>;
};

export default Icon;