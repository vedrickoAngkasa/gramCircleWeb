"use client"
import Link from "next/link"
import React, { useState } from 'react';
import { Menu, Home, Settings, LogOut } from 'lucide-react';

export default function SidebarDemo() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="flex bg-red-500 text-green-400">
            Page content goes here
            <div className="flex bg-red-500 text-green-400">this</div>
        </div >
    )
}
