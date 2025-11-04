import * as React from 'react';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import VeryDissatisfied from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
import Dissatisfied from '@mui/icons-material/SentimentDissatisfiedRounded';
import Normal from '@mui/icons-material/SentimentSatisfied';
import Satisfied from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import VerySatisfied from '@mui/icons-material/SentimentVerySatisfiedRounded';

import VeryDissatisfiedSelected from '@mui/icons-material/SentimentVeryDissatisfied';
import DissatisfiedSelected from '@mui/icons-material/SentimentDissatisfied';
import NormalSelected from '@mui/icons-material/SentimentSatisfiedRounded';
import SatisfiedSelected from '@mui/icons-material/SentimentSatisfiedAltRounded';
import VerySatisfiedSelected from '@mui/icons-material/SentimentVerySatisfied';



const customIcons: {
  [index: string]: {
    icon: React.ReactElement<unknown>;
    activeIcon: React.ReactElement<unknown>;
    label: string;
  };
} = {
  1: {
    icon: <VeryDissatisfied sx={{ color: '#f00' }} />,
    activeIcon: <VeryDissatisfiedSelected sx={{ color: '#f00' }} />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <Dissatisfied sx={{ color: '#ffa726' }} />,
    activeIcon: <DissatisfiedSelected sx={{ color: '#ffa726' }} />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <Normal sx={{ color: '#ff0' }} />,
    activeIcon:<NormalSelected sx={{ color: '#ff0' }} />,
    label: 'Neutral',
  },
  4: {
    icon: <Satisfied sx={{ color: '#73c74a' }} />,
    activeIcon: <SatisfiedSelected sx={{ color: '#73c74a' }} />,
    label: 'Satisfied',
  },
  5: {
    icon: <VerySatisfied sx={{ color: '#009933' }} />,
    activeIcon: <VerySatisfiedSelected sx={{ color: '#009933' }} />,
    label: 'Very Satisfied',
  },
};

interface IconContainerProps extends Omit<RatingProps, 'IconContainerComponent'> {
  value: number;
  hoveredValue: number | null;
  selectedValue: number | null;
}

function IconContainer(props: IconContainerProps) {
  const { value, hoveredValue, selectedValue, ...other } = props;
  const showActiveIcon = (hoveredValue !== null && value === hoveredValue) || (selectedValue !== null && value === selectedValue);
  const iconToShow = showActiveIcon ? customIcons[value].activeIcon : customIcons[value].icon;
  return <span {...other}>{iconToShow}</span>;
}

export default function RadioGroupRating() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [selectedValue, setSelectedValue] = React.useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setSelectedValue(newValue);
  };

  const handleHover = (event: React.ChangeEvent<{}>, newHover: number | null) => {
    setHovered(newHover);
  };

  return (
    <Rating
      name="icon-rating"
      value={selectedValue}
      onChange={handleChange}
      onChangeActive={handleHover}
      getLabelText={(value: number) => customIcons[value].label}
      IconContainerComponent={(props) => (
        <IconContainer {...props} hoveredValue={hovered} selectedValue={selectedValue} value={props.value || 0} />
      )}
      highlightSelectedOnly
    />
  );
}