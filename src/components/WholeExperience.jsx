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
    handleCameraRotation,
    isZoomed,

    } = props
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

      <div
        onClick={() => handleCameraRotation(0)}
        className="absolute bottom-[5%] right-[5%] z-[999] bg-green-800 text-white p-[1vw] px-[2vw] rounded-full"
      >
        <p onClick={() => handleCameraRotation(0)}>Rotate</p>
      </div>
    </div>
  );
}
