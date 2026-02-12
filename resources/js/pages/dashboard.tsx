import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    TrendingUp,
    Package,
    Wrench,
    AlertTriangle,
    Building,
    PlusCircle,
    Monitor,
    MapPin,
    Calendar,
    Activity,
    CheckCircle2,
    Clock
} from 'lucide-react';
import areasRoutes from '@/routes/areas';
import hardwareAssetsRoutes from '@/routes/hardware-assets';
import maintenancesRoutes from '@/routes/maintenances';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Stats {
    totalAssets: number;
    operationalAssets: number;
    assetsInRepair: number;
    totalMaintenances: number;
    totalAreas: number;
    totalPcDetails: number;
    operationalPercentage: number;
}

interface Charts {
    hardwareByStatus: Record<string, number>;
    assetsByArea: Record<string, number>;
    maintenancesByMonth: Record<string, number>;
}

interface Maintenance {
    id: number;
    descripcion: string;
    fecha_servicio: string;
    tecnico: string;
    hardware_asset: {
        id: number;
        marca: string;
        modelo: string;
        area?: {
            id: number;
            nombre: string;
        };
    };
}

interface DashboardProps {
    stats: Stats;
    charts: Charts;
    recentMaintenances: Maintenance[];
}

export default function Dashboard({ stats, charts, recentMaintenances }: DashboardProps) {
    const currentDate = new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                {/* Header con gradiente */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-violet-950/30 dark:via-purple-950/30 dark:to-fuchsia-950/30 border border-violet-100 dark:border-violet-900/50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                                Panel de Control
                            </h1>
                            <p className="text-muted-foreground mt-1 flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {currentDate}
                            </p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <Link href={maintenancesRoutes.create().url}>
                                <Button className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 border-0">
                                    <Wrench className="h-4 w-4" />
                                    Nuevo Mantenimiento
                                </Button>
                            </Link>
                            <Link href={hardwareAssetsRoutes.create().url}>
                                <Button variant="outline" className="gap-2 border-violet-200 hover:bg-violet-50">
                                    <Monitor className="h-4 w-4" />
                                    Nuevo Activo
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Total Assets */}
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-white/90">Total Activos</CardTitle>
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Package className="h-5 w-5 text-white" />
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-white">{stats.totalAssets}</div>
                            <p className="text-xs text-white/80 mt-1">Hardware registrado</p>
                        </CardContent>
                    </Card>

                    {/* Operational Assets */}
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-white/90">Operativos</CardTitle>
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <CheckCircle2 className="h-5 w-5 text-white" />
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-white">{stats.operationalAssets}</div>
                            <p className="text-xs text-white/80 mt-1">{stats.operationalPercentage}% del total</p>
                        </CardContent>
                    </Card>

                    {/* Total Maintenances */}
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-white/90">Mantenimientos</CardTitle>
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Wrench className="h-5 w-5 text-white" />
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-white">{stats.totalMaintenances}</div>
                            <p className="text-xs text-white/80 mt-1">Servicios realizados</p>
                        </CardContent>
                    </Card>

                    {/* Assets in Repair */}
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-white/90">En Reparación</CardTitle>
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <AlertTriangle className="h-5 w-5 text-white" />
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-bold text-white">{stats.assetsInRepair}</div>
                            <p className="text-xs text-white/80 mt-1">Requieren atención</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts and Activity */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Hardware Status Distribution */}
                    <Card className="border shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-primary" />
                                Estado del Hardware
                            </CardTitle>
                            <CardDescription>Distribución por estado operativo</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {Object.entries(charts.hardwareByStatus).map(([status, count]) => {
                                    const total = stats.totalAssets;
                                    const percentage = total > 0 ? (count / total) * 100 : 0;
                                    const colors: Record<string, string> = {
                                        'Operativo': 'bg-green-500',
                                        'En Reparación': 'bg-orange-500',
                                        'De Baja': 'bg-red-500',
                                    };
                                    return (
                                        <div key={status} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="font-medium">{status}</span>
                                                <span className="text-muted-foreground">{count} ({percentage.toFixed(1)}%)</span>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${colors[status] || 'bg-gray-500'} transition-all`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Maintenances by Month */}
                    <Card className="border shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                Mantenimientos Mensuales
                            </CardTitle>
                            <CardDescription>Últimos 6 meses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {Object.keys(charts.maintenancesByMonth).length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                        <p>No hay datos de mantenimientos</p>
                                    </div>
                                ) : (
                                    Object.entries(charts.maintenancesByMonth).map(([month, count]) => {
                                        const maxCount = Math.max(...Object.values(charts.maintenancesByMonth));
                                        const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                                        const monthName = new Date(month + '-01').toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
                                        return (
                                            <div key={month} className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="font-medium capitalize">{monthName}</span>
                                                    <span className="text-muted-foreground">{count} servicios</span>
                                                </div>
                                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all"
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Maintenances */}
                <Card className="border shadow-lg">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-primary" />
                                    Actividad Reciente
                                </CardTitle>
                                <CardDescription>Últimos mantenimientos realizados</CardDescription>
                            </div>
                            <Link href={maintenancesRoutes.index().url}>
                                <Button variant="outline" size="sm">Ver todos</Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentMaintenances.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Wrench className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>No hay mantenimientos registrados</p>
                                </div>
                            ) : (
                                recentMaintenances.map((maintenance) => (
                                    <div key={maintenance.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                                        <div className="p-2 bg-primary/10 rounded-lg">
                                            <Wrench className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">{maintenance.hardware_asset.marca} {maintenance.hardware_asset.modelo}</p>
                                                <Badge className="bg-violet-100 text-violet-700 border-violet-200">
                                                    {maintenance.tecnico}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-1">{maintenance.descripcion}</p>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(maintenance.fecha_servicio).toLocaleDateString('es-ES')}
                                                </span>
                                                {maintenance.hardware_asset.area && (
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {maintenance.hardware_asset.area.nombre}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Áreas Registradas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold">{stats.totalAreas}</div>
                                <Building className="h-8 w-8 text-blue-500/40" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-purple-500">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Detalles de PC</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold">{stats.totalPcDetails}</div>
                                <Monitor className="h-8 w-8 text-purple-500/40" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-500">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Tasa Operativa</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold">{stats.operationalPercentage}%</div>
                                <TrendingUp className="h-8 w-8 text-green-500/40" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
