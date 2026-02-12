import { Head, Link } from '@inertiajs/react';
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
import { PlusCircle, Pencil, Trash2, Eye, Package, Cpu, Server, Monitor, HardDrive, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import hardwareAssets from '@/routes/hardware-assets';

interface Area {
    id: number;
    nombre: string;
}

interface HardwareAsset {
    id: number;
    uuid: string;
    tipo: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    estado: string;
    area_id: number;
    area?: Area;
    created_at: string;
    updated_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Hardware Assets',
        href: hardwareAssets.index().url,
    },
];

const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" | null | undefined => {
    switch (status) {
        case 'Operativo': return 'default'; // Success mapped to default (or add success variant to badge)
        case 'En Reparación': return 'secondary'; // Warning mapped to secondary
        case 'Baja': return 'destructive';
        case 'En Mantenimiento': return 'secondary';
        default: return 'outline';
    }
};

const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case 'computadora':
        case 'laptop':
        case 'pc': return <Cpu className="h-4 w-4" />;
        case 'servidor': return <Server className="h-4 w-4" />;
        case 'monitor': return <Monitor className="h-4 w-4" />;
        case 'almacenamiento':
        case 'disco duro': return <HardDrive className="h-4 w-4" />;
        default: return <Package className="h-4 w-4" />;
    }
};

export default function HardwareAssetIndex({ assets }: { assets: HardwareAsset[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAssets = assets.filter(asset =>
        asset.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.numero_serie.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.area?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.estado.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStats = () => {
        return {
            total: assets.length,
            operativos: assets.filter(a => a.estado === 'Operativo').length,
            enReparacion: assets.filter(a => a.estado === 'En Reparación').length,
            baja: assets.filter(a => a.estado === 'Baja').length,
        };
    };

    const stats = getStats();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hardware Assets" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header con gradiente */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-cyan-950/30 dark:via-blue-950/30 dark:to-indigo-950/30 border border-cyan-100 dark:border-cyan-900/50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                                Inventario de Hardware
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Gestione todos los activos de hardware de la organización
                            </p>
                        </div>
                        <Link href={hardwareAssets.create().url}>
                            <Button className="gap-2 shadow-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 border-0">
                                <PlusCircle className="h-4 w-4" />
                                Nuevo Activo
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4">

                    {/* Stats Cards con gradientes vibrantes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-500 to-gray-500 text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                            <CardContent className="pt-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-white/90">Total Activos</p>
                                        <p className="text-3xl font-bold mt-1 text-white">{stats.total}</p>
                                    </div>
                                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                        <Package className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                            <CardContent className="pt-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-white/90">Operativos</p>
                                        <p className="text-3xl font-bold mt-1 text-white">{stats.operativos}</p>
                                    </div>
                                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                        <div className="h-6 w-6 bg-white rounded-full"></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                            <CardContent className="pt-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-white/90">En Reparación</p>
                                        <p className="text-3xl font-bold mt-1 text-white">{stats.enReparacion}</p>
                                    </div>
                                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                        <div className="h-6 w-6 bg-white rounded-full"></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-rose-500 text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                            <CardContent className="pt-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-white/90">De Baja</p>
                                        <p className="text-3xl font-bold mt-1 text-white">{stats.baja}</p>
                                    </div>
                                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                        <div className="h-6 w-6 bg-white rounded-full"></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Search and Table Section */}
                <Card className="border shadow-sm">
                    <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <CardTitle className="text-xl">Activos Registrados</CardTitle>
                                <CardDescription>
                                    {filteredAssets.length === assets.length
                                        ? `${assets.length} activos en total`
                                        : `${filteredAssets.length} de ${assets.length} activos filtrados`
                                    }
                                </CardDescription>
                            </div>
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar activos..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 h-11"
                                />
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader className="bg-muted/30">
                                    <TableRow>
                                        <TableHead className="font-semibold w-[140px]">Tipo</TableHead>
                                        <TableHead className="font-semibold">Marca / Modelo</TableHead>
                                        <TableHead className="font-semibold hidden md:table-cell">N° Serie</TableHead>
                                        <TableHead className="font-semibold">Ubicación</TableHead>
                                        <TableHead className="font-semibold">Estado</TableHead>
                                        <TableHead className="font-semibold text-right w-[150px]">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredAssets.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center h-64">
                                                <div className="flex flex-col items-center justify-center gap-3">
                                                    <div className="p-4 bg-muted rounded-full">
                                                        <Package className="h-8 w-8 text-muted-foreground" />
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-semibold">No se encontraron activos</p>
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            {searchTerm
                                                                ? "Intente con otros términos de búsqueda"
                                                                : "Comience agregando un nuevo activo de hardware"
                                                            }
                                                        </p>
                                                    </div>
                                                    {!searchTerm && (
                                                        <Link href={hardwareAssets.create().url}>
                                                            <Button variant="outline" className="mt-2 gap-2">
                                                                <PlusCircle className="h-4 w-4" />
                                                                Agregar primer activo
                                                            </Button>
                                                        </Link>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredAssets.map((asset) => (
                                            <TableRow key={asset.id} className="hover:bg-muted/30 transition-colors">
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className="p-1.5 bg-muted rounded">
                                                            {getTypeIcon(asset.tipo)}
                                                        </div>
                                                        <span className="font-medium">{asset.tipo}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{asset.marca}</span>
                                                        <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                                                            {asset.modelo}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    <div className="font-mono text-sm bg-muted/30 px-2 py-1 rounded inline-block">
                                                        {asset.numero_serie || 'N/A'}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{asset.area?.nombre || 'Sin asignar'}</span>
                                                        {asset.area && (
                                                            <span className="text-xs text-muted-foreground">
                                                                ID: {asset.area_id}
                                                            </span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={getStatusBadgeVariant(asset.estado)}
                                                        className="font-medium capitalize"
                                                    >
                                                        {asset.estado}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex justify-end gap-1">
                                                        <Link href={hardwareAssets.show({ hardware_asset: asset.id }).url}>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-9 w-9 hover:bg-blue-50 hover:text-blue-600"
                                                                title="Ver detalles"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={hardwareAssets.edit({ hardware_asset: asset.id }).url}>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-9 w-9 hover:bg-green-50 hover:text-green-600"
                                                                title="Editar"
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link
                                                            href={hardwareAssets.destroy({ hardware_asset: asset.id }).url}
                                                            method="delete"
                                                            as="button"
                                                            preserveScroll
                                                            className="inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                                            title="Eliminar"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Link>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer Info */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
                    <p>
                        Mostrando <span className="font-semibold">{filteredAssets.length}</span> de{" "}
                        <span className="font-semibold">{assets.length}</span> activos
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span>Operativo</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                            <span>En Reparación</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                            <span>De Baja</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}