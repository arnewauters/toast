import { useEffect } from "react";

function useEscapeKey(callback) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        callback();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback]);
}

export default useEscapeKey;
