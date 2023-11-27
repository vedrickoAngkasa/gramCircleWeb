"use client"
import React, { useState } from 'react';


import { Button } from "@/components/ui/button"

import {AlertForm} from "@/components/alertform";
  
  
export default function BrandDeal() {
    const [step, setStep] = useState(0);
    const [steps, setSteps]=useState([{
        title: 'Add Campaign',
        controls:[{
            name: "campaign",
            label: "Campaign Name",
            type: "text",
        },
        {
            name: "promotion",
            label: "About the Promotion",
            type: "text",
        },
        {
            name: "collobration",
            label: "Collobration Details",
            type: "textarea",
        },
        // {
        //     name: "start",
        //     label: "Start Date",
        //     type: "date",
        // },
        // {
        //     name: "end",
        //     label: "End Date",
        //     type: "date",
        // },
    ]
    },{
        title: 'Add Engagement',
        controls:[{
            name: "channel",
            label: "Select One Channel",
            type: "text",
        },
        {
            name: "promotion",
            label: "About the Promotion",
            type: "text",
        },
        {
            name: "redemption",
            label: "Redemption Details",
            type: "textarea",
        },]
    }])

    const handleBack = () =>{
        if( step >= 1 ) setStep(prev=>prev-1);
    }

    const handleSubmit = (formData: any)=>{
        alert(JSON.stringify(formData))
        if( step < steps.length-1){
            setStep((prev)=> prev+1);
        }
    }
        return (
        <div className="flex bg-red-500 text-green-400">
        <AlertForm 
            trigger={<Button variant="custom">Create First Deal</Button>} 
            controls={steps[step].controls} title={`${steps[step].title}`} 
            onSubmit={handleSubmit}
            onBack={(step ? handleBack : null)}
            />
        </div >
    )
}
