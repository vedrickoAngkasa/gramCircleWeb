"use client"
import React, { useState } from 'react';


import { Button } from "@/components/ui/button"

import { AlertForm } from "@/components/alertform";


export default function BrandDeal() {
    const [step, setStep] = useState(0);
    // const [steps, setSteps] = useState([{
    //     title: 'Add Campaign',
    //     controls: [{
    //         name: "campaign",
    //         label: "Campaign Name",
    //         type: "text",
    //     },
    //     {
    //         name: "promotion",
    //         label: "About the Promotion",
    //         type: "text",
    //     },
    //     {
    //         name: "collobration",
    //         label: "Collobration Details",
    //         type: "textarea",
    //     },
    //         // {
    //         //     name: "start",
    //         //     label: "Start Date",
    //         //     type: "date",
    //         // },
    //         // {
    //         //     name: "end",
    //         //     label: "End Date",
    //         //     type: "date",
    //         // },
    //     ]
    // }, {
    //     title: 'Add Engagement',
    //     controls: [{
    //         name: "channel",
    //         label: "Select One Channel",
    //         type: "text",
    //     },
    //     {
    //         name: "promotion",
    //         label: "About the Promotion",
    //         type: "text",
    //     },
    //     {
    //         name: "redemption",
    //         label: "Redemption Details",
    //         type: "textarea",
    //     },]
    // }])
    const [steps, setSteps] = useState([
        {
            title: "Campaign ",
            description: "",
            controls: [
                // {
                //     label: "Campaign details would help influences achieve the campaign goal.",
                //     name: "campaignName",
                //     type: "label",
                //     error: "Campaign name can not be left empty",
                // },
                {
                    label: "Campaign Name",
                    name: "campaignName",
                    type: "text",
                    error: "Campaign name can not be left empty",
                },
                {
                    label: "About the Promotion",
                    name: "promotionDetails",
                    type: "textarea",
                    rows: 2,
                    error: "About the promotion name can not be left empty",
                },
                {
                    label: "Collaboration ",
                    type: "textarea",
                    rows: 2,
                    name: "collaborationDetails",
                    error: "Collaboration details can not be left empty",
                },
                {
                    label: "Start Date",
                    name: "collaborationStartDate",
                    type: "text",
                    error: "Collaboration start date can not be left empty",
                }, {
                    label: "End Date",
                    name: "collaborationEndDate",
                    type: "text",
                    error: "Collaboration end date can not be left empty",
                },
            ]
        },
        {
            title: "Engagement ",
            description: "",
            controls: [
                {
                    label: "Facebook",
                    name: "facebook",
                    type: "text",
                    error: "Campaign name can not be left empty",
                },
                {
                    label: "Instagram",
                    name: "instagram",
                    type: "text",
                    error: "About the promotion name can not be left empty",
                },
                {
                    label: "Tiktok",
                    name: "tiktok",
                    type: "text",
                    error: "Collaboration details can not be left empty",
                },
                {
                    label: "Freebie (Enter Value)",
                    name: "freebie",
                    type: "text",
                    error: "Freebie can not be left empty",
                },
                {
                    label: "Voucher (Enter Value)",
                    name: "voucher",
                    type: "text",
                    error: "Voucher can not be left empty",
                },
                {
                    label: "Redemption Details",
                    type: "textarea",
                    rows: 2,
                    name: "RedemptionDetails",
                    error: "Redemption details can not be left empty",
                },
            ]
        },
        {
            title: "Creators ",
            description: "",
            controls: [
                {
                    label: "Followers Required",
                    name: "followers",
                    type: "text",
                    error: "Followers Required can not be left empty",
                },
                {
                    label: "Minimum Participants",
                    name: "participants",
                    type: "text",
                    error: "Verified Creator can not be left empty",
                },
                {
                    label: "Verified Creator?",
                    name: "verified",
                    type: "text",
                    error: "Verified Creator can not be left empty",
                },
            ]
        },
        {
            title: "Tagging ",
            description: "",
            controls: [
                {
                    label: "Tag Account",
                    name: "tagAccount",
                    type: "text",
                    error: "Tag Account can not be left empty",
                },
                {
                    label: "Additional Mandatory Tags",
                    name: "MandatoryTags",
                    type: "textarea",
                    rows: 3,
                    error: "Mandatory Tags can not be left empty",
                },
            ]
        },
    ]);

    const handleBack = () => {
        if (step >= 1) setStep(prev => prev - 1);
    }

    const handleSubmit = (formData: any) => {
        alert(JSON.stringify(formData))
        if (step < steps.length - 1) {
            setStep((prev) => prev + 1);
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
