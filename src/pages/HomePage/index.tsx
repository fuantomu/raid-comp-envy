/** @jsxImportSource @emotion/react */
import { FC, useEffect, useImperativeHandle, useState } from "react";
import Loading from "../../components/Loading";
import { Build } from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";
import useErrorHandler from "../../utils/useErrorHandler";
import { Instance } from "../../consts";
import { Box, Typography } from "@mui/material";
import UUID from "../../utils/UUID";
import SetupBuild from "../../components/SetupBuild";
import { getWeekNumber } from "../../utils/Calendar";

export interface HomePageProps {
  changeVersionRef: any;
}

const HomePage: FC<HomePageProps> = ({ changeVersionRef }) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleError = useErrorHandler();
  const [raidsThisLockout, setRaidsThisLockout] = useState<Build[]>([]);
  const [raidsNextLockout, setRaidsNextLockout] = useState<Build[]>([]);
  const [builds, setBuilds] = useState<Build[]>([]);
  const [version, setVersion] = useState(localStorage.getItem("LastVersion") ?? "Wotlk");

  const handleChangeVersion = async (selectedVersion: string) => {
    setVersion(selectedVersion);
    loadRaids(builds, selectedVersion);
    localStorage.setItem("LastVersion", selectedVersion);
  };

  const getLockouts = () => {
    const lockoutStart = new Date();
    lockoutStart.setDate(lockoutStart.getDate() + ((3 - 7 - lockoutStart.getDay()) % 7));
    lockoutStart.setHours(0, 0, 0, 0);
    const lockoutEnd = new Date();
    lockoutEnd.setDate(lockoutEnd.getDate() + ((3 + 7 - lockoutEnd.getDay()) % 7));
    lockoutEnd.setHours(0, 0, 0, 0);
    const nextLockoutStart = new Date();
    nextLockoutStart.setDate(nextLockoutStart.getDate() + (3 + 7 - nextLockoutStart.getDay()));
    nextLockoutStart.setHours(0, 0, 0, 0);
    return [lockoutStart, lockoutEnd, nextLockoutStart];
  };

  const getEmptyBuild = (game_version?: string, build_id?: number) => {
    return {
      id: UUID(),
      name: "New Build",
      date: new Date().setHours(0, 0, 0, 0),
      players: [],
      instance: Instance[game_version]
        ? Instance[game_version][0].abbreviation
        : Instance["Wotlk"][0].abbreviation,
      build_id: build_id ?? -1
    } as Build;
  };

  const loadRaids = async (buildData: Build[], activeVersion: string = version) => {
    const versionInstances = Instance[activeVersion].map((instance) => instance.abbreviation);

    setBuilds([...buildData]);
    setRaidsThisLockout([getEmptyBuild(), getEmptyBuild()]);
    setRaidsNextLockout([getEmptyBuild(), getEmptyBuild()]);

    const lockouts = getLockouts();

    const versionBuilds = buildData
      .filter((build) => versionInstances.includes(build.instance))
      .sort((a, b) => a.date - b.date);
    setRaidsThisLockout(
      versionBuilds.filter(
        (build) => build.date >= lockouts[0].getTime() && build.date <= lockouts[1].getTime()
      )
    );

    setRaidsNextLockout(
      versionBuilds.filter(
        (build) => build.date >= lockouts[1].getTime() && build.date < lockouts[2].getTime()
      )
    );

    setIsLoading(false);
  };

  useImperativeHandle(changeVersionRef, () => ({
    handleChangeVersion
  }));

  useEffect(() => {
    BuildHelper.parseGetBuilds()
      .then((builds) => {
        loadRaids(builds, version ?? "Wotlk");
      })
      .catch(handleError);
    // eslint-disable-next-line
  }, [handleError]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box display={"flex"} width={"100%"} height={window.innerHeight * 0.91}>
      <Box
        border={"1px solid black"}
        margin={"8px"}
        display={"grid"}
        sx={{ width: "50%", height: "100%" }}
      >
        <Typography
          justifySelf={"center"}
          style={{
            caretColor: "transparent",
            userSelect: "none",
            fontSize: "24px",
            marginTop: "10px"
          }}
          variant="subtitle1"
        >
          {`${getLockouts()[0].toLocaleString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          })} - ${getLockouts()[1].toLocaleString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          })}, KW${getWeekNumber(getLockouts()[0])}-KW${getWeekNumber(getLockouts()[1])}`}
        </Typography>
        {raidsThisLockout.map((raid) => (
          <SetupBuild
            key={UUID()}
            players={raid.players}
            name={raid.name}
            instance={
              Instance[version].find((instance) => instance.abbreviation === raid.instance).name
            }
            date={raid.date}
          ></SetupBuild>
        ))}
      </Box>
      <Box
        border={"1px solid black"}
        margin={"8px"}
        display={"grid"}
        sx={{ width: "50%", height: "100%" }}
      >
        <Typography
          justifySelf={"center"}
          style={{
            caretColor: "transparent",
            userSelect: "none",
            fontSize: "24px",
            marginTop: "10px"
          }}
          variant="subtitle1"
        >
          {`${getLockouts()[1].toLocaleString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          })} - ${getLockouts()[2].toLocaleString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          })}, KW${getWeekNumber(getLockouts()[1])}-KW${getWeekNumber(getLockouts()[2])}`}
        </Typography>
        {raidsNextLockout.map((raid) => (
          <SetupBuild
            key={UUID()}
            players={raid.players}
            name={raid.name}
            instance={
              Instance[version].find((instance) => instance.abbreviation === raid.instance).name
            }
            date={raid.date}
          ></SetupBuild>
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;
