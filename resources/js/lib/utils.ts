import type { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function toUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export function parseLocalDate(dateString: string | Date): Date {
    if (!dateString) return new Date();
    if (dateString instanceof Date) return dateString;

    // Extraer solo la parte de la fecha YYYY-MM-DD ignorando el resto (T00:00:00Z, etc)
    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
        const year = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1; // 0-indexed
        const day = parseInt(match[3], 10);
        
        // Creamos la fecha en la zona horaria local a las 00:00:00
        return new Date(year, month, day);
    }

    // Fallback para otros formatos
    return new Date(dateString);
}
