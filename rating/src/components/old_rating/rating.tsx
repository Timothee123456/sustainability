import * as React from 'react';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import ActiveIconBg from './activeIcon';
import VeryDissatisfied from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
import Dissatisfied from '@mui/icons-material/SentimentDissatisfiedRounded';
import Normal from '@mui/icons-material/SentimentSatisfied';
import Satisfied from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import VerySatisfied from '@mui/icons-material/SentimentVerySatisfiedRounded';

const padding = '0px 4px';

const activeIconStyle = {
  color: '#fff',
  padding: padding,
  transform: 'scale(1.2)',
}

const iconPadding = {
  padding: padding,
}

const customIcons: {
  [index: string]: {
    icon: React.ReactElement<unknown>;
    activeIconBg: React.ReactElement<unknown>;
    activeIcon: React.ReactElement<unknown>;
    label: string;
  };
} = {
  1: {
    icon: <VeryDissatisfied sx={{ color: '#f00', ...iconPadding}} />,
    activeIconBg: <ActiveIconBg current_color="#f00" padding={padding} />,
    activeIcon: <VeryDissatisfied sx={activeIconStyle} />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <Dissatisfied sx={{ color: '#ffa726', ...iconPadding}} />,
    activeIconBg: <ActiveIconBg current_color="#ffa726" padding={padding} />,
    activeIcon: <Dissatisfied sx={activeIconStyle} />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <Normal sx={{ color: '#ff0', ...iconPadding}} />,
    activeIconBg: <ActiveIconBg current_color="#ff0" padding={padding} />,
    activeIcon: <Normal sx={activeIconStyle} />,
    label: 'Neutral',
  },
  4: {
    icon: <Satisfied sx={{ color: '#73c74a', ...iconPadding}} />,
    activeIconBg: <ActiveIconBg current_color="#73c74a" padding={padding} />,
    activeIcon: <Satisfied sx={activeIconStyle} />,
    label: 'Satisfied',
  },
  5: {
    icon: <VerySatisfied sx={{ color: '#009933', ...iconPadding}} />,
    activeIconBg: <ActiveIconBg current_color="#009933" padding={padding} />,
    activeIcon: <VerySatisfied sx={activeIconStyle} />,
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
  const showActiveIcon = (selectedValue !== null && value === selectedValue);
  const defaultIcon = customIcons[value].icon
  const activeIconBg = customIcons[value].activeIconBg
  const activeIcon = customIcons[value].activeIcon
  const transformStyle = {transform: value === selectedValue ? 'scale(1.4)' : 'scale(1)'} // Apply scale only when selected

  return showActiveIcon ? 
    <div style={{ position: "relative", ...transformStyle}}> {/* Ensure positioning context */}
      <span {...other}>{activeIconBg}</span>
      <span style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, /* Make the icon on top of the bg */ }} {...other}>{activeIcon}</span>
    </div> 
    : <span {...other}>{defaultIcon}</span>;
}

export default function RadioGroupRating({ size = 1 }) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [selectedValue, setSelectedValue] = React.useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setSelectedValue(newValue);
  };

  const handleHover = (event: React.ChangeEvent<{}>, newHover: number | null) => {
    setHovered(newHover);
  };

  const container_style = {
    transform: `scale(${size})`
  }
  console.log("Rating size:", size);

  return (
    <div style={{...container_style, margin: size * 15 + 'px'}}>
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
    </div>
  );
}