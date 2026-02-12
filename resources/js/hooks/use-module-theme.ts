import { usePage } from '@inertiajs/react';

export function useModuleTheme() {
    const { url } = usePage();
    const path = url.split('?')[0]; // Remove query params

    if (path.startsWith('/areas')) {
        return 'theme-areas';
    }
    if (path.startsWith('/hardware-assets')) {
        return 'theme-hardware';
    }
    if (path.startsWith('/pc-details')) {
        return 'theme-pcdetails';
    }
    if (path.startsWith('/maintenances')) {
        return 'theme-maintenances';
    }

    return '';
}
