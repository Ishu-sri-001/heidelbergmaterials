import Image from "next/image";
import React from "react";

const Sidebar = () => {
  const menuItems = [
    {
      icon: "/assets/svg/earth-logo.svg",
      text: "CCUS around the world",
      height: "1.7vw",
      width: "fit",
      gap: "1vw",
    },
    {
      icon: "/assets/svg/flask-logo.svg",
      text: "Capture technologies lab",
      height: "2vw",
      width: "2vw",
      gap: "1vw",
    },
    {
      icon: "/assets/svg/bottle-logo.svg",
      text: "CO2 Utilization",
      height: "1.9vw",
      width: "1.9vw",
      gap: "1vw",
    },
    {
      icon: "/assets/svg/bulb-logo.svg",
      text: "Stakeholder engagement",
      height: "2.5vw",
      width: "2vw",
      gap: "1.5vw",
    },
    {
      icon: "/assets/svg/chain-logo.svg",
      text: "Value chains & business cases",
      height: "1.7vw",
      width: "1.7vw",
      gap: "1.5vw",
    },
    {
      icon: "/assets/svg/netzero-logo.svg",
      text: "Net zero",
      height: "2vw",
      width: "2vw",
      gap: "1.5vw",
    },
  ];

  return (
    <div className="absolute inset-0  w-fit text-white">
      <div className="flex flex-col p-[1.5vw] relative gap-[1.5vw]">
        <div className="absolute top-0 left-0  w-[10vw] h-[100vh] z-[0] bg-gradient-to-r from-[#028541] opacity-50 blur-3xl to-[#133b24]">
          <div className=""></div>
        </div>
        <div className="w-[4vw] z-[10] h-[4vw]">
          <Image
            src="/assets/svg/logoo.svg"
            width={100}
            height={100}
            className="w-full h-full object-cover"
            alt="logo"
          />
        </div>

        <div className="flex flex-col z-[10] group pt-[7vw] pl-[2vw] gap-[2.2vw]">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex gap-[1vw] items-center opacity-50 hover:opacity-100 cursor-pointer"
            >
              <div
                className={`h-[${item.height}] w-[${item.width}] items-center`}
              >
                <Image
                  src={item.icon}
                  width={100}
                  height={100}
                  className="w-full h-full object-contain"
                  alt="logo"
                />
              </div>
              <p className="font-display text-[0.9vw] hidden group-hover:block">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
