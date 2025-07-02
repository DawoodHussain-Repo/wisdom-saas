import { Button } from "@/components/ui/button";
import React from "react";

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl underline">Welcome to my Saas App</h1>
      <Button className="rounded-full  bg-purple-500 cursor-pointer">Lets Get Started</Button>
    </div>
  );
};

export default Page;
