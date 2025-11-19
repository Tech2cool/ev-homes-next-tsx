"use client";
import CostSheet from "@/components/generator/costsheet";
import { useSearchParams } from "next/navigation";
import React from "react";

const CostSheetGenerator = () => {
    const searchParams = useSearchParams();
    const lead = searchParams.get('lead');

  return (
    <CostSheet lead={lead}/>
  );
};

export default CostSheetGenerator;
