import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, MapPin, Monitor, Cpu, Wrench } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import areas from '@/routes/areas';
import hardwareAssets from '@/routes/hardware-assets';
import pcDetails from '@/routes/pc-details';
import maintenances from '@/routes/maintenances';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Áreas',
        href: areas.index(),
        icon: MapPin,
    },
    {
        title: 'Hardware Assets',
        href: hardwareAssets.index(),
        icon: Monitor,
    },
    {
        title: 'PC Details',
        href: pcDetails.index(),
        icon: Cpu,
    },
    {
        title: 'Mantenimientos',
        href: maintenances.index(),
        icon: Wrench,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
