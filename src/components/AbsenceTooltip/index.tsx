/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Absence } from "../../types";
import { Box, Typography } from "@mui/material";
import UUID from "../../utils/UUID";

export type Props = {
  absences: Absence[];
};

const AbsenceTooltip: FC<Props> = ({ absences }) => {
  const [common] = useTranslation("common");
  return (
    <Box
      sx={{
        border: "1px solid #ad0a0a",
        padding: "4px",
        borderRadius: "5px",
        background: "#242424"
      }}
    >
      <Box display={"grid"}>
        <Typography sx={{ color: "red", fontSize: "16px", justifySelf: "center" }}>
          {common("absence.title")}
        </Typography>
        <Box display={"grid"} gridTemplateColumns={"1.5fr 1.5fr 3fr"}>
          <Typography sx={{ marginRight: "15px", justifySelf: "center" }}>
            {common("absence.start")}
          </Typography>
          <Typography sx={{ marginRight: "15px", justifySelf: "center" }}>
            {common("absence.end")}
          </Typography>
          <Typography>{common("absence.reason")}</Typography>
        </Box>
      </Box>

      {Object.values(absences).map((absence) => {
        return (
          <Box
            sx={{
              background: "#424242",
              padding: "4px",
              border: "1px solid black"
            }}
            display={"grid"}
            gridTemplateColumns={"1.5fr 1.5fr 3fr"}
            key={UUID()}
          >
            <Typography sx={{ marginRight: "15px", justifySelf: "center" }}>
              {new Date(absence.start_date).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })}
            </Typography>
            <Typography sx={{ marginRight: "15px", justifySelf: "center" }}>
              {new Date(absence.end_date).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })}
            </Typography>
            <Typography>{absence.reason}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default AbsenceTooltip;
