/** @jsxImportSource @emotion/react */
import { ChangeEvent, FC, FocusEventHandler } from "react";
import useStyles from "./useStyles";
import { Input } from "@material-ui/core";

export interface BuildTitleProps {
  title: string;
  onChange: (title: string) => void;
}

const BuildTitle: FC<BuildTitleProps> = ({ title, onChange }) => {
  const styles = useStyles();
  const handleChange: FocusEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newTitle = event.currentTarget.value;
    if (newTitle !== title) {
      onChange(newTitle);
    }
  };

  return (
    <Input
      autoFocus={true}
      css={styles.input}
      type="text"
      onBlur={handleChange}
      defaultValue={title}
    />
  );
};

export default BuildTitle;
