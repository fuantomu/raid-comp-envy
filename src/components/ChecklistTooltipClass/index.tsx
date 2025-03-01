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
          justifySelf: "start",
          fontSize: "15px",
          textShadow: "1px 1px black",
          color: WarcraftClassColour[source]
        }}
      >
        {`${spec.replace(source, "")} (${Object.entries(specUtility).length})`}
      </Typography>
      {!visible ? <ArrowLeft></ArrowLeft> : <ArrowDropDown></ArrowDropDown>}
      {visible ? (
        <Box
          display={"grid"}
          sx={{
            cursor: "default"
          }}
          gridTemplateColumns={"420px"}
          key={UUID()}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          {Object.values(specUtility).map((utility) => {
            console.log(utility);
            console.log(utility[1][version]);
            return (
              <Box sx={{ border: "1px solid black", background: "#222222" }} key={UUID()}>
                <Typography
                  sx={{
                    textShadow: "1px 1px black",
                    fontSize: "12px",
                    margin: "5px",
                    justifySelf: "start"
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
                      <Typography
                        sx={{
                          color: "lightgray",
                          textShadow: "1px 1px black",
                          fontSize: "9px",
                          margin: "5px",
                          justifySelf: "start"
                        }}
                      >
                        {`( ${entry.id} )`}
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
