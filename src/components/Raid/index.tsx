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
import ModalPostDiscord from "../ModalPostDiscord";

export interface RaidProps {
  raidBuild: Build;
  editing?: boolean;
  builds: SelectOption[];
  version: string;
  id: number;
  manager: any;
  accountRole: number;
}

const Raid: FC<RaidProps> = ({
  raidBuild,
  editing = false,
  builds,
  version,
  id,
  manager,
  accountRole
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
        <Card style={{borderBottom: `1px solid black`, borderTop: `3px solid #ad0a0a`, borderRight: `1px solid black`}} key={UUID()}>
          <CardContent key={UUID()} style={{borderBottom: `1px solid black`, backgroundColor: "#242424"}}>
          <Box key={UUID()} sx={{cursor:"pointer", border: `1px solid black`, marginBottom:"10px"}} onClick={(event) => {event.stopPropagation(); setVisible(!visible); }} display={"grid"} gridTemplateColumns={"1fr auto"}>
              <Typography style={{caretColor: "transparent", marginLeft:"8px"}} fontSize={"26px"} variant="subtitle1">
                {common(`build.raid.raid${id}`)}
              </Typography>
              {visible? <ArrowDropDown sx={{padding:"24", width:"48px", height:"48px"}}></ArrowDropDown>: <ArrowLeft sx={{padding:"24", width:"48px", height:"48px"}}></ArrowLeft> }
          </Box>

          {visible?
              (
                <Box display={"grid"} gridTemplateColumns={"1fr 2fr"}>
                  <Box >
                    <BuildTitle
                      key={UUID()}
                      onChange={context?.handleSelect(id)}
                      options={context?.getBuilds()??[]}
                      selected={builds.find((build) => build.value === raidBuild?.id)}
                      title={raidBuild?.name}
                      buildId={id}
                      buildDate={raidBuild?.date}
                      version={version}
                      selectedInstance={raidBuild?.instance}
                      accountRole={accountRole}
                    />
                    <br></br>
                    <BuildRolesCount key={UUID()} build={raidBuild} />
                    <Box key={UUID()} css={[styles.gridBox, styles.buttons]}>
                      <ChangeViewModeButton handleChangeGrouping={handleChangeGrouping}/>
                      <ModalCreateBuild buildId={id} accountRole={accountRole}/>
                      <ModalDeleteBuild buildId={id} accountRole={accountRole}/>
                    </Box>
                  </Box>
                  <Box display={"grid"} gridTemplateColumns={"15px 1fr 15px 250px"}>
                    <br></br>
                    <Box key={UUID()} sx={{cursor:"pointer", height:"max-content", border: `1px solid black`}} onClick={(event) => {event.stopPropagation(); setVisibleNotSet(!visibleNotSet); }}>
                      <BasicBuild manager={manager} players={context?.getUnsetMains(id) ?? []} raid={id} name="notset" visible={visibleNotSet} accountRole={accountRole}/>
                    </Box>
                    <br></br>
                    <Box key={UUID()} sx={{cursor:"pointer", height:"max-content", border: `1px solid black`}} onClick={(event) => {event.stopPropagation(); setVisibleAbsent(!visibleAbsent); }}>
                      <BasicBuild manager={manager} players={context?.getAbsentPlayers(id)?? []} raid={id} name="absent" visible={visibleAbsent} accountRole={accountRole}/>
                    </Box>



                  </Box>
                </Box>
              ) : <></>
          }

          </CardContent>


            <CardContent key={UUID()} style={{borderBottom: `1px solid black`, backgroundColor: "#242424"}}>
              <Box key={UUID()} sx={{cursor:"pointer", border: `1px solid black`, marginBottom:"10px"}} onClick={(event) => {event.stopPropagation(); setVisibleComposition(!visibleComposition); }} display={"grid"} gridTemplateColumns={"1fr auto"}>
                  <Typography style={{caretColor: "transparent", marginLeft:"8px"}} fontSize={"26px"} variant="subtitle1">
                    {common("build.raid.composition")}
                  </Typography>
                  {visibleComposition? <ArrowDropDown sx={{padding:"24", width:"48px", height:"48px"}}></ArrowDropDown>: <ArrowLeft sx={{padding:"24", width:"48px", height:"48px"}}></ArrowLeft> }
              </Box>
            {visibleComposition?
              (<Box key={UUID()} css={styles.gridBox} >
                <RaidComposition manager={manager} players={raidBuild?.players} raid={id} editing grouped={grouped} accountRole={accountRole} />
              </Box>) : <></>
            }
            </CardContent>



            <CardContent key={UUID()} style={{backgroundColor: "#242424"}}>
              <Box key={UUID()} sx={{cursor:"pointer", border: `1px solid black`, marginBottom:"10px"}} onClick={(event) => {event.stopPropagation(); setVisibleChecklist(!visibleChecklist); }} display={"grid"} gridTemplateColumns={"1fr auto"}>
                  <Typography style={{caretColor: "transparent", marginLeft: "8px"}} fontSize={"26px"} variant="subtitle1">
                    {common("build.raid.checklist")}
                  </Typography>
                  {visibleChecklist? <ArrowDropDown sx={{padding:"24", width:"48px", height:"48px"}}></ArrowDropDown>: <ArrowLeft sx={{padding:"24", width:"48px", height:"48px"}}></ArrowLeft> }
              </Box>
              {visibleChecklist? (<Box key={UUID()} css={styles.gridBox} >
                  <RaidChecklist build={raidBuild} version={version} />
              </Box>) : <></>}
              <Box key={UUID()} css={[styles.gridBox, styles.buttons]}>
                <ModalPostDiscord buildId={id} accountRole={accountRole}/>
                <ModalResetBuild buildId={id} accountRole={accountRole}/>
              </Box>

            </CardContent>
          </Card>
  );
};

export default Raid;
