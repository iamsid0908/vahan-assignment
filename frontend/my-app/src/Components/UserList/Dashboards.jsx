import React from "react";
import { Button } from "@/components/ui/button";

const Dashboards = () => {
  return (
    <>
      <div className="bg-gradient-to-r min-h-screen from-rose-100 to-teal-100">
        <div className="w-screen h-screen flex flex-col items-center justify-center ">
          <h1 className="font-semibold text-center text-7xl ">
            Advance
            <span className="text-green-600 font-bold">
              <br />
              CMS <br />
            </span>
            assistent
          </h1>

          <div className="mt-4">
            <div className="flex justify-center">
              <Button className="bg-green-600">Get Started</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboards;
