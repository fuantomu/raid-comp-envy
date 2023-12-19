/** @jsxImportSource @emotion/react */
import { FC, useState} from "react";
import { Box } from "@mui/material";
import { ActionMeta } from 'react-select';
import Select from 'react-select';
import { SelectOption } from "../../types";
import { useAppContext } from "../App/context";


export interface BuildTitleProps {
  onChange: (build: SelectOption) => void;
  options: SelectOption[];
  selected: SelectOption;
  title: string;
  buildId: number;
}

const BuildTitle: FC<BuildTitleProps> = ({ onChange, options, selected, title, buildId }) => {
  const [selectedOption, setSelectedOption] = useState(selected);
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

  const customStyles = {
    control: (provided :any, state:any) => ({
      ...provided,
      boxShadow: 'none',
      backgroundColor: "#1d1d1d",
      border: '1px solid black',
      color: "white",
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
    <Box>
    <Select
            value={selectedOption}
            options={options}
            onChange={handleChange}
            styles={customStyles}
    ></Select>
    </Box>
  );
};

export default BuildTitle;
