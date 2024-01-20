/** @jsxImportSource @emotion/react */
import Box from "@mui/material/Box";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContextProvider } from "../../components/App/context";
import Loading from "../../components/Loading";
import ModalAdd from "../../components/ModalAdd";
import Roster from "../../components/Roster";
import { Absence, Build, BuildPlayer, SelectOption, Update} from "../../types";
import { BuildHelper } from "../../utils/BuildHelper";
import useErrorHandler from "../../utils/useErrorHandler";
import UUID from "../../utils/UUID";
import { Instance, InviteStatus} from "../../consts";
import { Button, Tooltip } from "@mui/material";
import cataclysm from "../../icons/Cataclysmlogo.webp";
import wotlk from "../../icons/WrathLogo.webp";
import { createDragDropManager } from 'dnd-core'
import Raid from "../../components/Raid";
import { HTML5Backend } from "react-dnd-html5-backend";
import ModalAlert from "../../components/ModalAlert";
import { sortFunctions } from "../../utils/sorting";
import StickyBox from "react-sticky-box";

export interface EditBuildPageProps {
  accountRole: number;
}

const EditBuildPage: FC<EditBuildPageProps> = ({accountRole}) => {

  const [common] = useTranslation("common");
  const [isLoading, setIsLoading] = useState(true);
  const handleError = useErrorHandler();
  const [builds, setBuilds] = useState<Build[]>([]);
  const [roster, setRoster] = useState<BuildPlayer[]>([]);
  const [sorting, setSorting] = useState("DEFAULT");
  const [buildSelection, setBuildSelection] = useState<SelectOption[]>([]);
  const [version, setVersion] = useState("Cataclysm");
  const [rosterExpanded, setRosterExpanded] = useState(false)
  const [absence, setAbsence] = useState<Absence[]>([])
  const manager = createDragDropManager(HTML5Backend)

  const _ = require('lodash');

  let openEditModal: any = () => {};
  let handleModalOpen: any = () => {};

  const MAX_SET_CHARACTERS = 2

  const updateRoster = (newPlayer: BuildPlayer): void => {
    const newRoster = [...roster.filter((player) => player.id !== newPlayer.id),newPlayer].sort(sortFunctions[sorting])
    setRoster(newRoster)
    BuildHelper.parseSaveRoster(newRoster);
  }

  const removeFromRoster = (removedPlayer: BuildPlayer): void => {
    const newRoster = [...roster.filter((player : BuildPlayer) => removedPlayer.id !== player.id)].sort(sortFunctions[sorting])

    newRoster.map((otherPlayer) => {
      if(otherPlayer.main === removedPlayer.name && otherPlayer.id !== removedPlayer.id){
        otherPlayer.main = ""
      }
      return false
    })

    setRoster(newRoster);
    BuildHelper.parseDeleteRosterPlayer(removedPlayer);
  }

  const getCurrentSorting = () => {
    return sorting?? "Alphabetical";
  };

  const getBuilds = () => {
    return buildSelection;
  };

  const getRosterExpanded = () => {
    return rosterExpanded;
  };

  const setBuildInstance = (buildId: number) => (value: any) => {
    const newBuild = getBuildCopy(builds[buildId])
    newBuild.instance = value.value

    builds[buildId] = newBuild
    updateRosterStatus(roster, builds)
    setBuilds([...builds])
    saveBuild(newBuild)
  }

  const getBuild = (buildId: number): Build => {
    return builds[buildId]
  }

  const getOtherBuilds = (buildId: number) : Build[] => {
    return builds.filter((build) => build?.id !== builds[buildId]?.id)
  }

  const getEmptyBuild = () => {
    return {
      "id": UUID(),
      "name": common("build.new"),
      "date": new Date().setHours(0,0,0,0),
      "players": [],
      "instance": version === 'Cataclysm'? Instance.Cataclysm[0].abbreviation : Instance.Wotlk[0].abbreviation,
      "buildId": -1
    } as Build
  }

  const getBuildCopy = (build: Build) : Build => {
    if(!build){
      return getEmptyBuild()
    }
    const newBuild : Build = {
      id : build.id,
      date : build.date,
      instance : build.instance,
      name : build.name,
      players : build.players,
      raidId : build.raidId,
      buildId: build.buildId
    }
    return newBuild;
  }

  const hasCharacterInRaid = (character : BuildPlayer, buildId: number) => {
    if(builds[buildId].players.find((player) => isAlt(player, character))){
      return true
    }
    return false
  }

  const isPlayerAbsent = (player: BuildPlayer, time: number) : boolean => {
    for(const absentPlayer of absence){
      if(absentPlayer.player.name === player.name || absentPlayer.player.name === player.main){
        if(absentPlayer.startDate <= time && absentPlayer.endDate >= time){
          return true;
        }
        continue;
      }
    }
    return false;
  }

  const isAlt = (potentialAlt :BuildPlayer, character: BuildPlayer) : boolean => {
    if(potentialAlt.id !== character.id && (potentialAlt.main === character.name || potentialAlt.main === character.main)){
      return true
    }
    return false
  }

  const saveBuild = async (build: Build) => {
    if(build.name === common('build.new')){
      return
    }
    if(build.name === undefined){
      return
    }
    BuildHelper.parseSaveBuild(build);
  };

  const resetBuild = (buildId: number) => {
    const currentBuild = builds[buildId];
    const newBuild = getEmptyBuild()
    newBuild.name = currentBuild.name
    newBuild.id = currentBuild.id
    newBuild.raidId = currentBuild.raidId
    builds[buildId] = newBuild
    updateBuildStatus()
    updateRosterStatus(roster, builds)
    setBuilds([...builds])
    saveBuild(newBuild)
  };

  const handleSorting = (e: any) => {
    setSorting(e.target.value);
    setRoster([...roster].sort(sortFunctions[e.target.value]))
  };

  const handleChangeVersion = () => {
    const newVersion = version === "Cataclysm"? "Wotlk" : "Cataclysm";
    setVersion(newVersion);
    localStorage.setItem( 'LastVersion', newVersion);
  };

  const handleSelect = (buildId: number) => (value: any) => {
    // BuildName
    if(value.value){
      localStorage.setItem( `LastBuild-${buildId}`, value.value)
      BuildHelper.parseGetBuild(value.value).then((build) => {
        builds[buildId] = build
        updateBuildStatus()
        updateRosterStatus(roster, builds)
        setBuilds([...builds])
      })

    }
    // DatePicker
    else{
      const currentBuild : Build = {
        id: builds[buildId].id,
        name: builds[buildId].name,
        players: builds[buildId].players,
        date : value.valueOf(),
        instance: builds[buildId].instance,
        raidId: builds[buildId].raidId,
        buildId: buildId
      }
      builds[buildId] = currentBuild
      setBuilds([...builds])
      updateBuildStatus()
      saveBuild(currentBuild);
    }
  };

  const editPlayerModalFn = (callback: (player: BuildPlayer) => void) => {
    openEditModal = callback;
  };

  const editPlayer = (player: BuildPlayer) => {
    if (openEditModal) {
      openEditModal(player);
    }
  };

  const addBuild = async (build: string, buildId: number) => {
    const newBuild = getEmptyBuild()
    newBuild.name = build;
    newBuild.buildId = buildId

    const newBuildSelect = {value:newBuild.id,label:build}
    setBuildSelection([...buildSelection, newBuildSelect])

    localStorage.setItem(`LastBuild-${buildId}`, newBuild.id)
    builds[buildId] = newBuild
    updateRosterStatus(roster, builds)
    setBuilds([...builds])
    saveBuild(newBuild)
  };

  const deleteBuild = async (buildId: number) => {
    const oldBuild = getBuildCopy(builds[buildId])
    const newBuilds = [...buildSelection.filter((build) => build.value !== oldBuild.id)]
    setBuildSelection([...newBuilds]);
    const newBuild = getEmptyBuild();
    newBuild.buildId = buildId;
    builds[buildId] = newBuild
    updateRosterStatus(roster, builds)
    setBuilds([...builds])
    localStorage.removeItem(`LastBuild-${buildId}`)
    BuildHelper.parseDeleteBuild(oldBuild.id)
  };

  const handleShowError = (callback: any) => {
    handleModalOpen = callback;
  };

  const getPlayerAbsence = (player: string) => {
    return absence.filter((absentPlayer) => absentPlayer.player.name === player || absentPlayer.player.main === player)
  }

  const getAbsentPlayers = (buildId: number): BuildPlayer[] => {
    const playerBuild = builds[buildId]
    const foundPlayers = roster.filter((player: BuildPlayer) => {
      const playerAbsence = getPlayerAbsence(player.main?? player.name)
      if(player.name !== player.main){
        return false
      }
      if(playerAbsence?.length !== 0){
        return playerAbsence?.find((absence) => absence.startDate <= playerBuild?.date && absence.endDate >= playerBuild?.date)
      }
      return false
    })
    return foundPlayers
  }

  const getUnsetMains = (): BuildPlayer[] => {
    const mains = roster.filter((rosterPlayer) => {
      return rosterPlayer.main === rosterPlayer.name && rosterPlayer.status !== "tentative"
    })
    const setMains: BuildPlayer[] = []
    mains.forEach((main) => {
      builds.forEach((build) => {
        build?.players.forEach((player) => {
          if((isAlt(player, main) || player.name === main.name) && !setMains.includes(main)){
            setMains.push(main)
          }
        })
      })
    })
    const unsetMains = mains.filter((main) => { return !setMains.includes(main)})
    return unsetMains
  }

  const isPlayerAlreadyInRaid = (player: BuildPlayer): boolean => {
    const playerRaid = builds.find((build) => {
      return build.buildId === player.raid
    })
    if(playerRaid){
      const isInParty = playerRaid.players.find((partyPlayer: BuildPlayer) => {
        return partyPlayer.id === player.id
      })
      if(isInParty){
        return true
      }
      return false
    }
    return false
  }

  const isPlayerMovedBetweenRaids = (player: BuildPlayer): boolean => {
    const otherRaids = getOtherBuilds(player.raid)
    const otherPlayers = []
    otherRaids.map((otherRaid) => {
      otherPlayers.push(...otherRaid.players)
      return 1
    })
    const isInOtherRaids = otherPlayers.find((raidPlayer:BuildPlayer) => {
      return raidPlayer.id === player.id
    })
    if(isInOtherRaids){
      return true
    }
    return false
  }

  const isSameInstance = (player: BuildPlayer): boolean => {
    const otherBuilds = builds.filter((build) => {
      return build.id !== builds[player.raid]?.id
    })
    const sameInstance = otherBuilds.find((otherBuild) => otherBuild.instance === builds[player.raid]?.instance)
    if(sameInstance){
      return true
    }
    return false
  }

  const isSameLockout = (player: BuildPlayer): boolean => {
    const currentDate = new Date()
    const otherBuilds = builds.filter((build) => {
      return build.id !== builds[player.raid].id
    })
    // Get the next reset time
    currentDate.setDate(currentDate.getDate() + (((3 + 7 - currentDate.getDay()) % 7) || 7));
    currentDate.setHours(0,0,0,0)
    const sameLockout = otherBuilds.find((otherBuild) => {
      return (new Date(builds[player.raid].date).setHours(0,0,0,0) - currentDate.getTime() < 0) && (new Date(otherBuild.date).setHours(0,0,0,0) - currentDate.getTime() < 0)
    })
    if(sameLockout){
      return true
    }
    return false
  }

  const addPlayerToRaid = (newPlayer: BuildPlayer): void => {
    const currentBuild = builds[newPlayer.raid]
    currentBuild.players = [...currentBuild.players,newPlayer]
    //updatePlayerStatus(newPlayer)


    builds[newPlayer.raid] = currentBuild
    updateRosterStatus(roster,builds)
    setBuilds([...builds])
  }

  const updatePlayer = (newPlayer: BuildPlayer): void => {
    const currentBuild = builds[newPlayer.raid]
    const otherPlayers = currentBuild.players.filter((player) => {
      return player.id !== newPlayer.id
    })
    currentBuild.players = [...otherPlayers,newPlayer]
    //updatePlayerStatus(newPlayer)

    builds[newPlayer.raid] = currentBuild
    updateRosterStatus(roster,builds)
    setBuilds([...builds])
  }

  const removePlayerFromRaids = (newPlayer: BuildPlayer): void => {
    const newBuilds = []
    builds.forEach((build) => {
      const newPlayers = build.players.filter((raidPlayer)=> {
        return raidPlayer.id !== newPlayer.id
      })
      build.players = [...newPlayers]
      newBuilds.push(build)
    })
    //updatePlayerStatus(newPlayer)
    updateRosterStatus(roster,builds)
    setBuilds([...newBuilds])
  }

  const removePlayerFromRaid = (newPlayer: BuildPlayer, save: boolean = false): void => {
    const currentBuild = getBuildCopy(builds[newPlayer.raid])
    const newPlayers = currentBuild.players.filter((player) => {
      return player.id !== newPlayer.id
    })
    currentBuild.players = [...newPlayers]

    //updatePlayerStatus(newPlayer)

    builds[newPlayer.raid] = currentBuild
    updateRosterStatus(roster,builds)
    setBuilds([...builds])

    if(save){
      saveBuild(currentBuild)
    }
  }

  const importPlayer = (newPlayer: BuildPlayer): void => {
    if(newPlayer.group === "roster"){
      if(newPlayer.raid === -1){
        return
      }
      if(isSameInstance(newPlayer) && isSameLockout(newPlayer)){
        removePlayerFromRaids(newPlayer)
      }
      else{
        removePlayerFromRaid(newPlayer)
      }
      saveBuild(builds[newPlayer.raid])
      return
    }

    if(isPlayerAbsent(newPlayer, builds[newPlayer.raid].date)){
      handleModalOpen({title:common("error.player.import"),content:common("error.player.tentative"),params:{"player":newPlayer.name}})
      return
    }
    if(newPlayer.status === InviteStatus.Declined){
      handleModalOpen({title:common("error.player.import"),content:common("error.player.declined"),params:{"player":newPlayer.main}})
      return
    }

    if(hasCharacterInRaid(newPlayer, newPlayer.raid)){
      handleModalOpen({title:common("error.player.import"),content:common("error.player.exists"),params:{"player":newPlayer.main}})
      return
    }

    if(isPlayerAlreadyInRaid(newPlayer)){
      updatePlayer(newPlayer)
      saveBuild(builds[newPlayer.raid])
      return
    }

    if(isPlayerMovedBetweenRaids(newPlayer) && isSameInstance(newPlayer) && isSameLockout(newPlayer)){
      removePlayerFromRaids(newPlayer)
      addPlayerToRaid(newPlayer)
      saveBuild(builds[newPlayer.raid])
      return
    }

    addPlayerToRaid(newPlayer)
    saveBuild(builds[newPlayer.raid])
  };

  const loadAbsence = (absenceResponse: Absence[], newRoster: BuildPlayer[]) => {
    const absenceObject: Absence[] = [];
    for(const absenceItem of absenceResponse){
      newRoster.map((player) => {
        if(player.id === absenceItem.player.id){
          const newAbsence = {id: `${player.name}${absenceItem.startDate}${absenceItem.endDate}${absenceItem.reason.length}`, player, startDate:absenceItem.startDate, endDate:absenceItem.endDate, reason:absenceItem.reason} as Absence
          if(!absenceObject.find((currentAbsence) => currentAbsence.id === newAbsence.id)){
            absenceObject.push(newAbsence)
          }
        }
        return false
      })
    }
    updateRosterStatus(newRoster,builds,absenceObject)
    setAbsence(absenceObject)
  }

  const loadBuildNames = (buildData: Build[]) => {
    const buildObject: SelectOption[] = [];
    for(const build of buildData){
      buildObject.push({"value": build.id, "label":build.name})
    }
    setBuildSelection(buildObject)
  }

  const loadBuilds = (buildData: Build[]) => {
    const initialBuilds = []
    if(builds.length === 0) {
      const newestBuilds = buildData.sort((a,b) => b.date - a.date)
      initialBuilds.push(...[getEmptyBuild(),getEmptyBuild()])
      if(buildData.length > 0){
        const foundBuild = buildData.find((build) => {
          if(localStorage.getItem('LastBuild-0')){
            return build.id === localStorage.getItem('LastBuild-0')
          }
          else{
            return build.id === newestBuilds[0].id
          }
        })
        if(foundBuild){
          initialBuilds[0] = foundBuild
        }
        initialBuilds[0].buildId = 0
      }
      if(buildData.length > 1){
        const foundBuild = buildData.find((build) => {
          if(localStorage.getItem('LastBuild-1')){
            return build.id === localStorage.getItem('LastBuild-1')
          }
          else{
            return build.id === newestBuilds[1].id
          }
        })
        if(foundBuild){
          initialBuilds[1] = foundBuild
        }
        initialBuilds[1].buildId = 1
      }
    }
    else{
      const currentBuilds = builds.map((build) => {return { "id": build.id, "buildId": build.buildId} })
      buildData.forEach((build) => {
        const isCurrentBuild = currentBuilds.find((currentBuild) => {
          return currentBuild?.id === build?.id
        })
        if(isCurrentBuild){
          build.buildId = isCurrentBuild.buildId
          initialBuilds.push(build)
        }

      })
    }
    initialBuilds.forEach((initialBuild) => {
      builds[initialBuild.buildId] = initialBuild
    })
    setBuilds([...builds])
  }

  const updateBuildStatus = (currentBuilds: Build[] = builds, currentRoster: BuildPlayer[] = roster, currentAbsences: Absence[] = absence) => {
    currentBuilds.map((build) => {
      build.players.map((buildPlayer) => {
        buildPlayer.status = InviteStatus.Unknown
        currentAbsences.map((currentAbsence) => {
          if(currentAbsence.startDate <= build.date && currentAbsence.endDate >= build.date){
            const absentPlayer = currentRoster.find((rosterPlayer) => rosterPlayer.id === currentAbsence.player.id)
            if(absentPlayer){
              currentRoster.map((rosterPlayer) => {
                if(rosterPlayer.id === absentPlayer.id){
                  rosterPlayer.status = InviteStatus.Tentative
                }
                return false
              })
              currentRoster.map((rosterPlayer) => {
                if(isAlt(absentPlayer, rosterPlayer)){
                  rosterPlayer.status = InviteStatus.Tentative
                  if(rosterPlayer.id === buildPlayer.id){
                    buildPlayer.status = InviteStatus.Tentative
                  }
                }
                return false
              })

              if(absentPlayer.id === buildPlayer.id){
                buildPlayer.status = InviteStatus.Tentative
              }
            }
          }
          return false
        })
        return false
      })
      return false
    })
  }

  const updateRosterStatus = (currentRoster: BuildPlayer[] = roster, currentBuilds: Build[] = builds, currentAbsences: Absence[] = absence) => {
    const charactersSet = {}
    currentRoster.map((rosterPlayer)=>{
      if(rosterPlayer.status !== InviteStatus.Tentative){
        rosterPlayer.status = InviteStatus.Unknown
      }

      currentAbsences.map((currentAbsence) => {
        if((new Date().getTime() <= currentAbsence.endDate)){
          if(currentAbsence.player.id === rosterPlayer.id){
            rosterPlayer.status = InviteStatus.Tentative
          }
        }
        return false
      })

      currentBuilds.map((build) => {
        build.players.map((buildPlayer)=>{
          if((buildPlayer.id === rosterPlayer.id) && rosterPlayer.status === InviteStatus.Unknown){
            rosterPlayer.status = InviteStatus.Accepted
            charactersSet[rosterPlayer.main]=charactersSet[rosterPlayer.main]? charactersSet[rosterPlayer.main]+1 : 1
          }
          return false
        })
        return false
      })
      if(charactersSet[rosterPlayer.main] >= MAX_SET_CHARACTERS){
        currentRoster.map((otherRosterPlayer) => {
          if(isAlt(otherRosterPlayer, rosterPlayer) || otherRosterPlayer.name === rosterPlayer.name){
            if(otherRosterPlayer.status === InviteStatus.Unknown){
              otherRosterPlayer.status = InviteStatus.Declined
            }
          }
          return false
        })
      }
      return false
    })
    BuildHelper.parseSaveRoster(currentRoster)
  }

  const loadData = (data: Update) => {
      updateBuildStatus(data.builds, data.players, data.absences)
      const currentBuildIds = builds.map((build) => build.id)
      const differencesBuilds = _.differenceWith(data.builds.filter((build) => currentBuildIds.includes(build.id)), builds, (a : Build[], b: Build[]) => {
        return _.isEqual(
          _.omit(a, ['raidId','buildId','id']),
          _.omit(b, ['raidId','buildId','id'])
        )
      })
      if (differencesBuilds.length > 0 || isLoading){
        loadBuilds(data.builds)
      }


      const differencesBuildSelection = _.differenceWith(data.builds.map((build) => { return {"label": build.name, "value": UUID()} }), buildSelection, (a : SelectOption[], b: SelectOption[]) => {
        return _.isEqual(
          _.omit(a, ['value']),
          _.omit(b, ['value'])
        )
      })
      if(differencesBuildSelection.length > 0 || data.builds.length !== buildSelection.length){
        loadBuildNames(data.builds)
      }

      const newAbsence = data.absences.filter((absencePlayer) => { return roster.find((rosterPlayer) => { return rosterPlayer.id === absencePlayer.player.id }) !== undefined})
      if(newAbsence.length !== absence.length || isLoading){
        loadAbsence(data.absences, data.players)
      }

      const differencesRoster = _.differenceWith(data.players, roster, (a : BuildPlayer[], b: BuildPlayer[]) => {
        return _.isEqual(
          _.omit(a, ['group','id','raid','oldName']),
          _.omit(b, ['group','id','raid','oldName'])
        )
      })
      if(differencesRoster.length > 0 || data.players.length !== roster.length){
        updateRosterStatus(data.players)
        setRoster(data.players.sort(sortFunctions[sorting]))
      }

  }

  useEffect(() => {

    if (isLoading){
      localStorage.getItem('LastVersion')?? localStorage.setItem("LastVersion", "Wotlk")
      setVersion(localStorage.getItem( 'LastVersion')?? "Wotlk");
      BuildHelper.parseGetUpdate().then((update) => {
        loadData(update)
        setIsLoading(false)
      }).catch(handleError)
    }

    const interval = setInterval(() => {

      BuildHelper.parseGetUpdate().then((update) => {
        loadData(update)
      }).catch(handleError);
    }, parseInt(process.env.REACT_APP_UPDATE_INTERVAL));

    return () => clearInterval(interval);

    //eslint-disable-next-line
  }, [handleError,isLoading,roster,builds,absence]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppContextProvider value={{ importPlayer, removePlayerFromRaid, resetBuild, getBuild, editPlayer, updateRoster, removeFromRoster, handleSorting, getCurrentSorting, handleSelect, getBuilds, addBuild, deleteBuild, setRosterExpanded, getRosterExpanded, getPlayerAbsence, setBuildInstance, getOtherBuilds, getAbsentPlayers, getUnsetMains, handleShowError }}>
      <ModalAdd editPlayer={editPlayerModalFn} accountRole={accountRole}/>
      <ModalAlert handleOpen={handleShowError}/>



      <div style={{ display: 'flex', alignItems: 'flex-start'}}>
        <StickyBox style={{width: "40%", borderBottom: `1px solid black`, borderRight: `1px solid black`}}>
              <Roster manager={manager} players={roster} editing accountRole={accountRole}/>
        </StickyBox>
        <div style={{ width:'100%'}} >
          <Raid manager={manager} id={0} raidBuild={builds[0]} builds={buildSelection} version={version} editing accountRole={accountRole} ></Raid>
          <br></br>
          <br></br>
          <Raid manager={manager} id={1} raidBuild={builds[1]} builds={buildSelection} version={version} editing accountRole={accountRole} ></Raid>
          <br></br>

          <Box display={"flex"} justifyContent={"center"}>
            <Button style={{height: '100px', width : '219px', marginBottom:'54px'}} key={UUID()} onClick={handleChangeVersion}>
              <Tooltip title={common(`version.${version}`)}>
                <img width={"219"} height={"100"} alt={common(`version.${version}`)} src={version === 'Cataclysm'? cataclysm : wotlk}></img>
              </Tooltip>
            </Button>
          </Box>
        </div>
      </div>
    </AppContextProvider>
  );
};

export default EditBuildPage;
