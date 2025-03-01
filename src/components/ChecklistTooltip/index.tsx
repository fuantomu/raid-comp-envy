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
import ChecklistTooltipClass from "../ChecklistTooltipClass";

export type Props = {
  players: BuildPlayer[];
  list?: { specs: WarcraftPlayerSpec[]; classes: {} };
  source?: any;
  displayName?: string;
};

const ChecklistTooltip: FC<Props> = ({ players, list, source, displayName }) => {
  const context = useAppContext();
  const version = context.getVersion();
  const [tooltip] = useTranslation("tooltip");
  const existingClasses = [];
  return (
    <Box
      sx={{
        border: "1px solid black",
        padding: "4px",
        borderRadius: "5px",
        background: "#242424",
        minWidth: "420px"
      }}
      display="grid"
      key={UUID()}
    >
      <Typography sx={{ color: "white", fontSize: "16px", justifySelf: "center", margin: "15px" }}>
        {displayName}
      </Typography>
      <Typography sx={{ justifySelf: "center" }}>Players</Typography>
      {players.length > 0 ? (
        Object.values(
          players.sort((a, b) => {
            if (a.class_name < b.class_name) {
              return -1;
            }
            if (a.class_name > b.class_name) {
              return 1;
            }
            return 0;
          })
        ).map((player) => {
          if (source && version) {
            if (source === player.class_name) {
              return (
                <Box
                  sx={{
                    background: "#424242",
                    border: "1px solid black",
                    cursor: source && version ? "pointer" : "default"
                  }}
                  display={"grid"}
                  gridTemplateColumns={"36px 1fr auto"}
                  onClick={() =>
                    window.open(`${process.env.REACT_APP_DASHBOARD}${player.name}`, "_blank")
                  }
                  key={UUID()}
                >
                  <WarcraftIcon
                    css={{ width: "28px", height: "28px" }}
                    src={IconProvider.getSpecIcon(player.spec)}
                  ></WarcraftIcon>
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
                </Box>
              );
            }

            if (!WarcraftPlayerClass[source] && WarcraftPlayerRace[list.specs?.toString()]) {
              const raceUtility = tooltip(`${source}.${version}`, {
                returnObjects: true
              }) as Array<{ id: string; name: string }>;
              return (raceUtility ? raceUtility : []).map((utility) => {
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
                            openWowheadLink(utility.id, "spell", version.toLowerCase());
                          }
                        : () => {}
                    }
                    key={UUID()}
                  >
                    <WarcraftIcon
                      css={{ width: "28px", height: "28px" }}
                      src={IconProvider.getSpecIcon(player.spec)}
                    ></WarcraftIcon>
                    <Typography
                      sx={{
                        marginTop: "3px",
                        justifySelf: "start",
                        fontSize: "15px",
                        textShadow: "1px 1px black",
                        color: WarcraftClassColour[player.class_name]
                      }}
                    >
                      {player.name}
                    </Typography>
                    <Typography
                      sx={{
                        textShadow: "1px 1px black",
                        fontSize: "12px",
                        margin: "5px",
                        justifySelf: "end"
                      }}
                    >
                      {`( ${utility.name} )`}
                    </Typography>
                  </Box>
                );
              });
            }
            const specUtility = tooltip(`${player.spec}.${source}.${version}`, {
              returnObjects: true
            }) as Array<{ id: string; name: string }>;

            // if tooltip does not exist in language file
            if (typeof specUtility == typeof `${player.spec}.${source}.${version}`) {
              return (
                <Box
                  sx={{
                    background: "#424242",
                    border: "1px solid black",
                    cursor: "default"
                  }}
                  display={"grid"}
                  gridTemplateColumns={"36px 1fr auto"}
                  key={UUID()}
                >
                  <WarcraftIcon
                    css={{ width: "28px", height: "28px" }}
                    src={IconProvider.getSpecIcon(player.spec)}
                  ></WarcraftIcon>
                  <Typography
                    sx={{
                      marginTop: "3px",
                      justifySelf: "start",
                      fontSize: "15px",
                      textShadow: "1px 1px black",
                      color: WarcraftClassColour[player.class_name]
                    }}
                  >
                    {player.name}
                  </Typography>
                  <Typography
                    sx={{
                      textShadow: "1px 1px black",
                      fontSize: "12px",
                      margin: "5px",
                      justifySelf: "end"
                    }}
                  >
                    {`( ${player.spec}.${source}.${version} )`}
                  </Typography>
                </Box>
              );
            }

            return specUtility.map((utility) => {
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
                          openWowheadLink(utility.id, "spell", version.toLowerCase());
                        }
                      : () => {}
                  }
                  key={UUID()}
                >
                  <WarcraftIcon
                    css={{ width: "28px", height: "28px" }}
                    src={IconProvider.getSpecIcon(player.spec)}
                  ></WarcraftIcon>
                  <Typography
                    sx={{
                      marginTop: "3px",
                      justifySelf: "start",
                      fontSize: "15px",
                      textShadow: "1px 1px black",
                      color: WarcraftClassColour[player.class_name]
                    }}
                  >
                    {player.name}
                  </Typography>
                  <Typography
                    sx={{
                      textShadow: "1px 1px black",
                      fontSize: "12px",
                      margin: "5px",
                      justifySelf: "end"
                    }}
                  >
                    {`( ${utility.name} )`}
                  </Typography>
                </Box>
              );
            });
          }
          return <></>;
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
      {list.specs && Object.values(list.classes).length !== 0 ? (
        list.specs.length > 0 ? (
          <Box display={"grid"} key={UUID()}>
            <Typography sx={{ marginTop: "15px", justifySelf: "center" }}>Provided by</Typography>
            <Box css={{ width: "24px", height: "24px" }} display={"flex"} key={UUID()}>
              {Object.values(list.specs).map((spec) => {
                const class_name = spec.toString().match(/[A-Z][a-z]+/g)[0] as WarcraftPlayerClass;
                if (!WarcraftPlayerClass[source] && WarcraftPlayerRace[list.specs?.toString()]) {
                  const raceUtility = tooltip(`${source}.${version}`, {
                    returnObjects: true
                  }) as Array<{ id: string; name: string }>;

                  // if tooltip does not exist in language file
                  if (typeof raceUtility == typeof `${source}.${version}`) {
                    return (
                      <WarcraftIcon
                        css={{ width: "24px", height: "24px" }}
                        sx={{ margin: "2px", cursor: "default" }}
                        src={IconProvider.getRaceIcon(spec.toString() as WarcraftPlayerRace)}
                        key={UUID()}
                      ></WarcraftIcon>
                    );
                  }

                  return raceUtility.map((utility) => {
                    return (
                      <WarcraftIcon
                        css={{ width: "24px", height: "24px" }}
                        sx={{ margin: "2px", cursor: "pointer" }}
                        src={IconProvider.getRaceIcon(spec.toString() as WarcraftPlayerRace)}
                        key={UUID()}
                        onClick={
                          source && version
                            ? () => {
                                openWowheadLink(utility.id, "spell", version.toLowerCase());
                              }
                            : () => {}
                        }
                      ></WarcraftIcon>
                    );
                  });
                }

                if (
                  (list.classes[class_name] === 3 && class_name !== "Druid") ||
                  list.classes[class_name] === 4
                ) {
                  if (!existingClasses.includes(class_name)) {
                    existingClasses.push(class_name);
                    const specUtility = tooltip(`${spec}.${source}.${version}`, {
                      returnObjects: true
                    }) as Array<{ id: string; name: string }>;

                    // if tooltip does not exist in language file
                    if (typeof specUtility == typeof `${spec}.${source}.${version}`) {
                      return (
                        <WarcraftIcon
                          css={{ width: "24px", height: "24px" }}
                          sx={{ margin: "2px", cursor: "default" }}
                          src={IconProvider.getClassIcon(class_name)}
                          key={UUID()}
                        ></WarcraftIcon>
                      );
                    }

                    return (
                      <WarcraftIcon
                        css={{ width: "24px", height: "24px" }}
                        sx={{ margin: "2px", cursor: "pointer" }}
                        src={IconProvider.getClassIcon(class_name)}
                        key={UUID()}
                        onClick={
                          source && version
                            ? () => {
                                openWowheadLink(specUtility[0].id, "spell", version.toLowerCase());
                              }
                            : () => {}
                        }
                      ></WarcraftIcon>
                    );
                  } else {
                    return <></>;
                  }
                } else {
                  if (spec.includes(class_name)) {
                    const specUtility = tooltip(`${spec}.${source}.${version}`, {
                      returnObjects: true
                    }) as Array<{ id: string; name: string }>;

                    // if tooltip does not exist in language file
                    if (typeof specUtility == typeof `${spec}.${source}.${version}`) {
                      return (
                        <WarcraftIcon
                          css={{ width: "24px", height: "24px" }}
                          sx={{ margin: "2px", cursor: "default" }}
                          src={IconProvider.getSpecIcon(spec)}
                          key={UUID()}
                        ></WarcraftIcon>
                      );
                    }

                    return specUtility.map((utility) => {
                      return (
                        <WarcraftIcon
                          css={{ width: "24px", height: "24px" }}
                          sx={{ margin: "2px", cursor: "pointer" }}
                          src={IconProvider.getSpecIcon(spec)}
                          key={UUID()}
                          onClick={
                            source && version
                              ? () => {
                                  openWowheadLink(utility.id, "spell", version.toLowerCase());
                                }
                              : () => {}
                          }
                        ></WarcraftIcon>
                      );
                    });
                  } else {
                    return <></>;
                  }
                }
              })}
            </Box>
          </Box>
        ) : (
          <></>
        )
      ) : (
        <Box display="grid" key={UUID()}>
          <Typography sx={{ marginTop: "15px", justifySelf: "center" }}>Provides</Typography>
          {Object.values(list.specs).map((spec) => {
            const specUtility = Object.entries(
              tooltip(`${spec}`, {
                returnObjects: true
              }) as Array<string>
            ).filter((entry) => Object.keys(entry[1]).includes(version));
            return (
              <ChecklistTooltipClass
                source={source}
                spec={spec}
                specUtility={specUtility}
                version={version}
              ></ChecklistTooltipClass>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default ChecklistTooltip;
