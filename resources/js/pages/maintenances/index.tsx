import { Head, Link, router } from '@inertiajs/react';
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
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    PlusCircle,
    Pencil,
    Trash2,
    Calendar,
    Wrench,
    Search,
    History,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import maintenancesRoutes from '@/routes/maintenances';
import { format, isPast, isToday, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface HardwareAsset {
    id: number;
    tipo: string;
    marca: string;
    modelo: string;
    numero_serie: string;
}

interface Maintenance {
    id: number;
    asset_id: number;
    fecha_servicio: string;
    tecnico: string;
    descripcion: string;
    proximo_mantenimiento?: string;
    hardware_asset?: HardwareAsset;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mantenimientos',
        href: maintenancesRoutes.index().url,
    },
];

export default function MaintenanceIndex({ maintenances }: { maintenances: Maintenance[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMaintenances = maintenances.filter(m =>
        m.tecnico?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.hardware_asset?.modelo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.hardware_asset?.numero_serie?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        return format(new Date(dateString), 'dd MMM yyyy', { locale: es });
    };

    const getStatusBadge = (dateStr?: string) => {
        if (!dateStr) return null;
        const date = parseISO(dateStr);
        if (isPast(date) && !isToday(date)) {
            return <Badge variant="destructive" className="bg-gradient-to-r from-red-500 to-rose-500 text-white border-0 shadow-sm">⚠️ Vencido</Badge>;
        }
        if (isToday(date)) {
            return <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 shadow-sm">🔔 Hoy</Badge>;
        }
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-sm">✓ Programado</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Mantenimientos" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 max-w-[1600px] w-full mx-auto">
                {/* Header con gradiente */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 border border-blue-100 dark:border-blue-900/50">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Registro de Mantenimientos
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Historial y planificación de servicios técnicos
                        </p>
                    </div>
                    <Link href={maintenancesRoutes.create().url}>
                        <Button className="gap-2 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0">
                            <PlusCircle className="h-4 w-4" />
                            Nuevo Mantenimiento
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards con colores vibrantes */}
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Card 1 - Azul */}
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-white/90">Total Servicios</CardTitle>
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <History className="h-5 w-5 text-white" />
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-white">{maintenances.length}</div>
                            <p className="text-xs text-white/80 mt-1">Registros históricos</p>
                        </CardContent>
                    </Card>

                    {/* Card 2 - Naranja */}
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-white/90">Mantenimientos Próximos</CardTitle>
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Calendar className="h-5 w-5 text-white" />
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-white">
                                {maintenances.filter(m => m.proximo_mantenimiento && !isPast(parseISO(m.proximo_mantenimiento))).length}
                            </div>
                            <p className="text-xs text-white/80 mt-1">Pendientes de realizar</p>
                        </CardContent>
                    </Card>

                    {/* Card 3 - Verde */}
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-white/90">Último Mes</CardTitle>
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <CheckCircle2 className="h-5 w-5 text-white" />
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-white">
                                {maintenances.filter(m => {
                                    const d = parseISO(m.fecha_servicio);
                                    const now = new Date();
                                    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                                }).length}
                            </div>
                            <p className="text-xs text-white/80 mt-1">Realizados este mes</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    {/* Barra de búsqueda mejorada */}
                    <div className="flex items-center gap-2 max-w-sm">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-500" />
                            <Input
                                placeholder="Buscar por técnico, activo, serie..."
                                className="pl-10 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Tabla con mejor diseño */}
                    <div className="rounded-xl border border-gray-200 bg-card shadow-sm overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700">
                                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Fecha Servicio</TableHead>
                                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Activo Intervenido</TableHead>
                                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Técnico / Descripción</TableHead>
                                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Próx. Mantenimiento</TableHead>
                                    <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMaintenances.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                            No se encontraron registros.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredMaintenances.map((maintenance) => (
                                        <TableRow key={maintenance.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors">
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium flex items-center gap-2">
                                                        <div className="p-1.5 bg-blue-100 dark:bg-blue-900 rounded-md">
                                                            <Calendar className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                                        </div>
                                                        {formatDate(maintenance.fecha_servicio)}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground ml-8">
                                                        ID: {maintenance.id}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">
                                                        {maintenance.hardware_asset?.marca} {maintenance.hardware_asset?.modelo}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Badge
                                                            variant="outline"
                                                            className="text-[10px] h-5 px-1.5 py-0 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                                                        >
                                                            {maintenance.hardware_asset?.tipo}
                                                        </Badge>
                                                        {maintenance.hardware_asset?.numero_serie}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col max-w-[300px]">
                                                    <span className="font-medium flex items-center gap-2">
                                                        <div className="p-1.5 bg-orange-100 dark:bg-orange-900 rounded-md">
                                                            <Wrench className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                                                        </div>
                                                        {maintenance.tecnico}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground truncate ml-8" title={maintenance.descripcion}>
                                                        {maintenance.descripcion}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {maintenance.proximo_mantenimiento ? (
                                                    <div className="flex flex-col gap-1 items-start">
                                                        <span className="text-sm font-medium flex items-center gap-2">
                                                            {formatDate(maintenance.proximo_mantenimiento)}
                                                        </span>
                                                        {getStatusBadge(maintenance.proximo_mantenimiento)}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground text-xs italic">No programado</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={maintenancesRoutes.edit({ maintenance: maintenance.id }).url}>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900 dark:hover:text-blue-400 transition-all"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400 transition-all"
                                                        onClick={() => {
                                                            if (confirm('¿Confirmar eliminación del registro?')) {
                                                                router.delete(maintenancesRoutes.destroy({ maintenance: maintenance.id }).url)
                                                            }
                                                        }}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
