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
    AlertCircle,
    CheckCircle2,
    ArrowLeft
} from 'lucide-react';
import maintenancesRoutes from '@/routes/maintenances';
import { format, isPast, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { parseLocalDate } from '@/lib/utils';

interface HardwareAsset {
    id: number;
    tipo: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    area?: {
        id: number;
        nombre: string;
    };
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
    {
        title: 'Próximos',
        href: '#',
    },
];

export default function UpcomingMaintenances({ maintenances }: { maintenances: Maintenance[] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMaintenances = maintenances.filter(m =>
        m.tecnico?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.hardware_asset?.modelo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.hardware_asset?.numero_serie?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        return format(parseLocalDate(dateString), 'dd MMM yyyy', { locale: es });
    };

    const getStatusBadge = (dateStr?: string) => {
        if (!dateStr) return null;
        const date = parseLocalDate(dateStr);
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
            <Head title="Mantenimientos Próximos" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 max-w-[1600px] w-full mx-auto">
                {/* Header con gradiente */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/30 dark:via-orange-950/30 dark:to-yellow-950/30 border border-orange-100 dark:border-orange-900/50">
                    <div className="flex items-center gap-4">
                        <Link href={maintenancesRoutes.index().url}>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                                Mantenimientos Próximos
                            </h1>
                            <p className="text-muted-foreground mt-1 text-sm">
                                Equipos que requieren atención pronto según su programación
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="outline" className="px-4 py-1.5 text-sm bg-white/50 backdrop-blur-sm border-orange-200 text-orange-700 font-bold">
                            {maintenances.length} Pendientes
                        </Badge>
                    </div>
                </div>

                {/* Info Alert */}
                <Card className="border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/10">
                    <CardContent className="py-4 flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-orange-500" />
                        <p className="text-sm text-orange-700 dark:text-orange-400">
                            Este listado muestra todos los activos cuyo <strong>próximo mantenimiento</strong> está programado para hoy o fechas futuras.
                        </p>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    {/* Barra de búsqueda */}
                    <div className="flex items-center gap-2 max-w-sm">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-orange-500" />
                            <Input
                                placeholder="Buscar equipo o técnico..."
                                className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Tabla */}
                    <div className="rounded-xl border border-gray-200 bg-card shadow-sm overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-700">
                                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Fecha Programada</TableHead>
                                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Activo / Ubicación</TableHead>
                                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Estado</TableHead>
                                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Último Servicio</TableHead>
                                    <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredMaintenances.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                            No hay mantenimientos programados pendientes.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredMaintenances.map((maintenance) => (
                                        <TableRow key={maintenance.id} className="hover:bg-orange-50/50 dark:hover:bg-orange-950/20 transition-colors">
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-bold flex items-center gap-2 text-orange-700 dark:text-orange-400">
                                                        <div className="p-1.5 bg-orange-100 dark:bg-orange-900 rounded-md">
                                                            <Calendar className="h-3.5 w-3.5" />
                                                        </div>
                                                        {formatDate(maintenance.proximo_mantenimiento!)}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">
                                                        {maintenance.hardware_asset?.marca} {maintenance.hardware_asset?.modelo}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Badge variant="outline" className="text-[10px] h-4 px-1 py-0">
                                                            S/N: {maintenance.hardware_asset?.numero_serie}
                                                        </Badge>
                                                        {maintenance.hardware_asset?.area?.nombre}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(maintenance.proximo_mantenimiento)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col text-xs">
                                                    <span className="text-muted-foreground">Realizado el {formatDate(maintenance.fecha_servicio)}</span>
                                                    <span className="font-medium">Por: {maintenance.tecnico}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={maintenancesRoutes.create({ query: { asset_id: maintenance.asset_id } }).url}>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="gap-1 border-orange-200 text-orange-700 hover:bg-orange-50"
                                                        >
                                                            <Wrench className="h-3 w-3" />
                                                            Registrar Nuevo
                                                        </Button>
                                                    </Link>
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
