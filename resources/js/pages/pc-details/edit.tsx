import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import pcDetails from '@/routes/pc-details';
import {
    ArrowLeft,
    Save,
    RefreshCw,
    Cpu,
    MemoryStick,
    HardDrive,
    Monitor,
    Globe,
    Network,
    Package,
    Shield,
    AlertCircle,
    CheckCircle2,
    History,
    Smartphone,
    Server,
    Database
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface HardwareAsset {
    id: number;
    tipo: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    estado: string;
}

interface PcDetail {
    id: number;
    asset_id: number;
    cpu: string;
    ram_gb: number;
    almacenamiento: string;
    sistema_operativo: string;
    mac_address?: string;
    anydesk_id?: string;
    teamviewer_id?: string;
    hardware_asset?: HardwareAsset;
    ip_address?: string;
    tarjeta_video?: string;
    fuente_poder?: string;
    motherboard?: string;
    disco_duro_extra?: string;
    observaciones?: string;
    tiene_garantia?: boolean;
    fecha_instalacion_so?: string;
}

export default function PcDetailEdit({ detail }: { detail: PcDetail }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Especificaciones',
            href: pcDetails.index().url,
        },
        {
            title: detail.hardware_asset?.modelo || 'Editar Detalles',
            href: '#',
        },
    ];

    const { data, setData, put, processing, errors, reset } = useForm({
        cpu: detail.cpu || '',
        ram_gb: detail.ram_gb || '',
        almacenamiento: detail.almacenamiento || '',
        sistema_operativo: detail.sistema_operativo || '',
        mac_address: detail.mac_address || '',
        anydesk_id: detail.anydesk_id || '',
        teamviewer_id: detail.teamviewer_id || '',
        ip_address: detail.ip_address || '',
        tarjeta_video: detail.tarjeta_video || '',
        fuente_poder: detail.fuente_poder || '',
        motherboard: detail.motherboard || '',
        disco_duro_extra: detail.disco_duro_extra || '',
        observaciones: detail.observaciones || '',
        tiene_garantia: detail.tiene_garantia || false,
        fecha_instalacion_so: detail.fecha_instalacion_so || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(pcDetails.update({ pc_detail: detail.id }).url, {
            onSuccess: () => {
                // Opcional: mostrar mensaje de éxito
            },
        });
    };

    const getAssetIcon = (tipo?: string) => {
        switch (tipo?.toLowerCase()) {
            case 'laptop':
                return <Smartphone className="h-5 w-5" />;
            case 'servidor':
                return <Server className="h-5 w-5" />;
            case 'pc':
            default:
                return <Monitor className="h-5 w-5" />;
        }
    };

    const getStatusColor = (estado?: string) => {
        switch (estado?.toLowerCase()) {
            case 'operativo':
                return 'bg-green-500/10 text-green-700 border-green-200';
            case 'en mantenimiento':
                return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
            case 'dañado':
                return 'bg-red-500/10 text-red-700 border-red-200';
            case 'baja':
                return 'bg-gray-500/10 text-gray-700 border-gray-200';
            default:
                return 'bg-blue-500/10 text-blue-700 border-blue-200';
        }
    };

    const sistemasOperativos = [
        'Windows 10 Pro',
        'Windows 11 Pro',
        'Windows 10 Home',
        'Windows 11 Home',
        'Ubuntu 22.04 LTS',
        'Ubuntu 20.04 LTS',
        'macOS Ventura',
        'macOS Monterey',
        'Debian 11',
        'CentOS 7',
        'Windows Server 2022',
        'Windows Server 2019',
    ];

    const tiposAlmacenamiento = [
        'SSD 240GB',
        'SSD 480GB',
        'SSD 1TB',
        'HDD 1TB',
        'HDD 2TB',
        'HDD 4TB',
        'NVMe 256GB',
        'NVMe 512GB',
        'NVMe 1TB',
        'SSD + HDD Combo',
    ];

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'No registrada';
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar: ${detail.hardware_asset?.modelo}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 max-w-6xl mx-auto w-full">
                {/* Header con gradiente */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 border border-blue-100 dark:border-blue-900/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Link href={pcDetails.index().url}>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/50">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Editar Especificaciones
                                </h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="font-mono bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                                        ID: {detail.id}
                                    </Badge>
                                    {detail.hardware_asset?.estado && (
                                        <Badge className={getStatusColor(detail.hardware_asset.estado)}>
                                            {detail.hardware_asset.estado}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => reset()}
                                variant="outline"
                                disabled={processing}
                                className="border-purple-200 hover:bg-purple-50"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Restablecer
                            </Button>
                            <Link href={`/hardware-assets/${detail.asset_id}`}>
                                <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                                    <Shield className="mr-2 h-4 w-4" />
                                    Ver Activo
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Información del Activo */}
                <Card className="border-l-4 border-l-primary">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-primary/10">
                                    {getAssetIcon(detail.hardware_asset?.tipo)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {detail.hardware_asset?.marca} {detail.hardware_asset?.modelo}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <Badge variant="outline" className="font-mono">
                                            S/N: {detail.hardware_asset?.numero_serie}
                                        </Badge>
                                        <Badge variant="outline">
                                            {detail.hardware_asset?.tipo}
                                        </Badge>
                                        {detail.mac_address && (
                                            <Badge variant="outline" className="font-mono">
                                                MAC: {detail.mac_address}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                                <p>ID del Activo: <span className="font-semibold">{detail.asset_id}</span></p>
                                <p>Última actualización: {formatDate(detail.updated_at)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Formulario Principal */}
                    <Card className="lg:col-span-2 border-l-4 border-l-primary">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Cpu className="h-5 w-5 text-primary" />
                                        Especificaciones Técnicas
                                    </CardTitle>
                                    <CardDescription>
                                        Actualiza los detalles del equipo
                                    </CardDescription>
                                </div>
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Package className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-8">
                                {/* Sección 1: Especificaciones Principales */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Database className="h-4 w-4 text-muted-foreground" />
                                        <h3 className="font-semibold">Configuración Principal</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <div>
                                                <Label htmlFor="cpu" className="flex items-center gap-2 mb-2">
                                                    <Cpu className="h-4 w-4" />
                                                    Procesador (CPU)
                                                </Label>
                                                <Input
                                                    id="cpu"
                                                    value={data.cpu}
                                                    onChange={(e) => setData('cpu', e.target.value)}
                                                    className={errors.cpu ? 'border-destructive' : ''}
                                                    placeholder="Ej: Intel Core i5-10400F @ 2.90GHz"
                                                    required
                                                />
                                                {errors.cpu && (
                                                    <div className="flex items-center gap-1 mt-1 text-destructive text-sm">
                                                        <AlertCircle className="h-3 w-3" />
                                                        {errors.cpu}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="ram_gb" className="flex items-center gap-2 mb-2">
                                                    <MemoryStick className="h-4 w-4" />
                                                    Memoria RAM (GB)
                                                </Label>
                                                <Input
                                                    id="ram_gb"
                                                    type="number"
                                                    value={data.ram_gb}
                                                    onChange={(e) => setData('ram_gb', Number(e.target.value))}
                                                    className={errors.ram_gb ? 'border-destructive' : ''}
                                                    required
                                                    min={1}
                                                    max={512}
                                                />
                                                {errors.ram_gb && (
                                                    <div className="flex items-center gap-1 mt-1 text-destructive text-sm">
                                                        <AlertCircle className="h-3 w-3" />
                                                        {errors.ram_gb}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <Label htmlFor="almacenamiento" className="flex items-center gap-2 mb-2">
                                                    <HardDrive className="h-4 w-4" />
                                                    Almacenamiento Principal
                                                </Label>
                                                <Select
                                                    onValueChange={(value) => setData('almacenamiento', value)}
                                                    value={data.almacenamiento}
                                                    required
                                                >
                                                    <SelectTrigger className={errors.almacenamiento ? 'border-destructive' : ''}>
                                                        <SelectValue placeholder="Selecciona tipo de almacenamiento" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {tiposAlmacenamiento.map((tipo) => (
                                                            <SelectItem key={tipo} value={tipo}>
                                                                {tipo}
                                                            </SelectItem>
                                                        ))}
                                                        <SelectItem value="otro">Otro</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {errors.almacenamiento && (
                                                    <div className="flex items-center gap-1 mt-1 text-destructive text-sm">
                                                        <AlertCircle className="h-3 w-3" />
                                                        {errors.almacenamiento}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="sistema_operativo" className="flex items-center gap-2 mb-2">
                                                    <Monitor className="h-4 w-4" />
                                                    Sistema Operativo
                                                </Label>
                                                <Select
                                                    onValueChange={(value) => setData('sistema_operativo', value)}
                                                    value={data.sistema_operativo}
                                                    required
                                                >
                                                    <SelectTrigger className={errors.sistema_operativo ? 'border-destructive' : ''}>
                                                        <SelectValue placeholder="Selecciona sistema operativo" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {sistemasOperativos.map((so) => (
                                                            <SelectItem key={so} value={so}>
                                                                {so}
                                                            </SelectItem>
                                                        ))}
                                                        <SelectItem value="otro">Otro sistema operativo</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {errors.sistema_operativo && (
                                                    <div className="flex items-center gap-1 mt-1 text-destructive text-sm">
                                                        <AlertCircle className="h-3 w-3" />
                                                        {errors.sistema_operativo}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Sección 2: Componentes Adicionales */}
                                <Tabs defaultValue="red" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="red">Red y Conexión</TabsTrigger>
                                        <TabsTrigger value="hardware">Hardware Extra</TabsTrigger>
                                        <TabsTrigger value="observaciones">Observaciones</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="red" className="space-y-4 pt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="mac_address" className="flex items-center gap-2">
                                                    <Network className="h-4 w-4" />
                                                    Dirección MAC
                                                </Label>
                                                <Input
                                                    id="mac_address"
                                                    placeholder="AA:BB:CC:DD:EE:FF"
                                                    value={data.mac_address}
                                                    onChange={(e) => setData('mac_address', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="ip_address" className="flex items-center gap-2">
                                                    <Globe className="h-4 w-4" />
                                                    Dirección IP
                                                </Label>
                                                <Input
                                                    id="ip_address"
                                                    placeholder="192.168.1.100"
                                                    value={data.ip_address}
                                                    onChange={(e) => setData('ip_address', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="anydesk_id">AnyDesk ID</Label>
                                                <Input
                                                    id="anydesk_id"
                                                    placeholder="123 456 789"
                                                    value={data.anydesk_id}
                                                    onChange={(e) => setData('anydesk_id', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="teamviewer_id">TeamViewer ID</Label>
                                                <Input
                                                    id="teamviewer_id"
                                                    placeholder="1234 5678 90"
                                                    value={data.teamviewer_id}
                                                    onChange={(e) => setData('teamviewer_id', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="hardware" className="space-y-4 pt-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="tarjeta_video">Tarjeta de Video</Label>
                                                <Input
                                                    id="tarjeta_video"
                                                    placeholder="Ej: NVIDIA GTX 1650"
                                                    value={data.tarjeta_video}
                                                    onChange={(e) => setData('tarjeta_video', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="fuente_poder">Fuente de Poder</Label>
                                                <Input
                                                    id="fuente_poder"
                                                    placeholder="Ej: 500W 80 Plus Bronze"
                                                    value={data.fuente_poder}
                                                    onChange={(e) => setData('fuente_poder', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="motherboard">Placa Madre</Label>
                                                <Input
                                                    id="motherboard"
                                                    placeholder="Ej: ASUS PRIME B460M-A"
                                                    value={data.motherboard}
                                                    onChange={(e) => setData('motherboard', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="disco_duro_extra">Almacenamiento Secundario</Label>
                                                <Input
                                                    id="disco_duro_extra"
                                                    placeholder="Ej: HDD 1TB"
                                                    value={data.disco_duro_extra}
                                                    onChange={(e) => setData('disco_duro_extra', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="observaciones" className="space-y-4 pt-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="observaciones">Observaciones</Label>
                                            <Textarea
                                                id="observaciones"
                                                placeholder="Notas adicionales, problemas conocidos, configuración especial..."
                                                value={data.observaciones}
                                                onChange={(e) => setData('observaciones', e.target.value)}
                                                rows={4}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                                                <div>
                                                    <Label htmlFor="tiene_garantia" className="font-medium">
                                                        ¿Tiene garantía activa?
                                                    </Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        Marca si el equipo aún está en período de garantía
                                                    </p>
                                                </div>
                                                <Switch
                                                    id="tiene_garantia"
                                                    checked={data.tiene_garantia}
                                                    onCheckedChange={(checked) => setData('tiene_garantia', checked)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="fecha_instalacion_so">Fecha de Instalación SO</Label>
                                                <Input
                                                    id="fecha_instalacion_so"
                                                    type="date"
                                                    value={data.fecha_instalacion_so}
                                                    onChange={(e) => setData('fecha_instalacion_so', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>

                                {/* Botón de Envío */}
                                <div className="flex justify-end gap-3 pt-6 border-t">
                                    <Link href={pcDetails.index().url}>
                                        <Button type="button" variant="outline" disabled={processing}>
                                            Cancelar
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="min-w-[180px] gap-2 shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                Actualizando...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4" />
                                                Guardar Cambios
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Panel Lateral */}
                    <div className="space-y-6">
                        {/* Información del Activo */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Información del Activo</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground">Tipo de Equipo</p>
                                    <div className="flex items-center gap-2">
                                        {getAssetIcon(detail.hardware_asset?.tipo)}
                                        <span className="font-medium">{detail.hardware_asset?.tipo}</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground">Estado</p>
                                    <Badge className={getStatusColor(detail.hardware_asset?.estado)}>
                                        {detail.hardware_asset?.estado || 'No especificado'}
                                    </Badge>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground">Fecha de Registro</p>
                                    <p className="text-sm">{formatDate(detail.created_at)}</p>
                                </div>
                                <Separator />
                                <Link href={`/hardware-assets/${detail.asset_id}`}>
                                    <Button variant="outline" className="w-full gap-2">
                                        <Shield className="h-4 w-4" />
                                        Ver Activo Principal
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Historial de Cambios */}
                        <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <History className="h-5 w-5 text-blue-500" />
                                    Historial
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Última Actualización</p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDate(detail.updated_at)}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Fecha de Creación</p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDate(detail.created_at)}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Registros de Cambio</p>
                                    <p className="text-sm text-muted-foreground">
                                        {detail.updated_at !== detail.created_at ? 'Modificado' : 'Sin modificaciones'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Validación */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    Validación
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">Especificaciones completas</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">Sistema operativo válido</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">Configuración coherente</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Acciones Rápidas */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Acciones</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href={pcDetails.index().url}>
                                    <Button variant="outline" className="w-full justify-start gap-2">
                                        <ArrowLeft className="h-4 w-4" />
                                        Volver al Listado
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-destructive hover:text-destructive"
                                    onClick={() => {
                                        if (confirm('¿Estás seguro de que deseas eliminar estos detalles técnicos?')) {
                                            window.location.href = pcDetails.destroy({ pc_detail: detail.id }).url;
                                        }
                                    }}
                                >
                                    <AlertCircle className="mr-2 h-4 w-4" />
                                    Eliminar Detalles
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Vista Previa */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Vista Previa</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Configuración:</p>
                                    <p className="text-sm text-muted-foreground truncate">
                                        {data.cpu} • {data.ram_gb}GB RAM • {data.almacenamiento}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Sistema:</p>
                                    <p className="text-sm text-muted-foreground truncate">
                                        {data.sistema_operativo}
                                    </p>
                                </div>
                                {data.mac_address && (
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">MAC:</p>
                                        <p className="text-sm text-muted-foreground font-mono">
                                            {data.mac_address}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}