import React from "react";
import ModelViewer from "./ModelViewer";
import IntroBox from "./UI/IntroBox";
import Sidebar from "./UI/Sidebar";
import AllTopic from "./UI/AllTopic";

export default function WholeExperience(props) {
  const {
    ModelFade,
    SetModelFade,
    cameraPos,
    setCameraPos,
    cameraRotation,
    setCameraRotation,
    groupRotation,
    setGroupRotation,
    groupPosn,
    setGroupPosn,
    ActiveProperties,
    SetActiveProperties,
    showIntroBox,
    setShowIntroBox,
    showSidebar,
    setShowSidebar,
    isZoomed,
    activeSectionId,
    playSound,
    setPlaySound,
    setActiveSectionId,
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
        groupPosn={groupPosn}
        setGroupPosn={setGroupPosn}
        setActiveSectionId={setActiveSectionId}
      />

      {showIntroBox && (
        <IntroBox
          ModelFade={ModelFade}
          SetModelFade={SetModelFade}
          groupRotation={groupRotation}
          setGroupRotation={setGroupRotation}
          setCameraRotation={setCameraRotation}
          setCameraPos={setCameraPos}
          ActiveProperties={ActiveProperties}
          SetActiveProperties={SetActiveProperties}
          setShowIntroBox={setShowIntroBox}
          setShowSidebar={setShowSidebar}
          activeSectionId={activeSectionId}
          playSound={playSound}
          setPlaySound={setPlaySound}
          setActiveSectionId={setActiveSectionId}
        />
      )}

      {showSidebar && (
        <Sidebar
          playSound={playSound}
          setPlaySound={setPlaySound}
          activeSectionId={activeSectionId}
          setActiveSectionId={setActiveSectionId}
          ActiveProperties={ActiveProperties}
          SetActiveProperties={SetActiveProperties}
        />
      )}
      {showSidebar && <AllTopic />}
    </div>
  );
}
