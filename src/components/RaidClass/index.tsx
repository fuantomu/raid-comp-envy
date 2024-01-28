/** @jsxImportSource @emotion/react */

import { FC } from "react";
import { useTranslation } from "react-i18next";
import { WarcraftPlayerClass } from "../../consts";
import { BuildPlayer } from "../../types";
import { IconProvider } from "../../utils/IconProvider";
import ChecklistItem from "../ChecklistItem";
import useStyles from "./useStyles";

export interface RaidClassProps {
  class_name: WarcraftPlayerClass;
  players: BuildPlayer[];
}

const RaidClass: FC<RaidClassProps> = ({ class_name, players }) => {
  const styles = useStyles(class_name);
  const [common] = useTranslation("common");

  return (
    <ChecklistItem
      styles={styles}
      displayName={common(`classes.${class_name}`)}
      iconSource={IconProvider.getClassIcon(class_name)}
      players={players}
      source={class_name}
    />
  );
};

export default RaidClass;
