'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import ToggleMode from './ToggleMode';
import Search from './Search';
import { Button } from '@/components/ui/button';
import Logo from '@/components/shared/Logo';
import { Show, SignUpButton, UserButton } from '@clerk/nextjs';

export default function Navbar() {

    const pathname = usePathname();

    const navLinkBase = "relative px-1 mx-2 bg-transparent font-bold tracking-wider transition-colors duration-200 ease-in-out py-1";

    const activeStyles = "bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-300 bg-clip-text text-transparent after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-blue-600 after:to-sky-500 dark:after:from-blue-400 dark:after:to-sky-300";

    const notActiveStyles = "text-slate-600 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-blue-600 dark:after:bg-blue-400 after:transition-all after:duration-200";

    type NavItem = {
        href: string;
        label: string;
    };

    const links: NavItem[] = [
        { href: "/", label: "Home" },
        { href: "/articles", label: "Articles" },
        { href: "/about", label: "About" },
        { href: "/dashboard", label: "Dashboard" },
    ];

    function isNavLinkActive(href: string): boolean {
        return href == pathname;
    }

    return (
        <div className="sticky top-0 z-50 navbar bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md border-b border-blue-500/15 transition-colors duration-200">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost text-gray-700 dark:text-gray-200 lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul className="menu menu-sm dropdown-content bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-200 rounded-box z-1 mt-3 w-52 p-2 shadow border border-blue-500/15">
                        {
                            links.map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} className={`${navLinkBase} ${isNavLinkActive(href) ? activeStyles : notActiveStyles}`}>
                                        {label}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <Link href="/" className=" md:mx-2 text-xl text-gray-900 dark:text-white">
                    <Logo />
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        links.map(({ href, label }) => (
                            <li key={href}>
                                <Link href={href} className={`${navLinkBase} ${isNavLinkActive(href) ? activeStyles : notActiveStyles}`}>
                                    {label}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className="navbar-end gap-2">
                <ToggleMode />

                {/* User Actions  */}

                <Show when="signed-in">
                    <UserButton />
                </Show>
                <Show when="signed-out">
                    <SignUpButton mode="modal">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 dark:bg-blue-500 dark:hover:bg-blue-600">
                            Sign Up
                        </Button>
                    </SignUpButton>
                </Show>

            </div>
        </div>
    )
}