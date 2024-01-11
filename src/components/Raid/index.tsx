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
import ChangeViewModeButton from "../ChangeViewModeButton";
import ModalCreateBuild from "../ModalCreateBuild";
import ModalDeleteBuild from "../ModalDeleteBuild";
import RaidChecklist from "../RaidChecklist";
import ModalResetBuild from "../ModalResetBuild";
import RaidComposition from "../RaidComposition";
import BasicBuild from "../BasicBuild";
import { ArrowDropDown, ArrowLeft } from "@mui/icons-material";

export interface RaidProps {
  raidBuild: Build;
  editing?: boolean;
  builds: SelectOption[];
  version: string;
  id: number;
  manager: any;
}

const Raid: FC<RaidProps> = ({
  raidBuild,
  editing = false,
  builds,
  version,
  id,
  manager
}) => {
  const [common] = useTranslation("common");
  const context = useAppContext();
  const styles = useStyles();
  const [visible, setVisible] = useState(true);
  const [visibleComposition, setVisibleComposition] = useState(true);
  const [visibleChecklist, setVisibleChecklist] = useState(false);
  const [visibleAbsent, setVisibleAbsent] = useState(true);
  const [visibleNotSet, setVisibleNotSet] = useState(true);
  const [grouped, setGrouped] = useState(true);

  const handleChangeGrouping = () => {
    setGrouped(!grouped);
  };


  return (
        <Card key={UUID()}>
          <CardContent key={UUID()} style={{border:"1", borderColor: "black", backgroundColor: "#242424"}}>
          <Box key={UUID()} sx={{cursor:"pointer"}} onClick={(event) => {event.stopPropagation(); setVisible(!visible); }} display={"grid"} gridTemplateColumns={"1fr 20px"}>
              <Typography style={{caretColor: "transparent"}} fontSize={"26px"} variant="subtitle1">
                {common(`build.raid.raid${id}`)}
              </Typography>
              {visible? <ArrowDropDown></ArrowDropDown>: <ArrowLeft></ArrowLeft> }
          </Box>

          {visible?
              (
                <Box display={"grid"} gridTemplateColumns={"1fr 2fr"}>
                  <Box >
                    <BuildTitle
                      key={UUID()}
                      onChange={context?.handleSelect(id)}
                      options={context?.getBuilds()??[]}
                      selected={builds.filter((build) => build.label === raidBuild.name)[0]}
                      title={raidBuild.name}
                      buildId={id}
                      buildDate={raidBuild.date}
                      version={version}
                      selectedInstance={raidBuild.instance}
                    />
                    <br></br>
                    <BuildRolesCount key={UUID()} build={raidBuild} />
                    <Box key={UUID()} css={[styles.gridBox, styles.buttons]}>
                      <ChangeViewModeButton handleChangeGrouping={handleChangeGrouping}/>
                      <ModalCreateBuild buildId={id}/>
                      <ModalDeleteBuild buildId={id}/>
                    </Box>
                  </Box>
                  <Box display={"grid"}  gridTemplateColumns={"15px 1fr 15px 1fr"}>
                  <br></br>
                    <Box key={UUID()} sx={{cursor:"pointer"}} onClick={(event) => {event.stopPropagation(); setVisibleAbsent(!visibleAbsent); }}>
                      <BasicBuild manager={manager} players={context?.getAbsentPlayers(id)?? []} raid={id} name="absent" visible={visibleAbsent}/>
                    </Box>
                    <br></br>
                    <Box key={UUID()} sx={{cursor:"pointer"}} onClick={(event) => {event.stopPropagation(); setVisibleNotSet(!visibleNotSet); }}>
                      <BasicBuild manager={manager} players={context?.getUnsetMains() ?? []} raid={id} name="notset" visible={visibleNotSet}/>
                    </Box>

                  </Box>
                </Box>
              ) : <></>
          }

          </CardContent>


            <CardContent key={UUID()} style={{border:"1", borderColor: "black", backgroundColor: "#242424"}}>
              <Box key={UUID()} sx={{cursor:"pointer"}} onClick={(event) => {event.stopPropagation(); setVisibleComposition(!visibleComposition); }} display={"grid"} gridTemplateColumns={"1fr 20px"}>
                  <Typography style={{caretColor: "transparent"}} fontSize={"26px"} variant="subtitle1">
                    {common("build.raid.composition")}
                  </Typography>
                  {visibleComposition? <ArrowDropDown></ArrowDropDown>: <ArrowLeft></ArrowLeft> }
              </Box>
            {visibleComposition?
              (<Box key={UUID()} css={styles.gridBox} >
                <RaidComposition manager={manager} build={raidBuild} raid={id} editing grouped={grouped} />
              </Box>) : <></>
            }
            </CardContent>



            <CardContent key={UUID()} style={{backgroundColor: "#242424"}}>
              <Box key={UUID()} sx={{cursor:"pointer"}} onClick={(event) => {event.stopPropagation(); setVisibleChecklist(!visibleChecklist); }} display={"grid"} gridTemplateColumns={"1fr 20px"}>
                  <Typography style={{caretColor: "transparent"}} fontSize={"26px"} variant="subtitle1">
                    {common("build.raid.checklist")}
                  </Typography>
                  {visibleChecklist? <ArrowDropDown></ArrowDropDown>: <ArrowLeft></ArrowLeft> }
              </Box>
              {visibleChecklist? (<Box key={UUID()} css={styles.gridBox} >
                  <RaidChecklist build={raidBuild} version={version} />
                  <Box key={UUID()} css={[styles.gridBox, styles.buttons]}>
                    <ModalResetBuild buildId={id}/>
                  </Box>
              </Box>) : <></>}
            </CardContent>
          </Card>
  );
};

export default Raid;
