import { useEffect } from 'react'

export const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
            if(!ref.current || ref.current.contains(event.target)){
                return;
            }
            handler();
        }

        document.addEventListener("mousedown", listener);
        // console.log("listener added");
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            // console.log("listener Removed");
            document.removeEventListener("touchstart", listener);
        }
    },[ref, handler])
}
