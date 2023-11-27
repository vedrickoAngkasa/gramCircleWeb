"use client"
import { AlertForm } from "@/components/alertform";
import CustomForm from "@/components/customform";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { BeatLoader } from 'react-spinners';
export default function CampaignAccordion() {
    const [campaigns, setCampaigns] = useState([]);
    // const [campaigns, setCampaigns] = useState([
    //     {
    //         Title: "Promotion Option 1",
    //         Platform: "Facebook",
    //         Details: {
    //             "About the Promotion":
    //                 "Engage with our Facebook post about the new soup range at Hearty Soups restaurant. Share the post with your audience for a potential collaboration.",
    //             "Collaboration Details":
    //                 "We will provide a $10 voucher for every share and comment our post gets from your account. The goal is to increase brand visibility and drive awareness for Hearty Soups.",
    //         },
    //     },
    //     {
    //         Title: "Promotion Option 2",
    //         Platform: "Instagram",
    //         Details: {
    //             "About the Promotion":
    //                 "Create a personal Instagram post or story featuring our soups, tagging @HeartySoupsRestaurant and hashtagging #HeartySoupsChallenge",
    //             "Collaboration Details":
    //                 "A $10 voucher from Hearty Soups will be given for every Instagram post or story created, aimed at driving brand awareness and extending our brand's reach.",
    //         },
    //     },
    //     {
    //         Title: "Promotion Option 3",
    //         Platform: "Google Reviews",
    //         Details: {
    //             "About the Promotion":
    //                 "Write a review on Google after trying our soups at Hearty Soups restaurant. Ratings and honest feedback are appreciated.",
    //             "Collaboration Details":
    //                 "For every Google review submitted, Hearty Soups shall provide a $10 voucher. The goal is for more customers to know about our brand and attract them to try our soups based on genuine reviews.",
    //         },
    //     },
    // ]);

    const controls = [
        {
            label: "Prompt",
            name: "prompt",
            type: "textarea",
            error: "Prompt can not be left empty",
            value: "Create three options of an influencer engagement barter campaign for a brand Hearty Soups."
        },
        {
            label: "About",
            name: "about",
            type: "textarea",
            error: "About can not be left empty",
            value: "It is a restaurant in Singapore and the goal is to drive awareness for the brand in exchange for a $10 voucher."
        },
        {
            label: "Fields",
            name: "fields",
            type: "text",
            error: "Fields can not be left empty",
            value: `"About the Promotion", "Collaboration Details", "Facebook", "Instagram", "Google Reviews"`
        },

    ]

    const handleSubmit = async (formData: any) => {
        // alert(formData["fields"]);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return true;
        const axios = require('axios');
        let data = JSON.stringify({
            "prompt": formData["prompt"],
            "about": formData["about"],
            "fields": [formData["fields"]]
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: '/api/generate-campaign',
            headers: { 'Content-Type': 'application/json' },
            data: data
        };

        try {
            const response = await axios.request(config);
            console.log(response);
            setCampaigns(response.data);
        } catch (error: any) {
            alert('error in getting campaigns \n' + error.message)
        }
        return true;
    }
    return (
        <div className="flex items-center justify-center p-6 h-full">
            <CustomForm onSubmit={handleSubmit} onCancel={() => alert('cancel')} controls={controls} buttons={[
                <Button key="create" type='submit' variant="custom" className="mt-2 w-full">Create Campaign</Button>,
                <Button key="cancel" variant="custom" onClick={() => alert("cancel")} className="mt-2 w-full">Cancel</Button>
            ]} busy={<BeatLoader color={'#ffffff'} size={10} />} />
        </div >
    );

    return (
        <div className="flex items-center justify-center h-screen text-white ">
            <Accordion type="single" collapsible className="w-full max-w-md border m-4">
                {campaigns.map((option, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className=" p-4 cursor-pointer">
                            {option.Title}
                        </AccordionTrigger>
                        <AccordionContent className=" p-4">
                            <p className="text-white">
                                <strong>Platform:</strong> {option.Platform}
                            </p>
                            <p className="text-white">
                                <strong>About the Promotion:</strong>{" "}
                                {option.Details["About the Promotion"]}
                            </p>
                            <p className="text-white">
                                <strong>Collaboration Details:</strong>{" "}
                                {option.Details["Collaboration Details"]}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
