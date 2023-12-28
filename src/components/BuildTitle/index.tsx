/** @jsxImportSource @emotion/react */
import { FC, useState} from "react";
import { Box } from "@mui/material";
import { ActionMeta } from 'react-select';
import Select from 'react-select';
import { SelectOption } from "../../types";
import { useAppContext } from "../App/context";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

export interface BuildTitleProps {
  onChange: (value: any) => void;
  options: SelectOption[];
  selected: SelectOption;
  title: string;
  buildId: number;
  buildDate?: number;
}

const BuildTitle: FC<BuildTitleProps> = ({ onChange, options, selected, title, buildId, buildDate }) => {
  const [selectedOption, setSelectedOption] = useState(selected);
  const [date, setDate] = useState<Dayjs | null>(buildDate? dayjs(buildDate).set("minutes", 0).set("seconds", 0).set("milliseconds",0) : dayjs().set("minutes", 0).set("seconds", 0).set("milliseconds",0));
  const context = useAppContext();

  const handleChange = (newValue: SelectOption, actionMeta: ActionMeta<never>) => {
    if(context?.getOtherBuildName(buildId) === newValue.label){
      console.log("This build is already set in another raid")
    }
    else{
      setSelectedOption(newValue);
      if (newValue.label !== title) {
        onChange(newValue);
      }
    }
  };

  const handleDateChange = (date: Dayjs) => {
    const newDate = date.set("minutes", 0).set("seconds", 0).set("milliseconds",0)
    setDate(newDate);
    onChange(newDate);
  }

  const customStyles = {
    control: (provided :any, state:any) => ({
      ...provided,
      boxShadow: 'none',
      backgroundColor: "#1d1d1d",
      border: '1px solid black',
      color: "black",
      width:"100%"
    }),
    singleValue: (provided :any, state:any) => ({
      ...provided,
      fontSize: 20,
      color: 'white'
    }),
    option: (provided :any, state:any) => ({
      ...provided,
      fontSize: 16,
      color: '#fff',
      backgroundColor: state.isSelected ? '#ad0a0a' : state.isFocused? '#757575' : '#1d1d1d'
    })
  }

  return (
    <Box display={"grid"} gridTemplateColumns={"4fr 1fr"}>
      <Select
              value={selectedOption}
              options={options}
              onChange={handleChange}
              styles={customStyles}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          ampm={false}
          format="DD.MM.YYYY HH:mm"
          label="Raid time"
          value={date}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default BuildTitle;
