import { useState, useEffect, useRef } from 'react';
import { Check, ChevronsUpDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface Area {
    id: number;
    nombre: string;
}

interface AreaSelectorProps {
    areas: Area[];
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export default function AreaSelector({ areas, value, onChange, error }: AreaSelectorProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Limit to 6 results as requested
    const filteredAreas = areas
        .filter((area) => area.nombre.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 6);

    const selectedArea = areas.find((area) => String(area.id) === value);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSelect = (areaId: string) => {
        onChange(areaId);
        setOpen(false);
        setSearch(''); // Optional: clear search on select
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <div
                className={cn(
                    "flex h-11 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
                    error ? "border-destructive" : "",
                )}
                onClick={() => setOpen(!open)}
            >
                <span className={!selectedArea ? "text-muted-foreground" : ""}>
                    {selectedArea ? selectedArea.nombre : "Seleccione el área de ubicación"}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </div>

            {open && (
                <div className="absolute z-50 mt-1 w-full min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
                    <div className="flex items-center border-b px-3">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <input
                            className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Buscar área (ej. contabilidad)..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto p-1">
                        {filteredAreas.length === 0 ? (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                                No se encontraron áreas.
                            </div>
                        ) : (
                            filteredAreas.map((area) => (
                                <div
                                    key={area.id}
                                    className={cn(
                                        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                                        String(area.id) === value ? "bg-accent" : ""
                                    )}
                                    onClick={() => handleSelect(String(area.id))}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            String(area.id) === value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {area.nombre}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
            {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
    );
}
