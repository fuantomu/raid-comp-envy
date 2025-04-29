/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import { FC, useEffect, useState } from "react";
import { GearParser } from "../../utils/GearParser";
import WarcraftIcon from "../Icon";
import { IconProvider } from "../../utils/IconProvider";
import { CustomIcon, RarityColors, WarcraftIconSize } from "../../utils/IconProvider/consts";
import UUID from "../../utils/UUID";
import { Avatar, Typography } from "@mui/material";
import { ArmoryIconSlot } from "../../utils/ArmoryIcons";
import { WarcraftGameVersion } from "../../utils/RoleProvider/consts";

export interface GearListProps {
  playerName: string;
  version: string;
}

const GearList: FC<GearListProps> = ({ playerName, version }) => {
  const [items, setItems] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      await GearParser.getToken();
      const data = await GearParser.getEquipment(playerName, version);
      if (!data) {
        setError(true);
      } else {
        setItems(Object.entries(data));
      }
    };

    fetchItems();
  }, [playerName, version]);

  if (error) {
    return <>No character found</>;
  }

  if (Object.keys(items).length === 0) {
    return <>Loading</>;
  }

  return <GearItemList items={items} version={version}></GearItemList>;
};

const GearItemList = ({ items, version }) => {
  return (
    <Box border={"1px solid black"} bgcolor={"#242424"} display={"flex"} flexWrap={"wrap"}>
      <Box marginTop={"10px"} sx={{ width: "50%" }}>
        <GearItem key={UUID()} item={items[0]} version={version}></GearItem>
        <GearItem key={UUID()} item={items[1]} version={version}></GearItem>
        <GearItem key={UUID()} item={items[2]} version={version}></GearItem>
        <GearItem key={UUID()} item={items[14]} version={version}></GearItem>
        <GearItem key={UUID()} item={items[4]} version={version}></GearItem>
        <GearItem key={UUID()} item={items[3]} version={version}></GearItem>
        <GearItem key={UUID()} item={items[18]} version={version}></GearItem>
        <GearItem key={UUID()} item={items[8]} version={version}></GearItem>
      </Box>
      <Box marginTop={"10px"} sx={{ width: "50%" }}>
        <GearItem key={UUID()} item={items[9]} version={version} reverse={true}></GearItem>
        <GearItem key={UUID()} item={items[5]} version={version} reverse={true}></GearItem>
        <GearItem key={UUID()} item={items[6]} version={version} reverse={true}></GearItem>
        <GearItem key={UUID()} item={items[7]} version={version} reverse={true}></GearItem>
        <GearItem key={UUID()} item={items[10]} version={version} reverse={true}></GearItem>
        <GearItem key={UUID()} item={items[11]} version={version} reverse={true}></GearItem>
        <GearItem key={UUID()} item={items[12]} version={version} reverse={true}></GearItem>
        <GearItem key={UUID()} item={items[13]} version={version} reverse={true}></GearItem>
      </Box>
      <Box marginTop={"10px"} marginBottom={"10px"} paddingTop={"50px"} sx={{ width: "50%" }}>
        <GearItem key={UUID()} item={items[15]} version={version}></GearItem>
        <GearItem key={UUID()} item={items[16]} version={version}></GearItem>
      </Box>
      <Box marginTop={"10px"} marginBottom={"10px"} paddingTop={"50px"} sx={{ width: "50%" }}>
        <GearItem key={UUID()} item={items[17]} version={version} reverse={true}></GearItem>
      </Box>
    </Box>
  );
};

const GearItem = ({ item, version, reverse = false }) => {
  if (item[1] === null) {
    return (
      <Box
        border={"1px solid black"}
        marginLeft={"5px"}
        marginRight={"5px"}
        marginTop={"5px"}
        sx={{ height: "36px" }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "36px 1fr"
          }}
        >
          <Avatar
            css={{ width: "42px", height: "42px", marginTop: "-4px", marginLeft: "-4px" }}
            src={ArmoryIconSlot[item[0]]}
            variant="rounded"
          />
          <Typography
            component={"span"}
            padding={"6px"}
            marginLeft={"6px"}
            fontSize={"16px"}
            color={"gray"}
          >
            Empty
          </Typography>
        </Box>
      </Box>
    );
  }
  return (
    <Box
      border={"1px solid black"}
      marginTop={"5px"}
      marginLeft={"5px"}
      marginRight={"5px"}
      sx={{ height: "36px" }}
    >
      <a
        style={{
          textDecoration: "none"
        }}
        href={`https://${WarcraftGameVersion[version.toLowerCase()]}.wowhead.com/item=${
          item[1].item.id
        }`}
        data-wowhead={`${item[1].link}`}
      >
        {!reverse ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "36px 1fr"
            }}
          >
            <WarcraftIcon
              css={{ width: "34px", height: "34px" }}
              src={IconProvider.getCustomIcon(item[1].icon as CustomIcon, WarcraftIconSize.LARGE)}
            ></WarcraftIcon>
            <Typography
              component={"span"}
              padding={"6px"}
              marginLeft={"6px"}
              fontSize={"16px"}
              color={RarityColors[item[1].quality.type]}
            >
              {item[1].name}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 36px"
            }}
          >
            <Typography
              component={"span"}
              padding={"6px"}
              marginRight={"6px"}
              fontSize={"16px"}
              justifySelf={"end"}
              color={RarityColors[item[1].quality.type]}
            >
              {item[1].name}
            </Typography>
            <WarcraftIcon
              css={{ width: "34px", height: "34px" }}
              src={IconProvider.getCustomIcon(item[1].icon as CustomIcon, WarcraftIconSize.LARGE)}
            ></WarcraftIcon>
          </Box>
        )}
      </a>
    </Box>
  );
};

export default GearList;
