import Image from "next/image";
import PointsMesh from "@/components/Hero";
import Test from "@/components/test";
import ModelViewer from "@/components/ModelViewer";
import IntroBox from "@/components/UI/IntroBox";

export default function Home() {
  return (
    <>

      <ModelViewer />
      <IntroBox />
    </>
  );
}
