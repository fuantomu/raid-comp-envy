/** @jsxImportSource @emotion/react */
import { Box, Button, Input } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState} from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./useStyles";
import { checkHash, getHash } from "../../utils/hash";

export type Props = {
  setToken: Dispatch<SetStateAction<string>>
};

const Login: FC<Props> = ({ setToken }) => {
  const [common] = useTranslation("common");
  const styles = useStyles();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, showError] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const hash = getHash(username, password)
    if(checkHash(hash)){
      localStorage.setItem("token", hash)
      setToken(hash);
    }
    else{
      showError(true)
    }
  }

  return (
    <Box css={styles.modal}>
      <h2>{common("login.title")}</h2>
      <Box css={styles.content}>
          <Box css={styles.nameInputWrapper}>
              <h4>{common("login.user")}</h4>
              <Input
                  css={styles.nameInput}
                  type="text"
                  autoFocus={true}
                  onChange={e => { setUserName(e.target.value); showError(false)}}
              />
              <h4>{common("login.password")}</h4>
              <Input
                  css={styles.nameInput}
                  type="password"
                  onChange={e => {setPassword(e.target.value); showError(false)}}
              />
              <h4 style={{ color: 'red' }}>{error ? common("login.error"): null }</h4>
              <Box display={"flex"} css={{ justifyContent:"center"}}>
                <Button  color="primary" variant="contained" onClick={handleSubmit}>
                  {common("login.submit")}
                </Button>
              </Box>
          </Box>
      </Box>
    </Box>
  );
};

export default Login;
