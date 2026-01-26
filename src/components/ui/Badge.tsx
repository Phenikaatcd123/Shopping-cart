interface BadgeProps {
    value: number;
} 

export default function Badge({ value}: BadgeProps) {
    return (
        <span
        className="badge">
            {value}
        </span>
    );
}