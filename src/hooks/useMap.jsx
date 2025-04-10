import { createContext, useContext, useState } from "react";

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [isNavigating, setIsNavigating] = useState([]);
  const [yPositionCamera, setYPositionCamera] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupData, setGroupData] = useState(16);

  return (
    <MapContext.Provider
      value={{
        isNavigating,
        setIsNavigating,
        yPositionCamera,
        setYPositionCamera,
        isModalOpen,
        setIsModalOpen,
        groupData,
        setGroupData,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};
