"use client"
import Link from "next/link"
import React, { useState } from 'react';
import { Menu, Home, Settings, LogOut } from 'lucide-react';

export default function SidebarDemo({
    children,
}: {
    children: React.ReactNode
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="flex">
            <div className={`flex flex-col h-screen p-3 bg-white shadow w-${isSidebarOpen ? '40' : '20'} transition-all duration-300`}>
                <div className="space-y-3 flex-1 transition-all duration-300">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                        <li className="rounded-sm">
                            <div className="flex items-center p-2 space-x-3 rounded-md cursor-pointer">
                                <Menu onClick={toggleSidebar} />
                                {isSidebarOpen && <span>Brands</span>}
                            </div>
                        </li>
                        <li className="rounded-sm">
                            <Link
                                href="/"
                                className="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <Home />
                                {isSidebarOpen && <span>Home</span>}
                            </Link>
                        </li>
                    </ul>
                    <div className="border-b-2 border-gray-300 mb-4"></div> {/* Add a line on top */}
                    <div className="flex-1"></div> {/* Add a flexible space */}
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                        <li className="rounded-sm">
                            <Link
                                href="/"
                                className="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <Settings />
                                {isSidebarOpen && <span>Settings</span>}
                            </Link>
                        </li>
                        <li className="rounded-sm">
                            <Link
                                href="/"
                                className="flex items-center p-2 space-x-3 rounded-md"
                            >
                                <LogOut />
                                {isSidebarOpen && <span>Log Out</span>}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto mt-12">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-white">
                    {children}
                </div>
            </div>
        </div >
    )
}
