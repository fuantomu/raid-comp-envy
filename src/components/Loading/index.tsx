/** @jsxImportSource @emotion/react */
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import useStyles from "./useStyles";

export type Props = {
  delay?: number;
  silent?: boolean;
  small?: boolean;
  text?: string;
};

const Loading: FC<Props> = ({ delay, silent = false, small = false, text, ...props }) => {
  const styles = useStyles({ overlay: true, small });
  const [common] = useTranslation("common");
  const [isVisible, setVisibility] = useState(!delay);

  useEffect(() => {
    if (!delay) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setVisibility(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return isVisible ? (
    <div css={styles.base} {...props}>
      <div css={styles.inner} role={silent ? undefined : "alert"}>
        {!silent && <span>{text || common("loading")}</span>}
      </div>
    </div>
  ) : null;
};

export default Loading;
