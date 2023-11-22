"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { PlusSquare, LogOut, UserCircle2, Settings, Mail } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

import { initFirebase } from '@/lib/db'
import Link from 'next/link'

// import Button from '@/components/button';
import { Button } from '../ui/button';
import LoginDialog from '@/components/logindialog'
import FormDialog from '@/components/formdialog';
import {
    getAuth,
    signInWithRedirect,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    FacebookAuthProvider,
    TwitterAuthProvider,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
} from 'firebase/auth';

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
                        <UserCircle2 size={50} style={{ color: 'white' }} />
                    )}
                </div>
                {user && <p className="mt-2 font-semibold mb-4">{user.email}</p>}
                <hr className="border-gray-300" />
                <ul className="mt-4 space-y-2">
                    <li
                        className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                        onClick={() => alert('Profile Clicked')}
                    >
                        <UserCircle2 size={24} className="bg-red border border-red text-white hover:bg-white hover:text-blue hover:border-blue hover:border mr-2" />
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
        <div className="bg-blue w-full flex justify-between items-center py-4 border-1 border-black px-4">
            <div className="flex items-center font-logo text-xl text-white">
                <a href="/admin/brands">www.gramcircle.ai</a>
            </div>
            {user ? (
                <div className="flex items-center ">
                    <Popover>
                        <PopoverTrigger asChild>
                            <UserCircle2 size={28} className="cursor-pointer text-white hover:text-red mr-2" />
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
                </div>) : (
                <div>
                    <LoginDialog
                        trigger={
                            <Button type="button" variant="custom">Login</Button>
                        }
                        titles={["Login to continue...", "Sign up to start..."]}
                        loginControls={[
                            {
                                label: "Email",
                                name: "email",
                                type: "email",
                                error: "Email can not be left empty",
                            },
                            {
                                label: "Password",
                                name: "password",
                                type: "password",
                                error: "Password can not be left empty",
                            },
                            // {
                            //     label: "Login with E-mail",
                            //     name: "submit",
                            //     type: "submit",
                            //     error: "Please enter a message",
                            // },
                        ]}
                        signUpControls={[
                            {
                                label: "Name",
                                name: "name",
                                type: "text",
                                error: "Name can not be left empty",
                            },
                            {
                                label: "Email",
                                name: "email",
                                type: "email",
                                error: "Email can not be left empty",
                            },
                            {
                                label: "Password",
                                name: "password",
                                type: "password",
                                error: "Password can not be left empty",
                            },
                            {
                                label: "Confirm Password",
                                name: "confirm",
                                type: "password",
                                error: "Password can not be left empty",
                            },
                            // {
                            //     label: "Sign Up with E-mail",
                            //     name: "submit",
                            //     type: "submit",
                            //     error: "Please enter a message",
                            // },
                        ]}
                    // onSubmit={async (formData: any) => {
                    //     console.log(formData);
                    //     try {
                    //         await signInWithEmailAndPassword(auth, formData.email, formData.password);
                    //         return true;
                    //     } catch (error: any) {
                    //         // alert(error.message);
                    //         console.log(error.message);
                    //         setLoginError(error.message);
                    //         return false;
                    //     }
                    //     return true;
                    // }}
                    />
                </div>
            )}
        </div>
    )
}
