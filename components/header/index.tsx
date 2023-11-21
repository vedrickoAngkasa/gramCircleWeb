"use client"
import Image from 'next/image';
import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { PlusSquare, LogOut, UserCircle2, Settings } from 'lucide-react';
import { getAuth } from 'firebase/auth';
import { initFirebase } from '@/lib/db'
import Link from 'next/link'
import { Button } from '../ui/button';
import FormDialog from '@/components/formdialog'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const app = initFirebase();
const auth = getAuth(app as any);



export default function Header() {
    const [user, loading] = useAuthState(auth);
    const logout1 = async () => {
        await auth.signOut()
    }

    useEffect(() => {
        if (user) {
            console.log(user);
        }
    }, [user]);

    const logout = async () => {
        await auth.signOut();
    }

    interface LogoutPopupProps {
        user: { photoURL?: string; email: string };
        onLogout: () => void;
        onClose: () => void;
    }

    const LogoutPopup: React.FC<LogoutPopupProps> = ({ user, onLogout, onClose }) => {
        return (
            <div className="bg-white rounded p-4 text-center">
                <div className="relative w-16 h-16 mx-auto rounded-full">
                    {user && user.photoURL ? (
                        <Image
                            src={user.photoURL}
                            alt="User Photo"
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                        />
                    ) : (
                        <UserCircle2 size={50} />
                    )}
                </div>
                {user && <p className="mt-2 font-semibold mb-4">{user.email}</p>}
                <hr className="border-gray-300" />
                <ul className="mt-4 space-y-2">
                    <li
                        className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                        onClick={() => alert('Profile Clicked')}
                    >
                        <UserCircle2 size={24} className="mr-2" />
                        <span>Profile</span>
                    </li>
                    <li
                        className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                        onClick={() => alert('Settings Clicked')}
                    >
                        <Settings size={24} className="mr-2" />
                        <span>Settings</span>
                    </li>
                    <hr className="border-gray-300" />
                    <li
                        className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                        onClick={onLogout}
                    >
                        <LogOut size={24} className="mr-2" />
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
        );
    };
    return (
        <div className="bg-gray-0 w-full flex justify-between items-center py-10 border-1 border-black px-10">
            <div className="flex items-center font-logo text-xl text-black">
                <Link href="/admin/brands">www.gramcircle.ai</Link>
            </div>
            {user ? (

                <div className="flex items-center ">
                    <Popover>
                        <PopoverTrigger asChild>
                            <UserCircle2 size={28} className='cursor-pointer' />
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <LogoutPopup
                                user={{
                                    photoURL: user?.photoURL || '',
                                    email: user?.email || ''
                                }}
                                onLogout={logout}
                                onClose={() => { alert('logout') }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>) : (<FormDialog
                    trigger={
                        <Button type="button">Login</Button>
                    }
                    title="Login to continue..." // Title for the dialog
                    controls={[
                        {
                            label: "Promotion Name",
                            name: "name",
                            type: "text",
                            error: "Promotion Name can not be left empty",
                        },
                        {
                            label: "Incentive",
                            name: "incentive",
                            type: "text",
                            error: "Incentive can not be left empty",
                        },
                        {
                            label: "Comma seperated promo codes",
                            name: "promoCodes",
                            type: "textarea",
                            error: "At least one promo code can not be left empty",
                        },
                        {
                            label: "Terms",
                            name: "terms",
                            type: "textarea",
                            error: "Terms can not be left empty",
                        },
                        {
                            label: "Promo Url Extension",
                            name: "url",
                            type: "text",
                            error: "Url can not be left empty",
                        },
                        {
                            label: "Cancel",
                            name: "reset",
                            type: "button",
                            error: "Please enter a message",
                        },
                        {
                            label: "Next",
                            name: "submit",
                            type: "submit",
                            error: "Please enter a message",
                        },
                    ]}
                    onSubmit={async (formData: any) => {
                        if (!user || !formData.name || !formData.incentive || !formData.promoCodes || !formData.url) {
                            return false;
                        }

                        try {
                            const promotions = await addPromotion({
                                ...formData,
                                uid: user?.uid,
                                brandId: brand,
                                products: [],
                                date: getCurrentDate(),
                                visits: 0,
                                redeemed: 0,
                            });
                            await setTimeout(() => {
                            }, 500);

                            // alert('promotion added, now get the product selection')
                            setProductsInPromotionDialog(true);
                            return true;

                        } catch (error: any) {
                            alert(error.message);
                        }
                        return true;
                    }}
                ></FormDialog>





            )}
        </div>
    )
}
