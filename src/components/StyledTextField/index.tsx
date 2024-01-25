/** @jsxImportSource @emotion/react */
import { FC, MutableRefObject, useState } from "react";
import { Box, TextField } from "@mui/material";
import useStyles from "./useStyles";

export interface StyledTextFieldProps {
  textRef: MutableRefObject<HTMLTextAreaElement>;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
}

const StyledTextField: FC<StyledTextFieldProps> = ({ textRef, error, helperText, placeholder }) => {
  const styles = useStyles();
  const [text, setCurrentText] = useState(textRef.current?.value ?? "");

  return (
    <Box display={"grid"} width={"100%"} css={styles.nameInputWrapper}>
      <TextField
        css={styles.nameInput}
        onChange={(e) => {
          setCurrentText(e.target.value);
        }}
        placeholder={placeholder}
        multiline
        value={text}
        inputRef={textRef}
        rows={4}
        error={error && text.length === 0}
        helperText={error ? (text.length === 0 ? helperText : undefined) : helperText}
      />
    </Box>
  );
};

export default StyledTextField;
