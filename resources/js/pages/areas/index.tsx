import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    PlusCircle,
    Pencil,
    Trash2,
    Building,
    MapPin,
    Search,
    Filter,
    Eye,
    MoreVertical,
    AlertCircle
} from 'lucide-react';
import areasRoutes from '@/routes/areas';
import Pagination from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Area {
    id: number;
    nombre: string;
    ubicacion_fisica: string;
    created_at: string;
    updated_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedAreas {
    data: Area[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

interface Props {
    areas: PaginatedAreas;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Áreas',
        href: areasRoutes.index().url,
    },
];

export default function AreaIndex({ areas, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    // Debounce implementation
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(
                    areasRoutes.index().url,
                    { search: search },
                    {
                        preserveState: true,
                        replace: true,
                    }
                );
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search, filters.search]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Áreas" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header con gradiente */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-green-950/30 border border-emerald-100 dark:border-emerald-900/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Gestión de Áreas
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Administra las áreas y departamentos de la institución
                            </p>
                        </div>
                        <Link href={areasRoutes.create().url}>
                            <Button className="gap-2 shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 border-0">
                                <PlusCircle className="h-4 w-4" />
                                Nueva Área
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4">

                    {/* Stats y filtros con gradientes vibrantes */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white overflow-hidden relative rounded-xl p-4">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                            <div className="flex items-center justify-between relative z-10">
                                <div>
                                    <p className="text-sm font-medium text-white/90">Total de Áreas</p>
                                    <p className="text-3xl font-bold mt-1 text-white">{areas.total}</p>
                                </div>
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <Building className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </div>

                        <div className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white overflow-hidden relative rounded-xl p-4">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                            <div className="flex items-center justify-between relative z-10">
                                <div>
                                    <p className="text-sm font-medium text-white/90">Mostrando</p>
                                    <p className="text-3xl font-bold mt-1 text-white">{areas.from}-{areas.to}</p>
                                </div>
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <Eye className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Barra de búsqueda y filtros */}
                        <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar áreas por nombre..."
                                    className="pl-10"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="gap-2">
                                    <Filter className="h-4 w-4" />
                                    Filtros
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabla mejorada */}
                <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="font-semibold">Área</TableHead>
                                <TableHead className="font-semibold">Ubicación</TableHead>
                                <TableHead className="font-semibold">Fecha de Creación</TableHead>
                                <TableHead className="font-semibold text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {areas.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-12">
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <div className="p-4 rounded-full bg-muted">
                                                <Building className="h-8 w-8 text-muted-foreground" />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="font-semibold">No hay áreas registradas</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Comienza creando tu primera área
                                                </p>
                                            </div>
                                            <Link href={areasRoutes.create().url}>
                                                <Button variant="outline" className="mt-2">
                                                    <PlusCircle className="mr-2 h-4 w-4" />
                                                    Crear Área
                                                </Button>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                areas.data.map((area) => (
                                    <TableRow
                                        key={area.id}
                                        className="group hover:bg-muted/50 transition-colors"
                                    >
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-primary/10">
                                                    <Building className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{area.nombre}</div>
                                                    <Badge variant="outline" className="text-xs mt-1">
                                                        ID: {area.id}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <MapPin className="h-4 w-4" />
                                                <span className="truncate max-w-[200px]">
                                                    {area.ubicacion_fisica}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm text-muted-foreground">
                                                {new Date(area.created_at).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link
                                                                href={areasRoutes.edit({ area: area.id }).url}
                                                                className="cursor-pointer"
                                                            >
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                Editar
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <DropdownMenuItem
                                                                    className="text-destructive focus:text-destructive cursor-pointer"
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Eliminar
                                                                </DropdownMenuItem>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>
                                                                        ¿Eliminar área?
                                                                    </AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Esta acción no se puede deshacer. Se eliminará permanentemente
                                                                        el área "{area.nombre}" y toda su información asociada.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                    <Link
                                                                        href={areasRoutes.destroy({ area: area.id }).url}
                                                                        method="delete"
                                                                        as="button"
                                                                        preserveScroll
                                                                    >
                                                                        <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                                                            Eliminar
                                                                        </AlertDialogAction>
                                                                    </Link>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Paginación mejorada */}
                {areas.last_page > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border rounded-xl bg-muted/20">
                        <div className="text-sm text-muted-foreground">
                            <span className="font-medium">{areas.total}</span> áreas en total •
                            Mostrando <span className="font-medium">{areas.from}-{areas.to}</span>
                        </div>
                        <Pagination
                            links={areas.links}
                        />
                        <div className="text-sm text-muted-foreground">
                            Página <span className="font-medium">{areas.current_page}</span> de{" "}
                            <span className="font-medium">{areas.last_page}</span>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="border rounded-xl p-4 bg-gradient-to-r from-primary/5 to-transparent">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="h-5 w-5 text-primary" />
                            <div>
                                <h3 className="font-medium">Acciones rápidas</h3>
                                <p className="text-sm text-muted-foreground">
                                    Gestiona tus áreas de forma eficiente
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">

                            <Button variant="outline" className="gap-2">
                                <Filter className="h-4 w-4" />
                                Filtrar activos
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}