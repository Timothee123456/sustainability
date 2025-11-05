export default function ActiveIconBg({ current_color, scale = 1.2 }) {
    const svg_styles = {
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
        fill: 'currentColor',
        fontSize: '1.5rem',
        padding: '0px 2px',
        transform: `scale(${scale})`,
        color: current_color,
    };
    return (
        <svg style={svg_styles} viewBox="0 0 24 24" >
            <path d="M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8">
            </path>
        </svg>
    )
}