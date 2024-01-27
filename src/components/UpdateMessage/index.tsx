/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Message } from "../../types";
import UUID from "../../utils/UUID";
import useStyles from "./useStyles";

export interface UpdateMessageProps extends Message {
  accountRole: number;
}

const UpdateMessage: FC<UpdateMessageProps> = (props) => {
  const [common] = useTranslation();
  const { type, from, date, changes } = props;
  const styles = useStyles();
  const [visible, setVisible] = useState(false);

  return (
    <Box sx={{ marginRight: "8px" }}>
      <Box
        key={UUID()}
        css={styles.message()}
        onClick={() => {
          setVisible(!visible);
        }}
      >
        <Typography css={[styles.name, { pointerEvents: "none" }]} title={type}>
          {`${type}` +
            (changes[0]?.objectName
              ? ` in ${changes[0]?.objectType} '${changes[0]?.objectName}'`
              : "")}
        </Typography>
        <Typography
          css={[styles.name, { pointerEvents: "none" }]}
          title={new Date(date).toLocaleString("de-de")}
        >
          {`${new Date(date).toLocaleString("de-de", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          })} by ${from}`}
        </Typography>
      </Box>
      <Box>
        {visible ? (
          changes.length > 0 ? (
            changes.map((changeMessage) =>
              changeMessage.key === "absence" ? (
                <Box key={UUID()} css={styles.change}>
                  {`${changeMessage.propertyType} '${changeMessage.propertyName}' is absent from ${changeMessage.old} to ${changeMessage.new}`}
                </Box>
              ) : changeMessage.old ? (
                <Box key={UUID()} css={styles.change}>
                  {`${common(`message.${changeMessage.key}`)} of ${changeMessage.propertyType} '${
                    changeMessage.propertyName
                  }' was changed from '${changeMessage.old}' to '${changeMessage.new}'`}
                </Box>
              ) : (
                <Box key={UUID()} css={styles.change}>
                  {`${changeMessage.propertyType} '${changeMessage.propertyName}' was ${common(
                    `message.${changeMessage.key}`
                  )}`}
                </Box>
              )
            )
          ) : (
            <Typography
              style={{ caretColor: "transparent", color: "dimgray", userSelect: "none" }}
              variant="subtitle2"
            >
              Empty
            </Typography>
          )
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default UpdateMessage;
