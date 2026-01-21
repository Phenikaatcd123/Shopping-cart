interface Props{
    children: React.ReactNode;
}

export default function Cart({ children }: Props) {
    return (
        <div
        className="card">
            {children}
        </div>
    );
}