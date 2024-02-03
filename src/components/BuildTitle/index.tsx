/** @jsxImportSource @emotion/react */
import { FC, useEffect, useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { Build, BuildData, MessageData, SelectOption } from "../../types";
import { useAppContext } from "../App/context";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Instance, RegisteredMessages } from "../../consts";
import { useTranslation } from "react-i18next";
import ModalAlert from "../ModalAlert";
import { isAccountRoleAllowed } from "../../utils/AccountRole";
import updateLocale from "dayjs/plugin/updateLocale";
import { useUpdateSocketContext } from "../UpdateSocket/context";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1
});

export interface BuildTitleProps {
  options: SelectOption[];
  raidBuild: Build;
}

const BuildTitle: FC<BuildTitleProps> = ({ options, raidBuild }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [date, setDate] = useState<Dayjs | null>(dayjs().set("seconds", 0).set("milliseconds", 0));
  const context = useAppContext();
  const instances = Instance[context.getVersion()];

  const [common] = useTranslation("common");
  let handleModalOpen: any = () => {};

  const raids: SelectOption[] = instances.map((instance) => {
    return {
      label: instance.name,
      value: instance.abbreviation
    };
  });

  const currentInstance: SelectOption = {
    label:
      instances.find((instance) => instance.abbreviation === raidBuild.instance)?.name ??
      raidBuild.instance,
    value:
      instances.find((instance) => instance.abbreviation === raidBuild.instance)?.abbreviation ??
      raidBuild.instance
  };
  const [instance, setInstance] = useState(null);

  useUpdateSocketContext((message: MessageData) => {
    if (RegisteredMessages.build.includes(message.message_type)) {
      if (message.message_type === "updatebuild") {
        const data: BuildData = message.data as BuildData;
        if (data.build.id === raidBuild.id) {
          setDate(dayjs(data.build.date));
          setInstance(raids.find((raid) => raid.value === data.build.instance));

          selectedOption.date = data.build.date;
          selectedOption.label = `${data.build.name} - ${new Date(data.build.date).toLocaleString(
            "de-DE",
            {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            }
          )}`;
        }
      }
    }
  });

  useEffect(() => {
    setDate(dayjs(raidBuild.date));
    setSelectedOption(context?.getSelectedBuilds().find((build) => build?.value === raidBuild.id));
    setInstance(currentInstance);
    // eslint-disable-next-line
  }, [raidBuild]);

  const handleOpen = (callback: any) => {
    handleModalOpen = callback;
  };

  const handleChange = (event: any, newValue: SelectOption) => {
    if (!newValue) {
      return;
    }
    const buildFound = context
      ?.getSelectedBuilds()
      .find((build) => build?.value === newValue.value);
    if (buildFound) {
      handleModalOpen({
        title: common("error.build.title"),
        content: common("error.build.alreadyset")
      });
    } else {
      setSelectedOption(newValue);
      context?.handleBuildSelect(raidBuild.build_id, newValue);
    }
  };

  const handleInstanceChange = (event: any, newValue: SelectOption) => {
    if (!newValue) {
      return;
    }
    setInstance(newValue);
    context?.setBuildInstance(raidBuild.build_id, newValue);
  };

  const handleDateChange = (date: Dayjs) => {
    const newDate = date.set("seconds", 0).set("milliseconds", 0);
    setDate(newDate);
    context?.handleDateSelect(raidBuild.build_id, newDate);
  };

  return (
    <Box>
      <ModalAlert handleOpen={handleOpen} />

      <Autocomplete
        value={selectedOption}
        options={options}
        onChange={handleChange}
        clearOnEscape
        isOptionEqualToValue={(option, value) => option?.value === value?.value}
        readOnly={!isAccountRoleAllowed(context.getAccountRole(), "ChangeBuild")}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
        sx={{
          backgroundColor: "#1d1d1d",
          border: "1px solid black",
          borderRadius: "5px",
          color: "white"
        }}
      />
      <br></br>
      <Autocomplete
        value={instance}
        options={raids}
        onChange={handleInstanceChange}
        clearOnEscape
        isOptionEqualToValue={(option, value) => option?.value === value?.value}
        readOnly={!isAccountRoleAllowed(context.getAccountRole(), "ChangeInstance")}
        renderInput={(params) => <TextField {...params} variant="outlined" />}
        sx={{
          backgroundColor: "#1d1d1d",
          border: "1px solid black",
          borderRadius: "5px"
        }}
      />
      <br></br>
      <Box display={"grid"} gridTemplateColumns={"1fr"}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            css={{
              zIndex: 0,
              background: "#1d1d1d",
              border: "1px solid black",
              borderRadius: "5px"
            }}
            ampm={false}
            format="DD.MM.YYYY HH:mm"
            label="Raid time"
            value={date}
            readOnly={!isAccountRoleAllowed(context.getAccountRole(), "ChangeDate")}
            onChange={handleDateChange}
            views={["year", "month", "day", "hours", "minutes"]}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default BuildTitle;
