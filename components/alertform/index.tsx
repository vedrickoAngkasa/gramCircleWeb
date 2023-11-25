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
  

type CustomFormProps = {
    controls: FormControl[];
    trigger: JSX.Element;
    onSubmit: (data: Record<string, string>) => void;
    onBack?: () => void;
    title: string;
};

export const AlertForm: React.FC<CustomFormProps> = ({ controls, trigger, onSubmit, title, onBack }) => {
    const [busy, setBusy] = useState(false);
    const [step, setStep] = useState(0);
    const [open, setOpen] = useState(false);

    const formSchema = z.object(
        controls.reduce((schema, control) => {
            schema[control.name] = z.string().min(2, {
                message: control.error,
            });
            return schema;
        }, {} as Record<string, z.ZodString>),
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: controls.reduce((values, control) => {
            values[control.name] = control.value || "";
            return values;
        }, {} as Record<string, string>),
    });

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
                      "w-full justify-start text-left font-normal",
                       "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    { <span>{control.label}</span>}
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
                return <Textarea placeholder={control.label} {...fieldProps} rows={control.rows}/>;
            case "hidden":
                return <Input type="hidden" name={control.name} value={control.value || ""} />;
            default:
                return null;
        }
    };
    
    const renderControls = controls
        .filter((control) => control.type !== "button" && control.type !== "submit")
        .map((control) => (
            <FormField
                key={control.name}
                control={form.control}
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
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                    {trigger}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Create New Deal</AlertDialogTitle>
                        <AlertDialogDescription>
                        <Form {...form} >
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault(); // Prevent the default form submission
                                    setBusy(true);
                                    const valid = await form.trigger();
                                    if (valid && onSubmit) 
                                    {
                                        const ret = await onSubmit(form.getValues());
                                    }
                                    setBusy(false);
                                }}
                                className="space-y-2"
                            >
                                {renderControls}
                                <div className="pt-4 items-center space-x-2 w-full">
                                    {onBack  && <Button variant="custom" type="button" onClick={()=>onBack()}>
                                        Back
                                    </Button>}
                                    <Button variant="custom" type="button" onClick={()=>setOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button variant="custom" type="submit">
                                        {title}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {/* <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction type="submit">Continue</AlertDialogAction>
                    </AlertDialogFooter> */}
                    </AlertDialogContent>
                </AlertDialog>
            </div >
        )
}
