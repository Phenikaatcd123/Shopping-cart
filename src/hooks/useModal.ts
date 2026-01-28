import { useState } from "react";

export function useModal<T>() {
    const [isOpen, setIsOpen] = useState(false);    
    const [data, setData] = useState<T | null>(null);

    const open = (payload: T) => {
        setData(payload);
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
        setData(null);
    };

    return { isOpen, data, open, close };
}