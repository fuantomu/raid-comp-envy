/** @jsxImportSource @emotion/react */

import { FC } from "react";
import { useTranslation } from "react-i18next";
import { WarcraftPlayerClass } from "../../consts";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import ChecklistItem from "../ChecklistItem";
import useStyles from "./useStyles";

export interface RaidClassProps {
  className: WarcraftPlayerClass;
  players: BuildPlayer[];
}

const RaidClass: FC<RaidClassProps> = ({ className, players }) => {
  const styles = useStyles(className);
  const [common] = useTranslation("common");

  return (
    <ChecklistItem
      styles={styles}
      displayName={common(`classes.${className}`)}
      iconSource={IconProvider.getClassIcon(className)}
      players={players}
    />
  );
};

export default RaidClass;
