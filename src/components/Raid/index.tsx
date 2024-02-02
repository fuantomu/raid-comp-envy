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
  builds: SelectOption[];
  version: string;
  id: number;
  manager: any;
  selectedBuild: SelectOption;
}

const Raid: FC<RaidProps> = ({ raidBuild, builds, version, id, manager, selectedBuild }) => {
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
    <Card
      style={{
        borderBottom: `1px solid black`,
        borderTop: `3px solid #ad0a0a`,
        borderRight: `1px solid black`
      }}
      key={UUID()}
    >
      <CardContent
        key={UUID()}
        style={{ borderBottom: `1px solid black`, backgroundColor: "#242424" }}
      >
        <Box
          key={UUID()}
          sx={{
            cursor: "pointer",
            border: `1px solid black`,
            borderRadius: "5px",
            marginBottom: "10px"
          }}
          onClick={(event) => {
            event.stopPropagation();
            setVisible(!visible);
          }}
          display={"grid"}
          gridTemplateColumns={"1fr auto"}
        >
          <Typography
            style={{ caretColor: "transparent", marginLeft: "8px" }}
            fontSize={"26px"}
            variant="subtitle1"
          >
            {common(`build.raid.raid${id}`)}
          </Typography>
          {visible ? (
            <ArrowDropDown sx={{ width: "48px", height: "48px" }}></ArrowDropDown>
          ) : (
            <ArrowLeft sx={{ width: "48px", height: "48px" }}></ArrowLeft>
          )}
        </Box>

        {visible ? (
          <Box display={"grid"} gridTemplateColumns={"1fr 2fr"}>
            <Box>
              <BuildTitle
                key={UUID()}
                options={builds ?? []}
                selected={selectedBuild}
                build_id={id}
                buildDate={raidBuild?.date}
                version={version}
                selectedInstance={raidBuild?.instance}
              />
              <br></br>
              <BuildRolesCount key={UUID()} build={raidBuild} />
              <Box key={UUID()} css={[styles.gridBox, styles.buttons]}>
                <ChangeViewModeButton handleChangeGrouping={handleChangeGrouping} />
                <ModalCreateBuild build_id={id} />
                <ModalDeleteBuild id={raidBuild?.id} />
              </Box>
            </Box>
            <Box display={"grid"} gridTemplateColumns={"2fr 1fr"}>
              <Box sx={{ marginLeft: "5px" }}>
                <Box
                  key={UUID()}
                  sx={{
                    cursor: "pointer",
                    border: `1px solid black`,
                    borderRadius: "5px 5px 0px 0px"
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    setVisibleNotSet(!visibleNotSet);
                  }}
                  display={"grid"}
                  gridTemplateColumns={"1fr auto"}
                >
                  <Typography
                    style={{ caretColor: "transparent", marginLeft: "8px" }}
                    variant="subtitle1"
                  >
                    {common("build.groups.group_each", { group_id: "notset" })}
                  </Typography>
                  {visibleNotSet ? <ArrowDropDown></ArrowDropDown> : <ArrowLeft></ArrowLeft>}
                </Box>
                {visibleNotSet ? (
                  <BasicBuild
                    manager={manager}
                    players={context?.getUnsetMains(id) ?? []}
                    raid={id}
                  />
                ) : (
                  <></>
                )}
              </Box>
              <Box sx={{ marginLeft: "5px" }}>
                <Box
                  key={UUID()}
                  sx={{
                    cursor: "pointer",
                    border: `1px solid black`,
                    borderRadius: "5px 5px 0px 0px"
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    setVisibleAbsent(!visibleAbsent);
                  }}
                  display={"grid"}
                  gridTemplateColumns={"1fr auto"}
                >
                  <Typography
                    style={{ caretColor: "transparent", marginLeft: "8px" }}
                    variant="subtitle1"
                  >
                    {common("build.groups.group_each", { group_id: "absent" })}
                  </Typography>
                  {visibleAbsent ? <ArrowDropDown></ArrowDropDown> : <ArrowLeft></ArrowLeft>}
                </Box>
                {visibleAbsent ? (
                  <BasicBuild
                    manager={manager}
                    players={context?.getAbsentPlayers(id) ?? []}
                    raid={id}
                  />
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </CardContent>

      <CardContent
        key={UUID()}
        style={{ borderBottom: `1px solid black`, backgroundColor: "#242424" }}
      >
        <Box
          key={UUID()}
          sx={{
            cursor: "pointer",
            border: `1px solid black`,
            marginBottom: "10px",
            borderRadius: "5px"
          }}
          onClick={(event) => {
            event.stopPropagation();
            setVisibleComposition(!visibleComposition);
          }}
          display={"grid"}
          gridTemplateColumns={"1fr auto"}
        >
          <Typography
            style={{ caretColor: "transparent", marginLeft: "8px" }}
            fontSize={"26px"}
            variant="subtitle1"
          >
            {common("build.raid.composition")}
          </Typography>
          {visibleComposition ? (
            <ArrowDropDown sx={{ width: "48px", height: "48px" }}></ArrowDropDown>
          ) : (
            <ArrowLeft sx={{ width: "48px", height: "48px" }}></ArrowLeft>
          )}
        </Box>
        {visibleComposition ? (
          <Box key={UUID()} css={styles.gridBox}>
            <RaidComposition
              manager={manager}
              players={raidBuild?.players}
              raid={id}
              grouped={grouped}
            />
          </Box>
        ) : (
          <></>
        )}
      </CardContent>

      <CardContent key={UUID()} style={{ backgroundColor: "#242424" }}>
        <Box
          key={UUID()}
          sx={{
            cursor: "pointer",
            border: `1px solid black`,
            marginBottom: "10px",
            borderRadius: "5px"
          }}
          onClick={(event) => {
            event.stopPropagation();
            setVisibleChecklist(!visibleChecklist);
          }}
          display={"grid"}
          gridTemplateColumns={"1fr auto"}
        >
          <Typography
            style={{ caretColor: "transparent", marginLeft: "8px" }}
            fontSize={"26px"}
            variant="subtitle1"
          >
            {common("build.raid.checklist")}
          </Typography>
          {visibleChecklist ? (
            <ArrowDropDown sx={{ width: "48px", height: "48px" }}></ArrowDropDown>
          ) : (
            <ArrowLeft sx={{ width: "48px", height: "48px" }}></ArrowLeft>
          )}
        </Box>
        {visibleChecklist ? (
          <Box key={UUID()} css={styles.gridBox}>
            <RaidChecklist build={raidBuild} version={version} />
          </Box>
        ) : (
          <></>
        )}
        <Box key={UUID()} css={[styles.gridBox, styles.buttons]}>
          <ModalPostDiscord build_id={id} />
          <ModalResetBuild build_id={id} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Raid;
