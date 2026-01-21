interface Props {
    text?: string;
}

export default function Empty({ text = "No items found." }: Props) {
    return (
        <p
        className="empty">
            {text}
        </p>
    );
}
