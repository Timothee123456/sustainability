import * as React from 'react';
import Rating, { IconContainerProps } from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ConvertToActiveIcon from '../satisfaction-icons/active.jsx';
import { SvgIcon } from '@mui/material';

import { ReactComponent as VeryDissatisfiedIcon } from '../satisfaction-icons/very-dissatisfied.svg';
import { ReactComponent as DissatisfiedIcon } from '../satisfaction-icons/dissatisfied.svg';
import { ReactComponent as NormalIcon } from '../satisfaction-icons/normal.svg';
import { ReactComponent as SatisfiedIcon } from '../satisfaction-icons/satisfied.svg';
import { ReactComponent as VerySatisfiedIcon } from '../satisfaction-icons/very-satisfied.svg';

const padding = '0px 4px';

const activeIconStyle = {
  padding: padding,
  transform: 'scale(1.2)',

  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  MsUserSelect: 'none',
  userSelect: 'none',
  width: '1em',
  height: '1em',
  display: 'inline-block',
  WebkitFlexShrink: 0,
  MsFlexNegative: 0,
  flexShrink: 0,
  WebkitTransition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  fontSize: '1.5rem',
}

const iconPadding = {
  padding: padding,
}

const iconColors = {
  VeryDissatisfied: '#f00',
  Dissatisfied: '#ffa726',
  Normal: '#ff0',
  Satisfied: '#73c74a',
  VerySatisfied: '#009933',
}

const customIcons: {
  [index: string]: {
    icon: React.ReactElement<unknown>;
    activeIcon: React.ReactElement<unknown>;
    label: string;
  };
} = {
  1: {
    icon: <SvgIcon component={VeryDissatisfiedIcon} inheritViewBox sx={{ color: iconColors.VeryDissatisfied, ...iconPadding }} />,
    activeIcon: <ConvertToActiveIcon icon={<VeryDissatisfiedIcon />} style={{color: iconColors.VeryDissatisfied, ...activeIconStyle}} />,
    label: 'Awful',
  },
  2: {
    icon: <SvgIcon component={DissatisfiedIcon} inheritViewBox sx={{ color: iconColors.Dissatisfied, ...iconPadding }} />,
    activeIcon: <ConvertToActiveIcon icon={<DissatisfiedIcon />} style={{color: iconColors.Dissatisfied, ...activeIconStyle}} />,
    label: 'Bad',
  },
  3: {
    icon: <SvgIcon component={NormalIcon} inheritViewBox sx={{ color: iconColors.Normal, ...iconPadding }} />,
    activeIcon: <ConvertToActiveIcon icon={<NormalIcon />} style={{color: iconColors.Normal, ...activeIconStyle}} />,
    label: 'Average',
  },
  4: {
    icon: <SvgIcon component={SatisfiedIcon} inheritViewBox sx={{ color: iconColors.Satisfied, ...iconPadding }} />,
    activeIcon: <ConvertToActiveIcon icon={<SatisfiedIcon />} style={{color: iconColors.Satisfied, ...activeIconStyle}} />,
    label: 'Good',
  },
  5: {
    icon: <SvgIcon component={VerySatisfiedIcon} inheritViewBox sx={{ color: iconColors.VerySatisfied, ...iconPadding }} />,
    activeIcon: <ConvertToActiveIcon icon={<VerySatisfiedIcon />} style={{color: iconColors.VerySatisfied, ...activeIconStyle}} />,
    label: 'Excellent',
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
  const activeIcon = customIcons[value].activeIcon
  const label = customIcons[value].label
  const transformStyle = {transform: value === selectedValue ? 'scale(1.4)' : 'scale(1)'} // Apply scale only when selected
  const iconColor = customIcons[value].icon.props.sx.color;

  const iconElement = showActiveIcon ? 
    <div style={{ position: "relative", display: 'inline-block'}}>
      <span>{activeIcon}</span>
    </div> 
    : <span>{defaultIcon}</span>;

  return (
    <div
      {...other} 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        ...transformStyle,
      }}
    >
      {/*<Typography
        variant="caption"
        sx={{
          fontSize: '0.4rem',
          fontWeight: 500,
          lineHeight: 0.8,
          mb: 0.5,
          color: iconColor,
          textTransform: 'uppercase', 
          letterSpacing: '0.02em',
          opacity: value === selectedValue ? 1 : 0.8, 
        }}
      >
        {label}
      </Typography>*/}
      {iconElement}
    </div>
  );
}

export default function RadioGroupRating({ size = 1, onChange }) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [selectedValue, setSelectedValue] = React.useState<number | null>(null);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const handleHover = (event: React.ChangeEvent<{}>, newHover: number | null) => {
    setHovered(newHover);
  };

  const container_style = {
    transform: `scale(${size * 1.3})`
  }

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