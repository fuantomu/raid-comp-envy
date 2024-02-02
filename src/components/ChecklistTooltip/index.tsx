/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BuildPlayer } from "../../types";
import { Box, Typography } from "@mui/material";
import {
  WarcraftClassColour,
  WarcraftPlayerClass,
  WarcraftPlayerRace,
  WarcraftPlayerSpec
} from "../../consts";
import WarcraftIcon from "../Icon";
import { IconProvider } from "../../utils/IconProvider";
import { openWowheadLink } from "../../utils/Wowhead";
import UUID from "../../utils/UUID";
import { useAppContext } from "../App/context";

export type Props = {
  players: BuildPlayer[];
  specs?: WarcraftPlayerSpec[];
  source?: any;
  displayName?: string;
};

const ChecklistTooltip: FC<Props> = ({ players, specs, source, displayName }) => {
  const context = useAppContext();
  const version = context.getVersion();
  const [tooltip] = useTranslation("tooltip");
  return (
    <Box
      sx={{
        border: "1px solid black",
        padding: "4px",
        borderRadius: "5px",
        background: "#242424",
        minWidth: "250px"
      }}
      display="grid"
    >
      <Typography sx={{ color: "white", fontSize: "16px", justifySelf: "center", margin: "15px" }}>
        {displayName}
      </Typography>
      <Typography sx={{ justifySelf: "center" }}>Players</Typography>
      {players.length > 0 ? (
        Object.values(players).map((player) => {
          return (
            <Box
              sx={{
                background: "#424242",
                border: "1px solid black",
                cursor: source && version ? "pointer" : "default"
              }}
              display={"grid"}
              gridTemplateColumns={"36px 1fr auto"}
              onClick={
                source && version
                  ? () => {
                      openWowheadLink(
                        WarcraftPlayerRace[specs?.toString()]
                          ? tooltip(`${source}.${version}.id`)
                          : tooltip(`${player.spec}.${source}.${version}.id`),
                        "spell",
                        version.toLowerCase()
                      );
                    }
                  : () => {}
              }
              key={UUID()}
            >
              <WarcraftIcon src={IconProvider.getSpecIcon(player.spec)}></WarcraftIcon>
              <Typography
                sx={{
                  justifySelf: "start",
                  fontSize: "15px",
                  textShadow: "1px 1px black",
                  color: WarcraftClassColour[player.class_name]
                }}
              >
                {player.name}
              </Typography>
              {source && !WarcraftPlayerClass[source] ? (
                <Typography
                  sx={{
                    textShadow: "1px 1px black",
                    fontSize: "12px",
                    margin: "5px",
                    justifySelf: "end"
                  }}
                >{`( ${
                  WarcraftPlayerRace[specs?.toString()]
                    ? tooltip(`${source}.${version}.name`)
                    : tooltip(`${player.spec}.${source}.${version}.name`)
                } )`}</Typography>
              ) : (
                <></>
              )}
            </Box>
          );
        })
      ) : (
        <Typography
          style={{
            caretColor: "transparent",
            color: "dimgray",
            userSelect: "none",
            justifySelf: "center"
          }}
          variant="subtitle2"
        >
          None
        </Typography>
      )}
      {specs ? (
        specs.length > 0 ? (
          <Box display={"grid"}>
            <Typography sx={{ marginTop: "15px", justifySelf: "center" }}>Provided by</Typography>
            <Box display={"flex"}>
              {Object.values(specs).map((spec) => {
                return (
                  <WarcraftIcon
                    sx={{ margin: "2px", cursor: "pointer" }}
                    src={
                      source === "DraeneiHit"
                        ? IconProvider.getRaceIcon(WarcraftPlayerRace.Draenei)
                        : IconProvider.getSpecIcon(spec)
                    }
                    key={UUID()}
                    onClick={
                      source && version
                        ? () => {
                            openWowheadLink(
                              WarcraftPlayerRace[specs.toString()]
                                ? tooltip(`${source}.${version}.id`)
                                : tooltip(`${spec}.${source}.${version}.id`),
                              "spell",
                              version.toLowerCase()
                            );
                          }
                        : () => {}
                    }
                  ></WarcraftIcon>
                );
              })}
            </Box>
          </Box>
        ) : (
          <Box display={"grid"}>
            <Typography sx={{ marginTop: "15px", justifySelf: "center" }}>Provided by</Typography>
            <Typography
              style={{
                caretColor: "transparent",
                color: "dimgray",
                userSelect: "none",
                justifySelf: "center"
              }}
              variant="subtitle2"
            >
              None
            </Typography>
          </Box>
        )
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ChecklistTooltip;
