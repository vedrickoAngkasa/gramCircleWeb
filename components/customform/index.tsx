import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Ensure the correct import
import { BeatLoader } from 'react-spinners';

type ControlType = "text" | "email" | "textarea" | "submit" | "checkbox" | "hidden";

type FormControl = {
    label: string;
    name: string;
    type: ControlType | string;
    error?: string;
    value?: string;
    icon?: React.ReactElement | null;
};

type CustomFormProps = {
    formControls: FormControl[];
    onSubmit: (data: Record<string, string>) => void;
    onCancel: () => void;
    children?: JSX.Element[];
    buttons?: React.ReactElement | React.ReactElement[]; // Change the type to React.ReactElement or React.ReactElement[]
};

const CustomForm: React.FC<CustomFormProps> = ({ formControls, onSubmit, onCancel, children, buttons }) => {
    const [busy, setBusy] = useState(false);

    const formSchema = z.object(
        formControls.reduce((schema, control) => {
            schema[control.name] = z.string().min(2, {
                message: control.error,
            });
            return schema;
        }, {} as Record<string, z.ZodString>),
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: formControls.reduce((values, control) => {
            values[control.name] = control.value || "";
            return values;
        }, {} as Record<string, string>),
    });

    const GetControl = (control: FormControl, fieldProps: any) => {
        switch (control.type) {
            case "text":
                return <Input placeholder={control.label} {...fieldProps} />;
            case "email":
                return <Input placeholder={control.label} {...fieldProps} type="email" />;
            case "password":
                return <Input placeholder={control.label} {...fieldProps} type="password" />;
            case "textarea":
                return <Textarea placeholder={control.label} {...fieldProps} />;
            case "hidden":
                return <Input type="hidden" name={control.name} value={control.value || ""} />;
            default:
                return null;
        }
    };

    const renderControls = formControls
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

    const submitButton = formControls.find((control) => control.type === "submit");
    const cancelButton = formControls.find((control) => control.type === "button");

    return (
        <Form {...form} >
            <form

                onSubmit={async (e) => {
                    e.preventDefault(); // Prevent the default form submission
                    setBusy(true);
                    const valid = await form.trigger();
                    // if (valid) 
                    {
                        const ret = await onSubmit(form.getValues());
                    }
                    setBusy(false);
                }}
                className="space-y-2"
            >
                {renderControls}
                {cancelButton && (
                    <Button type="button" onClick={onCancel} className="mt-4 w-full">
                        {cancelButton.label || ""}
                    </Button>
                )}
                {submitButton && (
                    <Button type="submit" disabled={busy} className="mt-4 w-full" variant="custom">
                        {busy ? <BeatLoader color={'#ffffff'} size={10} /> : submitButton.label || ""}
                    </Button>
                )}
                {buttons && (buttons)}
            </form>
            {children}
        </Form>
    );
};

export default CustomForm;
