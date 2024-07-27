"use client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useEffect } from "react";

const Home = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  // here we extract above 2 properties from store we can do this
  // inside useEffect but it will not worl properly
  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);
  return null;
};

export default Home;
