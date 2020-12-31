/** @jsxImportSource @emotion/react */
import { ChangeEvent, FC } from "react";
import useStyles from "./useStyles";

export interface BuildTitleProps {
  title: string;
  onChange: (title: string) => void;
}

const BuildTitle: FC<BuildTitleProps> = ({ title, onChange }) => {
  const styles = useStyles();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.currentTarget.value;
    if (newTitle !== title) {
      onChange(newTitle);
    }
  };

  return <input css={styles.input} type="text" onBlur={handleChange} defaultValue={title} />;
};

export default BuildTitle;
