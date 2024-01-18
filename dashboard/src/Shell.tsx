import React from 'react';
import { Link, useRoute } from 'wouter';
import { LucideIcon, Package2Icon, ShoppingCartIcon, Table } from "lucide-react"
import { cn } from './@/lib/utils';

function NavLink({ to, label, Icon }: {
    to: string,
    label: string,
    Icon: LucideIcon
}) {
    const [isActive] = useRoute(to);
    return (
        <Link
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50", isActive && "bg-gray-100 dark:bg-gray-800 dark:text-gray-50")}
            href={to}
        >
            <Icon className="h-4 w-4" />
            {label}
        </Link>
    )
}

export function MainShell({ children }: {
    children: React.ReactNode
}) {
    return (
        <main className='h-svh w-svw grid overflow-hidden lg:grid-cols-[280px_1fr]'>
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div className="flex flex-col gap-2">
                    <div className="flex h-[60px] items-center px-6">
                        <Link className="flex items-center gap-2 font-semibold" href="/">
                            <Package2Icon className="h-6 w-6" />
                            <span className="">My Store</span>
                        </Link>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <NavLink to="/" label="Home" Icon={Package2Icon} />
                            <NavLink to="/recent" label="Recent Orders" Icon={ShoppingCartIcon} />
                            <NavLink to="/categories" label="Categories" Icon={Table} />
                        </nav>
                    </div>
                </div>
            </div>
            {children}
        </main>
    )
}