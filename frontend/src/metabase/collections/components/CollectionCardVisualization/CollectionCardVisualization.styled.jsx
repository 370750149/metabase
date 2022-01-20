import styled from "styled-components";

import EntityItem from "metabase/components/EntityItem";
import Card from "metabase/components/Card";
import { color } from "metabase/lib/colors";

const HEIGHT = 250;

export const HoverMenu = styled(EntityItem.Menu)`
  visibility: hidden;
  color: ${color("text-medium")};

  position: absolute;
  top: 3px;
  right: 3px;
  z-index: 3;
`;

export const VizCard = styled(Card)`
  position: relative;
  line-height: inherit;
  height: ${HEIGHT}px;

  &:hover {
    ${HoverMenu} {
      visibility: visible;
    }
  }
`;
