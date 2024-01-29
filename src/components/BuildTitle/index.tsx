/** @jsxImportSource @emotion/react */
import { FC, useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { SelectOption } from "../../types";
import { useAppContext } from "../App/context";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Instance } from "../../consts";
import { useTranslation } from "react-i18next";
import ModalAlert from "../ModalAlert";
import { isAccountRoleAllowed } from "../../utils/AccountRole";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1
});

export interface BuildTitleProps {
  options: SelectOption[];
  selected: SelectOption;
  build_id: number;
  buildDate?: number;
  version: string;
  selectedInstance?: string;
  accountRole: number;
}

const BuildTitle: FC<BuildTitleProps> = ({
  options,
  selected,
  build_id,
  buildDate,
  version,
  selectedInstance,
  accountRole
}) => {
  const [selectedOption, setSelectedOption] = useState(selected);
  const [date, setDate] = useState<Dayjs | null>(
    buildDate
      ? dayjs(buildDate).set("seconds", 0).set("milliseconds", 0)
      : dayjs().set("seconds", 0).set("milliseconds", 0)
  );
  const instances = version === "Cataclysm" ? Instance.Cataclysm : Instance.Wotlk;
  const context = useAppContext();
  const [common] = useTranslation("common");
  let handleModalOpen: any = () => {};

  const raids: SelectOption[] = [];
  instances.map((instance) => {
    return raids.push({
      label: instance.name,
      value: instance.abbreviation
    });
  });
  const currentInstance: SelectOption =
    selectedInstance === undefined
      ? raids[0]
      : {
          label:
            instances.find((instance) => instance.abbreviation === selectedInstance)?.name ??
            selectedInstance,
          value:
            instances.find((instance) => instance.abbreviation === selectedInstance)
              ?.abbreviation ?? selectedInstance
        };
  const [instance, setInstance] = useState(currentInstance);

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
      context?.handleBuildSelect(build_id, newValue);
    }
  };

  const handleInstanceChange = (event: any, newValue: SelectOption) => {
    if (!newValue) {
      return;
    }
    setInstance(newValue);
    context?.setBuildInstance(build_id, newValue);
  };

  const handleDateChange = (date: Dayjs) => {
    const newDate = date.set("seconds", 0).set("milliseconds", 0);
    setDate(newDate);
    context?.handleDateSelect(build_id, newDate);
  };

  return (
    <Box>
      <ModalAlert handleOpen={handleOpen} />

      <Autocomplete
        value={selectedOption ?? options[0]}
        options={options}
        onChange={handleChange}
        clearOnEscape
        isOptionEqualToValue={(option, value) => option.value === value.value}
        readOnly={!isAccountRoleAllowed(accountRole, "ChangeBuild")}
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
        isOptionEqualToValue={(option, value) => option.value === value.value}
        clearOnEscape
        readOnly={!isAccountRoleAllowed(accountRole, "ChangeInstance")}
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
            readOnly={!isAccountRoleAllowed(accountRole, "ChangeDate")}
            onChange={handleDateChange}
            views={["year", "month", "day", "hours", "minutes"]}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default BuildTitle;
