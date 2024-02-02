/** @jsxImportSource @emotion/react */
import { FC, useEffect, useRef, useState } from "react";
import StickyBox from "react-sticky-box";
import Roster from "../Roster";
import { Box } from "@mui/material";
import MessageGroup from "../MessageGroup";
import envy from "../../icons/envy-ts-wenig-schatten.png";
import { BuildPlayer } from "../../types";

export interface ScrollingSidebarProps {
  manager: any;
  rosterRef: BuildPlayer[];
}

const ScrollingSidebar: FC<ScrollingSidebarProps> = ({ manager, rosterRef }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <StickyBox
      style={{
        width: "40%",
        borderBottom: `1px solid black`,
        borderRight: "1px solid black",
        marginRight: "30px"
      }}
    >
      <Roster manager={manager} players={rosterRef} />
      <Box
        display={"grid"}
        sx={{
          background: "#1d1d1d",
          backgroundImage: `url(${envy})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right",
          backgroundSize: "15%"
        }}
        justifySelf={"center"}
      >
        {isLoading ? <></> : <MessageGroup rosterRef={rosterRef} />}
      </Box>
    </StickyBox>
  );
};

export default ScrollingSidebar;
