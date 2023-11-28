/** @jsxImportSource @emotion/react */
import { FC, useState } from "react";
import { Build, SelectOption } from "../../types";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useAppContext } from "../App/context";
import { useTranslation } from "react-i18next";
import UUID from "../../utils/UUID";
import useStyles from "./useStyles";
import BuildTitle from "../BuildTitle";
import BuildRolesCount from "../BuildRolesCount";
import ModalAdd from "../ModalAdd";
import ChangeViewModeButton from "../ChangeViewModeButton";
import ModalCreateBuild from "../ModalCreateBuild";
import ModalDeleteBuild from "../ModalDeleteBuild";
import RaidChecklist from "../RaidChecklist";
import ModalResetBuild from "../ModalResetBuild";
import RaidComposition from "../RaidComposition";

export interface RaidProps {
  raidBuild: Build;
  editing?: boolean;
  builds: SelectOption[];
  version: String;
  id: Number;
  manager: DragDropManager;
}

const Raid: FC<RaidProps> = ({
  raidBuild,
  editing = false,
  builds,
  version,
  id,
  manager,
}) => {
  const [common] = useTranslation("common");
  const context = useAppContext();
  const styles = useStyles();
  const [visible, setVisible] = useState(true);
  const [visibleComposition, setVisibleComposition] = useState(true);
  const [visibleChecklist, setVisibleChecklist] = useState(true);
  const [grouped, setGrouped] = useState(true);

  const handleChangeGrouping = () => {
    setGrouped(!grouped);
  };


  return (
        <Card key={UUID()}>
          <CardContent style={{border:"1", borderColor: "black", backgroundColor: "#242424"}}>
          <Box sx={{cursor:"pointer"}} onClick={(event) => {event.stopPropagation(); setVisible(!visible); }} display={"grid"} gridTemplateColumns={"1fr 1fr"}>
              <Typography fontSize={"26px"} variant="subtitle1">
                {common(`build.raid.raid${id}`)}
              </Typography>
          </Box>

          {visible?
              (<Box key={UUID()} css={[styles.gridBox, styles.header]}>

                <BuildTitle
                  key={UUID()}
                  onChange={context?.handleSelectBuild(id)}
                  options={builds}
                  selected={builds.filter((build) => build.label === raidBuild.name)[0]}
                  title={raidBuild.name}
                />
                <BuildRolesCount key={UUID()} build={raidBuild} />
                <Box key={UUID()} css={[styles.gridBox, styles.buttons]}>
                  <ModalAdd />
                  <ChangeViewModeButton handleChangeGrouping={handleChangeGrouping}/>
                  <ModalCreateBuild />
                  <ModalDeleteBuild />
                </Box>
              </Box>) : <></>
          }

          </CardContent>


            <CardContent style={{border:"1", borderColor: "black", backgroundColor: "#242424"}}>
              <Box sx={{cursor:"pointer"}} onClick={(event) => {event.stopPropagation(); setVisibleComposition(!visibleComposition); }} display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                  <Typography fontSize={"26px"} variant="subtitle1">
                    {common("build.raid.composition")}
                  </Typography>
              </Box>
            {visibleComposition?
              (<Box key={UUID()} css={styles.gridBox} >
                <RaidComposition manager={manager} build={raidBuild} raid={id} editing grouped={grouped} />
              </Box>) : <></>
            }
            </CardContent>



            <CardContent style={{backgroundColor: "#242424"}}>
              <Box sx={{cursor:"pointer"}} onClick={(event) => {event.stopPropagation(); setVisibleChecklist(!visibleChecklist); }} display={"grid"} gridTemplateColumns={"1fr 1fr"}>
                  <Typography fontSize={"26px"} variant="subtitle1">
                    {common("build.raid.checklist")}
                  </Typography>
              </Box>
              {visibleChecklist? (<Box key={UUID()} css={styles.gridBox} >
                  <RaidChecklist build={raidBuild} version={version} />
                  <Box key={UUID()} css={[styles.gridBox, styles.buttons]}>
                    <ModalResetBuild />
                  </Box>
              </Box>) : <></>}
            </CardContent>



          </Card>
  );
};

export default Raid;
