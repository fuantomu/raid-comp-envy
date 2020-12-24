import { FC } from "react";
import { Build, BuildPlayer } from "../../types";
import CompositionGroup from "../CompositionGroup";
import useStyles from "./useStyles";

export interface RaidCompositionProps {
  build: Build;
}

const RaidComposition: FC<RaidCompositionProps> = (props) => {
  const {
    build: { grouped, players, buildId },
  } = props;
  const styles = useStyles();

  if (grouped) {
    const groups: BuildPlayer[][] = Array.from(Array(9).keys()).map(() => []);
    for (const player of players) {
      let groupId = player.group ?? 0;
      groupId = groupId > 8 ? 0 : groupId;
      groups[groupId].push(player);
    }
    return (
      <div css={styles.grouped}>
        {groups.map((players, groupId) => (
          <CompositionGroup groupId={groupId} players={players} />
        ))}
      </div>
    );
  }

  return <>roles</>;
};

export default RaidComposition;
