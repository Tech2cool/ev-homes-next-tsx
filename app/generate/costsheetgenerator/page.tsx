"use client";
import CostSheet from "@/components/generator/costsheet";
import React from "react";

interface CostSheetProps {
  lead?: Lead | null;
}

const CostSheetGenerator: React.FC<CostSheetProps> = ({lead}) => {
    console.log(lead);

  return (
    <CostSheet lead={lead}/>
  );
};

export default CostSheetGenerator;
