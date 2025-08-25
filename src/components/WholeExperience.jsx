import React from "react";
import ModelViewer from "./ModelViewer";
import IntroBox from "./UI/IntroBox";
import Sidebar from "./UI/Sidebar";

export default function WholeExperience(props) {
  const {
    cameraPos,
    setCameraPos,
    cameraRotation,
    setCameraRotation,
    groupRotation,
    setGroupRotation,
    ActiveProperties,
    SetActiveProperties,
    showIntroBox,
    setShowIntroBox,
    showSidebar,
    setShowSidebar,
    isZoomed,
  } = props;
  return (
    <div className="fixed inset-0 z-[100]">
      <ModelViewer
        cameraPos={cameraPos}
        setCameraPos={setCameraPos}
        cameraRotation={cameraRotation}
        setCameraRotation={setCameraRotation}
        groupRotation={groupRotation}
        ActiveProperties={ActiveProperties}
        SetActiveProperties={SetActiveProperties}
        setGroupRotation={setGroupRotation}
        isZoomed={isZoomed}
      />

      {showIntroBox && (
        <IntroBox
          groupRotation={groupRotation}
          setGroupRotation={setGroupRotation}
          setCameraRotation={setCameraRotation}
          setCameraPos={setCameraPos}
          ActiveProperties={ActiveProperties}
          SetActiveProperties={SetActiveProperties}
          setShowIntroBox={setShowIntroBox}
          setShowSidebar={setShowSidebar}
        />
      )}

      {showSidebar && <Sidebar />}
    </div>
  );
}
