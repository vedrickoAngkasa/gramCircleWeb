"use client"
import Link from "next/link"
import React, { useState } from 'react';
import { Menu, Home, Settings, LogOut } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Ensure the correct import
import { BeatLoader } from 'react-spinners';
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

  type ControlType = "text" | "email" | "textarea" | "submit" | "checkbox" | "hidden" | "date";

  type FormControl = {
    label: string;
    name: string;
    type: ControlType | string;
    error?: string;
    value?: string;
};


import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import CustomForm from "@/components/customform";
  
  
export default function SidebarDemo() {
    const [step, setStep] = useState(0);
    const [steps, setSteps]=useState([{
        title: 'Campaign',
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
        {
            name: "start",
            label: "Start Date",
            type: "date",
        },
        {
            name: "end",
            label: "End Date",
            type: "date",
        },]
    }])
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const GetControl = (control: FormControl, fieldProps: any) => {
        switch (control.type) {
            case "text":
                return <Input placeholder={control.label} {...fieldProps} />;
            case "date":
                return <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                       "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    { <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    // selected={date}
                    // onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>;
            case "textarea":
                return <Textarea placeholder={control.label} {...fieldProps} />;
            case "hidden":
                return <Input type="hidden" name={control.name} value={control.value || ""} />;
            default:
                return null;
        }
    };
    const renderControls = (controls: FormControl[]) =>
    controls.map((control) => (
      <FormField
        key={control.name}
        control={control}
        name={control.name}
        render={({ field }) => (
          <FormItem>
            <FormControl>{GetControl(control, field)}</FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    ));
        return (
        <div className="flex bg-red-500 text-green-400">
        <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button variant="custom">Create First Deal</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                <CustomForm formControls={steps[step].controls} onSubmit={(formData)=>console.log(formData)} onCancel={()=>alert('close')}/>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </div >
    )
}
