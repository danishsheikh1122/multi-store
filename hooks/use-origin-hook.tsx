import React, { useEffect, useState } from "react";

const useOriginHook = () => {
  const [mounted, setMounted] = useState(false);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return "";

  return origin;
};

export default useOriginHook;
