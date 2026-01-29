import type { ChangeEvent } from "react";

interface Props {
    value : string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props){
    return (
        <input type="text"
        placeholder="Search product..."
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
        }
        className="search-input"
        />
    );
}