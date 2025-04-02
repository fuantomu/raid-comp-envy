/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import { FC, useEffect, useState } from "react";
import { Item } from "../../types";
import { RosterProvider } from "../../utils/RosterProvider";
import { Button, Typography } from "@mui/material";
import useStyles from "./useStyles";
import { DateParser } from "../../utils/DateParser";
import UUID from "../../utils/UUID";
import { ReleaseDates } from "../../consts";
import { RarityColors } from "../../utils/IconProvider/consts";

export interface LootHistoryItemProps {
  playerName: string;
  version: string;
}

const LootHistoryItem: FC<LootHistoryItemProps> = ({ playerName, version }) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(16);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentItems = items.slice(indexOfFirstPost, indexOfLastPost);
  const styles = useStyles();

  useEffect(() => {
    const fetchItems = async () => {
      const data = await RosterProvider.getLootHistory(playerName).then((response) => {
        return response.json();
      });
      const filtered_data = data.filter((item: Item) => {
        item.timestamp = DateParser.getDate(item.date, item.time);
        const currentRelease = new Date(ReleaseDates[version].release);

        if (item.timestamp < currentRelease) {
          return false;
        }

        if (!ReleaseDates[version].next) {
          return true;
        }

        const nextRelease = new Date(ReleaseDates[ReleaseDates[version].next].release);
        if (item.timestamp < nextRelease) {
          return true;
        }
        return false;
      });
      setItems(filtered_data);
    };

    fetchItems();
  }, [playerName, version]);

  return (
    <Box
      css={[styles.default, styles.scroll]}
      sx={{
        height: "525px",
        width: "100%",
        border: "1px solid black"
      }}
    >
      <ItemList items={currentItems} version={version}></ItemList>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={items.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </Box>
  );
};

const ItemList = ({ items, version }) => {
  return (
    <Box minHeight={"475px"} className="list-group">
      <Box
        display={"grid"}
        gridTemplateColumns={"1.5fr 1fr 1fr auto"}
        marginLeft={"5px"}
        marginTop={"5px"}
        marginBottom={"5px"}
      >
        <Typography>Item</Typography>
        <Typography>Date</Typography>
        <Typography>Response</Typography>
      </Box>
      {items.length > 0 ? (
        items.map((item: Item) => (
          <Box
            marginBottom={"2px"}
            marginLeft={"5px"}
            display={"grid"}
            gridTemplateColumns={"1.5fr 1fr 1fr auto"}
            key={UUID()}
          >
            <a
              href={`https://${
                version === "Mop" ? "mop" : version === "Cataclysm" ? "cata" : version ?? "Wotlk"
              }.wowhead.com/item=${item.itemid}`}
              className="q3"
              data-wowhead={`domain=${
                version === "Mop" ? "mop" : version === "Cataclysm" ? "cata" : version ?? "Wotlk"
              }`}
              style={{ fontSize: "16px", textDecoration: "none" }}
            >
              <Typography color={RarityColors.EPIC}> {item.item}</Typography>
            </a>
            <Typography>
              {item.timestamp.toLocaleString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </Typography>
            <Typography>{item.response}</Typography>
          </Box>
        ))
      ) : (
        <>No items found</>
      )}
    </Box>
  );
};

const Pagination = ({ postsPerPage, totalPosts, setCurrentPage, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber, e) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <Box>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          className={`page-item ${currentPage === number ? "active" : ""}`}
          onClick={(e) => paginate(number, e)}
          href="!#"
          sx={{ justifySelf: "end", marginTop: "8px" }}
          color={currentPage === number ? "primary" : "secondary"}
        >
          {number}
        </Button>
      ))}
    </Box>
  );
};

export default LootHistoryItem;
