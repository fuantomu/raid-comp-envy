/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import UUID from "../../utils/UUID";
import WarcraftIcon from "../Icon";
import { WarcraftClassColour, WarcraftPlayerSpec } from "../../consts";
import { IconProvider } from "../../utils/IconProvider";
import { ArrowDropDown, ArrowLeft } from "@mui/icons-material";
import { openWowheadLink } from "../../utils/Wowhead";
import { useTranslation } from "react-i18next";

export interface ChecklistTooltipProps {
  spec: WarcraftPlayerSpec;
  source: string;
  specUtility: {};
  version: string;
}

const ChecklistTooltipClass: FC<ChecklistTooltipProps> = ({
  source,
  spec,
  specUtility,
  version
}) => {
  const [visible, setVisible] = useState(false);
  const [common] = useTranslation("common");

  return (
    <Box
      sx={{
        background: "#424242",
        border: "1px solid black",
        cursor: "pointer",
        minWidth: "420px"
      }}
      display={"grid"}
      gridTemplateColumns={"36px 1fr auto"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        setVisible(!visible);
      }}
      key={UUID()}
    >
      <WarcraftIcon
        css={{ width: "28px", height: "28px" }}
        src={IconProvider.getSpecIcon(spec)}
      ></WarcraftIcon>
      <Typography
        sx={{
          marginTop: "3px",
          justifySelf: "start",
          fontSize: "15px",
          textShadow: "1px 1px black",
          color: WarcraftClassColour[source]
        }}
      >
        {`${spec.replace(source, "")} (${Object.entries(specUtility).length})`}
      </Typography>
      {!visible ? (
        <ArrowLeft sx={{ marginTop: "3px" }}></ArrowLeft>
      ) : (
        <ArrowDropDown sx={{ marginTop: "3px" }}></ArrowDropDown>
      )}
      {visible ? (
        <Box
          display={"grid"}
          sx={{
            cursor: "default",
            marginTop: "5px"
          }}
          gridTemplateColumns={"420px"}
          key={UUID()}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          {Object.values(specUtility).map((utility) => {
            return (
              <Box sx={{ border: "1px solid black", background: "#222222" }} key={UUID()}>
                <Typography
                  sx={{
                    textShadow: "1px 1px black",
                    fontSize: "14px",
                    margin: "5px",
                    justifySelf: "start",
                    fontWeight: "medium"
                  }}
                >
                  {common(`utility.${utility[0]}`)}
                </Typography>
                {utility[1][version].map((entry) => {
                  return (
                    <Box
                      display={"grid"}
                      sx={{ background: "#424242", cursor: "pointer" }}
                      gridTemplateColumns={"1fr auto"}
                      key={UUID()}
                      onClick={
                        source && version
                          ? (event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              openWowheadLink(entry.id, "spell", version.toLowerCase());
                            }
                          : (event) => {
                              event.preventDefault();
                              event.stopPropagation();
                            }
                      }
                    >
                      <a
                        href={`https://${
                          version === "Mop"
                            ? "mop"
                            : version === "Cataclysm"
                            ? "cata"
                            : version ?? "Wotlk"
                        }.wowhead.com/spell=${entry.id}`}
                        className="q3"
                        data-wowhead={`domain=${
                          version === "Mop"
                            ? "mop"
                            : version === "Cataclysm"
                            ? "cata"
                            : version ?? "Wotlk"
                        }`}
                        style={{ fontSize: "16px", color: "red", textDecoration: "none" }}
                      >
                        <Typography
                          sx={{
                            color: "lightgray",
                            textShadow: "1px 1px black",
                            fontSize: "11px",
                            margin: "5px",
                            justifySelf: "start"
                          }}
                        >
                          {entry.name}
                        </Typography>
                      </a>
                      <Typography
                        sx={{
                          color: "lightgray",
                          textShadow: "1px 1px black",
                          fontSize: "9px",
                          margin: "5px",
                          justifySelf: "start"
                        }}
                      >
                        {`${entry.id}`}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ChecklistTooltipClass;
