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
import {
    PlusCircle,
    Pencil,
    Trash2,
    Cpu,
    HardDrive,
    MemoryStick,
    Monitor,
    Globe,
    Server,
    Smartphone,
    Search,
    Filter,
    Download,
    MoreVertical,
    AlertTriangle,
    ExternalLink,
    Gauge,
    Check
} from 'lucide-react';
import { useState, useMemo } from 'react';
import pcDetails from '@/routes/pc-details';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface HardwareAsset {
    id: number;
    tipo: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    estado: string;
    area?: {
        nombre: string;
    };
}

interface PcDetail {
    id: number;
    asset_id: number;
    cpu: string;
    ram_gb: number;
    almacenamiento: string;
    sistema_operativo: string;
    anydesk_id?: string;
    teamviewer_id?: string;
    hardware_asset?: HardwareAsset;
    ip_address?: string;
    mac_address?: string;
    disco_duro_extra?: string;
    tarjeta_video?: string;
    fecha_instalacion_so?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Especificaciones Técnicas',
        href: pcDetails.index().url,
    },
];

export default function PcDetailIndex({ details }: { details: PcDetail[] }) {
    // State for filtering
    const [search, setSearch] = useState('');
    const [currentTab, setCurrentTab] = useState('all');
    const [selectedOS, setSelectedOS] = useState<string[]>([]);

    // Calcular estadísticas (globales)
    const totalPCs = details.length;
    const totalRAM = details.reduce((sum, detail) => sum + (detail.ram_gb || 0), 0);
    const avgRAM = totalPCs > 0 ? Math.round(totalRAM / totalPCs) : 0;

    // Get unique OS list for filter
    const uniqueOS = Array.from(new Set(details.map(d => d.sistema_operativo).filter(Boolean))).sort();

    const osCounts = details.reduce((acc, detail) => {
        const os = detail.sistema_operativo || 'Desconocido';
        acc[os] = (acc[os] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Filter Logic
    const filteredDetails = useMemo(() => {
        return details.filter((detail) => {
            // 1. Search Filter
            const searchLower = search.toLowerCase();
            const matchesSearch =
                detail.hardware_asset?.marca?.toLowerCase().includes(searchLower) ||
                detail.hardware_asset?.modelo?.toLowerCase().includes(searchLower) ||
                detail.hardware_asset?.numero_serie?.toLowerCase().includes(searchLower) ||
                detail.cpu?.toLowerCase().includes(searchLower) ||
                detail.ip_address?.toLowerCase().includes(searchLower) ||
                detail.hardware_asset?.area?.nombre?.toLowerCase().includes(searchLower);

            if (!matchesSearch) return false;

            // 2. Tab Filter
            if (currentTab === 'operativos' && detail.hardware_asset?.estado !== 'Operativo') return false;
            if (currentTab === 'mantenimiento' && detail.hardware_asset?.estado !== 'En Mantenimiento') return false;
            if (currentTab === 'servidores' && detail.hardware_asset?.tipo !== 'Servidor') return false;

            // 3. OS Filter
            if (selectedOS.length > 0 && !selectedOS.includes(detail.sistema_operativo)) return false;

            return true;
        });
    }, [details, search, currentTab, selectedOS]);

    const toggleOS = (os: string) => {
        setSelectedOS(prev =>
            prev.includes(os) ? prev.filter(o => o !== os) : [...prev, os]
        );
    };

    const getOSColor = (os: string) => {
        const osLower = os.toLowerCase();
        // Windows
        if (osLower.includes('server')) return 'bg-teal-500/15 text-teal-700 border-teal-200';
        if (osLower.includes('windows 10')) return 'bg-blue-500/15 text-blue-700 border-blue-200';
        if (osLower.includes('windows 11')) return 'bg-sky-500/15 text-sky-700 border-sky-200';

        // Linux
        if (osLower.includes('ubuntu')) return 'bg-orange-500/15 text-orange-700 border-orange-200';
        if (osLower.includes('debian')) return 'bg-red-500/15 text-red-700 border-red-200';
        if (osLower.includes('centos')) return 'bg-yellow-500/15 text-yellow-700 border-yellow-200';
        if (osLower.includes('fedora')) return 'bg-blue-600/15 text-blue-800 border-blue-200';
        if (osLower.includes('linux')) return 'bg-slate-500/15 text-slate-700 border-slate-200';

        // Apple
        if (osLower.includes('macos') || osLower.includes('osx')) return 'bg-purple-500/15 text-purple-700 border-purple-200';

        return 'bg-gray-500/15 text-gray-700 border-gray-200';
    };

    const getStatusColor = (estado?: string) => {
        switch (estado?.toLowerCase()) {
            case 'operativo':
                return 'bg-emerald-500/15 text-emerald-700 border-emerald-200';
            case 'en mantenimiento':
                return 'bg-amber-500/15 text-amber-700 border-amber-200';
            case 'dañado':
                return 'bg-rose-500/15 text-rose-700 border-rose-200';
            case 'baja':
                return 'bg-slate-500/15 text-slate-700 border-slate-200';
            default:
                return 'bg-indigo-500/15 text-indigo-700 border-indigo-200';
        }
    };

    const getAssetTypeColor = (tipo?: string) => {
        switch (tipo?.toLowerCase()) {
            case 'laptop':
                return 'bg-violet-500/10 text-violet-700';
            case 'servidor':
                return 'bg-slate-800/5 text-slate-700';
            case 'pc':
            case 'escritorio':
                return 'bg-cyan-500/10 text-cyan-700';
            default:
                return 'bg-gray-500/10 text-gray-700';
        }
    };

    const getAssetIcon = (tipo?: string) => {
        switch (tipo?.toLowerCase()) {
            case 'laptop':
                return <Smartphone className="h-4 w-4" />;
            case 'servidor':
                return <Server className="h-4 w-4" />;
            case 'pc':
            case 'escritorio':
            default:
                return <Monitor className="h-4 w-4" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Especificaciones Técnicas de Equipos" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header con gradiente */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border border-indigo-100 dark:border-indigo-900/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Especificaciones Técnicas
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Gestión de configuraciones de equipos PC/Laptops/Servidores
                            </p>
                        </div>
                        <Link href={pcDetails.create().url}>
                            <Button className="gap-2 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0">
                                <PlusCircle className="h-4 w-4" />
                                Agregar Detalles
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4">

                    {/* Stats Cards con gradientes vibrantes */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                            <CardContent className="pt-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-white/90">Total de Equipos</p>
                                        <p className="text-3xl font-bold mt-1 text-white">{totalPCs}</p>
                                    </div>
                                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                        <Server className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                            <CardContent className="pt-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-white/90">RAM Total</p>
                                        <p className="text-3xl font-bold mt-1 text-white">{totalRAM} GB</p>
                                    </div>
                                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                        <MemoryStick className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                            <CardContent className="pt-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-white/90">RAM Promedio</p>
                                        <p className="text-3xl font-bold mt-1 text-white">{avgRAM} GB</p>
                                    </div>
                                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                        <Gauge className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Barra de búsqueda con estilo mejorado */}
                        <Card className="border-2 border-orange-200 dark:border-orange-900 shadow-lg">
                            <CardContent className="pt-6">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-500" />
                                    <Input
                                        placeholder="Buscar equipos..."
                                        className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabs y Filtros */}
                    <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                            <TabsList>
                                <TabsTrigger value="all">Todos ({totalPCs})</TabsTrigger>
                                <TabsTrigger value="operativos">Operativos</TabsTrigger>
                                <TabsTrigger value="mantenimiento">En Mantenimiento</TabsTrigger>
                                <TabsTrigger value="servidores">Servidores</TabsTrigger>
                            </TabsList>
                            <div className="flex gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="gap-2">
                                            <Filter className="h-4 w-4" />
                                            Filtros {selectedOS.length > 0 && `(${selectedOS.length})`}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <div className="p-2 text-xs font-semibold text-muted-foreground uppercase">
                                            Sistema Operativo
                                        </div>
                                        {uniqueOS.map((os) => (
                                            <DropdownMenuItem key={os} onSelect={(e) => {
                                                e.preventDefault();
                                                toggleOS(os);
                                            }}>
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-4 h-4 border rounded flex items-center justify-center ${selectedOS.includes(os) ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                                                        {selectedOS.includes(os) && <Check className="h-3 w-3" />}
                                                    </div>
                                                    <span>{os}</span>
                                                </div>
                                            </DropdownMenuItem>
                                        ))}
                                        {selectedOS.length > 0 && (
                                            <>
                                                <div className="h-px bg-border my-1" />
                                                <DropdownMenuItem
                                                    className="justify-center text-destructive focus:text-destructive"
                                                    onSelect={() => setSelectedOS([])}
                                                >
                                                    Limpiar filtros
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <a href={pcDetails.export().url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="gap-2">
                                        <Download className="h-4 w-4" />
                                        Exportar
                                    </Button>
                                </a>
                            </div>
                        </div>

                        <TabsContent value={currentTab} className="space-y-4 mt-0">
                            {/* Distribución de SO (Solo visible en 'all') */}
                            {currentTab === 'all' && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Distribución de Sistemas Operativos</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {Object.entries(osCounts).map(([os, count]) => (
                                                <div key={os} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Badge className={getOSColor(os)}>
                                                            {os}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm font-medium">{count}</span>
                                                        <Progress
                                                            value={(count / totalPCs) * 100}
                                                            className="w-24"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Tabla de Equipos */}
                            <Card className="border shadow-sm overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-muted/50">
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead className="font-semibold">Equipo</TableHead>
                                            <TableHead className="font-semibold">Procesador</TableHead>
                                            <TableHead className="font-semibold">Memoria</TableHead>
                                            <TableHead className="font-semibold">Almacenamiento</TableHead>
                                            <TableHead className="font-semibold">Conexión Remota</TableHead>
                                            <TableHead className="font-semibold text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredDetails.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-12">
                                                    <div className="flex flex-col items-center justify-center gap-3">
                                                        <div className="p-4 rounded-full bg-muted">
                                                            <Search className="h-8 w-8 text-muted-foreground" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <h3 className="font-semibold">No se encontraron resultados</h3>
                                                            <p className="text-sm text-muted-foreground">
                                                                Intenta ajustar tus filtros o búsqueda
                                                            </p>
                                                        </div>
                                                        {(search || selectedOS.length > 0) && (
                                                            <Button
                                                                variant="outline"
                                                                className="mt-2"
                                                                onClick={() => {
                                                                    setSearch('');
                                                                    setSelectedOS([]);
                                                                    setCurrentTab('all');
                                                                }}
                                                            >
                                                                Limpiar filtros
                                                            </Button>
                                                        )}
                                                        {details.length === 0 && (
                                                            <Link href={pcDetails.create().url}>
                                                                <Button variant="outline" className="mt-2">
                                                                    <PlusCircle className="mr-2 h-4 w-4" />
                                                                    Agregar Primer Equipo
                                                                </Button>
                                                            </Link>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredDetails.map((detail) => (
                                                <TableRow
                                                    key={detail.id}
                                                    className="group hover:bg-muted/50 transition-colors"
                                                >
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-2 rounded-lg ${getAssetTypeColor(detail.hardware_asset?.tipo)}`}>
                                                                {getAssetIcon(detail.hardware_asset?.tipo)}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium">
                                                                    {detail.hardware_asset?.marca} {detail.hardware_asset?.modelo}
                                                                </div>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <Badge variant="outline" className="text-xs">
                                                                        S/N: {detail.hardware_asset?.numero_serie}
                                                                    </Badge>
                                                                    {detail.hardware_asset?.estado && (
                                                                        <Badge className={`${getStatusColor(detail.hardware_asset.estado)} text-xs`}>
                                                                            {detail.hardware_asset.estado}
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Cpu className="h-4 w-4 text-muted-foreground" />
                                                            <span className="font-medium">{detail.cpu}</span>
                                                        </div>
                                                        {detail.sistema_operativo && (
                                                            <Badge className={`${getOSColor(detail.sistema_operativo)} mt-1 text-xs`}>
                                                                {detail.sistema_operativo}
                                                            </Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <MemoryStick className="h-4 w-4 text-muted-foreground" />
                                                            <div>
                                                                <span className="font-bold">{detail.ram_gb} GB</span>
                                                                <span className="text-xs text-muted-foreground ml-1">RAM</span>
                                                            </div>
                                                        </div>
                                                        {detail.ip_address && (
                                                            <div className="text-xs text-muted-foreground mt-1">
                                                                IP: {detail.ip_address}
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <HardDrive className="h-4 w-4 text-muted-foreground" />
                                                            <span>{detail.almacenamiento}</span>
                                                        </div>
                                                        {detail.disco_duro_extra && (
                                                            <div className="text-xs text-muted-foreground mt-1">
                                                                Extra: {detail.disco_duro_extra}
                                                            </div>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="space-y-1">
                                                            {detail.anydesk_id && (
                                                                <div className="flex items-center gap-2 text-sm">
                                                                    <Globe className="h-3 w-3" />
                                                                    <span className="font-mono">{detail.anydesk_id}</span>
                                                                </div>
                                                            )}
                                                            {detail.teamviewer_id && (
                                                                <div className="flex items-center gap-2 text-sm">
                                                                    <ExternalLink className="h-3 w-3" />
                                                                    <span className="font-mono">{detail.teamviewer_id}</span>
                                                                </div>
                                                            )}
                                                            {!detail.anydesk_id && !detail.teamviewer_id && (
                                                                <Badge variant="outline" className="text-xs">
                                                                    Sin acceso remoto
                                                                </Badge>
                                                            )}
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
                                                                            href={pcDetails.edit({ pc_detail: detail.id }).url}
                                                                            className="cursor-pointer"
                                                                        >
                                                                            <Pencil className="mr-2 h-4 w-4" />
                                                                            Editar Detalles
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem asChild>
                                                                        <Link
                                                                            href={`/hardware-assets/${detail.asset_id}`}
                                                                            className="cursor-pointer"
                                                                        >
                                                                            <Monitor className="mr-2 h-4 w-4" />
                                                                            Ver Activo
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
                                                                                    ¿Eliminar detalles técnicos?
                                                                                </AlertDialogTitle>
                                                                                <AlertDialogDescription>
                                                                                    Esta acción eliminará las especificaciones técnicas de
                                                                                    "{detail.hardware_asset?.marca} {detail.hardware_asset?.modelo}".
                                                                                    El activo principal no se verá afectado.
                                                                                </AlertDialogDescription>
                                                                            </AlertDialogHeader>
                                                                            <AlertDialogFooter>
                                                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                                                <Link
                                                                                    href={pcDetails.destroy({ pc_detail: detail.id }).url}
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
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Quick Actions */}
                <Card className="bg-gradient-to-r from-primary/5 to-transparent border-dashed">
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="h-5 w-5 text-primary" />
                                <div>
                                    <h3 className="font-medium">Acciones Rápidas</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Realiza acciones masivas sobre los equipos
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <a href={pcDetails.export().url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="gap-2">
                                        <Download className="h-4 w-4" />
                                        Exportar Inventario
                                    </Button>
                                </a>
                                <a href={pcDetails.report().url} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="gap-2">
                                        <Server className="h-4 w-4" />
                                        Reporte de Hardware
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}