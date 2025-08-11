"use client";

import TaggingFormSection from "@/components/dashboard-components/data-analyzer/tagging-form"
import { useRouter } from "next/navigation";


const   TaggingForm=()=>{
  const router = useRouter();


return <TaggingFormSection onClose={()=>{router.back()}}/>

}
export default TaggingForm;