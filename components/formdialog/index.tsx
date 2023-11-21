import React, { useState, ReactNode } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import CustomForm from '@/components/customform';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"

type FormControl = {
    label: string;
    name: string;
    type: string;
    error?: string;
    value?: string;
};

type FormDialogProps = {
    trigger?: ReactNode; // Use ReactNode for dynamic content like buttons
    title?: string;
    controls: FormControl[];
    onSubmit?: (data: Record<string, string>) => Promise<boolean>; // Update the type to return a Promise<boolean>
    children?: JSX.Element[];
};

export default function FormDialog({ trigger, title, controls, onSubmit, children }: FormDialogProps) {
    const [open, setOpen] = useState(false);
    const handleSubmit = async (data: Record<string, string>) => {
        if (onSubmit) {
            const ret = await onSubmit(data);
            if (ret)
                setOpen(false);
            return;
        }
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <CustomForm formControls={controls} onSubmit={handleSubmit} onCancel={() => { setOpen(false) }} >{children}</CustomForm>
            </DialogContent>
        </Dialog>
    );
}
