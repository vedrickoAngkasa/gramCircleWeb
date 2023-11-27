"use client"
import Link from "next/link"
import React, { useState } from 'react';
import { Menu, Home, Settings, LogOut } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BeatLoader } from 'react-spinners';
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { FloatingInput } from "@/components/floatinginput";
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
    rows?: Number;
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
import { FloatingText } from "../floatingtext";


type CustomFormProps = {
    controls: FormControl[];
    trigger: JSX.Element;
    onSubmit: (data: Record<string, string>) => void;
    onBack?: (() => void) | null;
    title: string;
};

export const AlertForm: React.FC<CustomFormProps> = ({ controls, trigger, onSubmit, title, onBack }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="flex bg-red-500 text-green-400">
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    {trigger}
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Create New Deal</AlertDialogTitle>
                        <AlertDialogDescription>
                            <CustomForm controls={controls} onSubmit={onSubmit} buttons={<div className="pt-4 items-center space-x-2 w-full">
                                {onBack && <Button variant="custom" type="button" onClick={() => onBack()}>
                                    Back
                                </Button>}
                                <Button variant="custom" type="button" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="custom" type="submit">
                                    {title}
                                </Button>
                            </div>} />
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div >
    )
}
