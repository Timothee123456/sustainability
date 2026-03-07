export default function ConvertToActiveIcon({ icon, style }) {
    return (
        <svg viewBox="0 0 24 24" style={style}>
        <defs>
            <mask id="face-mask">
            {/* Everything white in the mask is visible (the circle) */}
            <rect width="24" height="24" />
            <circle cx="12" cy="12" r="8" fill="white" />
            
            {/* Everything not white in the mask is punched out (transparent) */}
            {icon}
            </mask>
        </defs>

        {/* This is the actual colored shape. Change fill="white" to any color you want. */}
        <rect width="24" height="24" fill="currentColor" mask="url(#face-mask)" />
        </svg>
    )
}