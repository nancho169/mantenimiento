import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import pcDetails from '@/routes/pc-details';
import {
    ArrowLeft,
    Save,
    Cpu,
    MemoryStick,
    HardDrive,
    Monitor,
    Globe,
    Network,
    Package,
    PlusCircle,
    AlertCircle,
    CheckCircle2,
    Smartphone,
    Server
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HardwareAsset {
    id: number;
    tipo: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    estado: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Especificaciones',
        href: pcDetails.index().url,
    },
    {
        title: 'Nuevo Detalle Técnico',
        href: pcDetails.create().url,
    },
];

export default function PcDetailCreate({ assets }: { assets: HardwareAsset[] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        asset_id: '',
        cpu: '',
        ram_gb: '',
        almacenamiento: '',
        sistema_operativo: '',
        mac_address: '',
        anydesk_id: '',
        teamviewer_id: '',
        ip_address: '',
        tarjeta_video: '',
        fuente_poder: '',
        motherboard: '',
        disco_duro_extra: '',
        observaciones: '',
        tiene_garantia: false,
        fecha_instalacion_so: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(pcDetails.store().url, {
            onSuccess: () => {
                reset();
            },
        });
    };

    const getAssetIcon = (tipo: string) => {
        switch (tipo.toLowerCase()) {
            case 'laptop':
                return <Smartphone className="h-4 w-4" />;
            case 'servidor':
                return <Server className="h-4 w-4" />;
            case 'pc':
            default:
                return <Monitor className="h-4 w-4" />;
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Registrar Especificaciones Técnicas" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 mx-auto w-full">
                {/* Header con gradiente */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 border border-indigo-100 dark:border-indigo-900/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Link href={pcDetails.index().url}>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/50">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Registrar Especificaciones
                                </h1>
                                <p className="text-muted-foreground mt-1">
                                    Agrega los detalles técnicos de un equipo PC/Laptop/Servidor
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => reset()}
                            disabled={processing}
                            className="border-purple-200 hover:bg-purple-50"
                        >
                            Limpiar Formulario
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Formulario Principal */}
                    <Card className="lg:col-span-2 border-l-4 border-l-primary">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Cpu className="h-5 w-5 text-primary" />
                                        Detalles Técnicos del Equipo
                                    </CardTitle>
                                    <CardDescription>
                                        Completa todas las especificaciones del hardware
                                    </CardDescription>
                                </div>
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Package className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-8">
                                {/* Sección 1: Selección de Activo */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Monitor className="h-4 w-4 text-muted-foreground" />
                                        <h3 className="font-semibold">Selección de Equipo</h3>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <Label htmlFor="asset_id" className="flex items-center gap-2 mb-2">
                                                <Monitor className="h-4 w-4" />
                                                Activo de Hardware
                                            </Label>
                                            <Select
                                                onValueChange={(value) => setData('asset_id', value)}
                                                value={data.asset_id}
                                                required
                                            >
                                                <SelectTrigger className={errors.asset_id ? 'border-destructive' : ''}>
                                                    <SelectValue placeholder="Selecciona un equipo" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {assets.length === 0 ? (
                                                        <SelectItem value="disabled" disabled>
                                                            <div className="flex items-center gap-2">
                                                                <AlertCircle className="h-4 w-4" />
                                                                <span>No hay activos disponibles sin detalles</span>
                                                            </div>
                                                        </SelectItem>
                                                    ) : (
                                                        assets.map((asset) => (
                                                            <SelectItem key={asset.id} value={String(asset.id)}>
                                                                <div className="flex items-center justify-between w-full">
                                                                    <div className="flex items-center gap-2">
                                                                        {getAssetIcon(asset.tipo)}
                                                                        <div className="flex flex-col">
                                                                            <span className="font-medium">
                                                                                {asset.marca} {asset.modelo}
                                                                            </span>
                                                                            <span className="text-xs text-muted-foreground">
                                                                                S/N: {asset.numero_serie}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <Badge variant="outline" className="text-xs">
                                                                        {asset.tipo}
                                                                    </Badge>
                                                                </div>
                                                            </SelectItem>
                                                        ))
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Solo se muestran equipos que aún no tienen detalles técnicos registrados.
                                            </p>
                                            {errors.asset_id && (
                                                <div className="flex items-center gap-1 mt-1 text-destructive text-sm">
                                                    <AlertCircle className="h-3 w-3" />
                                                    {errors.asset_id}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Sección 2: Especificaciones Principales */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Cpu className="h-4 w-4 text-muted-foreground" />
                                        <h3 className="font-semibold">Especificaciones Principales</h3>
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
                                                    placeholder="Ej: Intel Core i5-10400F @ 2.90GHz"
                                                    value={data.cpu}
                                                    onChange={(e) => setData('cpu', e.target.value)}
                                                    className={errors.cpu ? 'border-destructive' : ''}
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
                                                    placeholder="Ej: 16"
                                                    value={data.ram_gb}
                                                    onChange={(e) => setData('ram_gb', e.target.value)}
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
                                                        <SelectItem value="otro">Otro (especificar en observaciones)</SelectItem>
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

                                {/* Sección 3: Componentes Adicionales */}
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
                                                <Label htmlFor="motherboard">Placa Madre (Motherboard)</Label>
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
                                        disabled={processing || assets.length === 0}
                                        className="min-w-[180px] gap-2 shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                Guardando...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4" />
                                                Guardar Especificaciones
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Panel Lateral */}
                    <div className="space-y-6">
                        {/* Guía de Registro */}
                        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    Guía de Registro
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start gap-2">
                                    <div className="p-1 rounded-full bg-primary/20 mt-0.5">
                                        <CheckCircle2 className="h-3 w-3 text-primary" />
                                    </div>
                                    <span className="text-sm">Selecciona un equipo sin detalles registrados</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="p-1 rounded-full bg-primary/20 mt-0.5">
                                        <CheckCircle2 className="h-3 w-3 text-primary" />
                                    </div>
                                    <span className="text-sm">Proporciona las especificaciones exactas del hardware</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="p-1 rounded-full bg-primary/20 mt-0.5">
                                        <CheckCircle2 className="h-3 w-3 text-primary" />
                                    </div>
                                    <span className="text-sm">Agrega información de red para acceso remoto</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="p-1 rounded-full bg-primary/20 mt-0.5">
                                        <CheckCircle2 className="h-3 w-3 text-primary" />
                                    </div>
                                    <span className="text-sm">Incluye observaciones importantes</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Información Importante */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Información Importante</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                    <div className="flex items-center gap-2 mb-1">
                                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                                        <h4 className="font-semibold text-yellow-700">Verificación</h4>
                                    </div>
                                    <p className="text-sm text-yellow-600">
                                        Verifica que la información sea exacta antes de guardar.
                                    </p>
                                </div>
                                <div className="text-sm text-muted-foreground space-y-2">
                                    <p>
                                        <strong>CPU:</strong> Incluye modelo exacto y frecuencia
                                    </p>
                                    <p>
                                        <strong>RAM:</strong> Verifica la capacidad y tipo (DDR3/DDR4/DDR5)
                                    </p>
                                    <p>
                                        <strong>Almacenamiento:</strong> Especifica tipo (SSD/HDD/NVMe) y capacidad
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Acciones Rápidas */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href={pcDetails.index().url}>
                                    <Button variant="outline" className="w-full justify-start gap-2">
                                        <ArrowLeft className="h-4 w-4" />
                                        Volver al Listado
                                    </Button>
                                </Link>
                                <Link href="/hardware-assets/create">
                                    <Button variant="outline" className="w-full justify-start gap-2">
                                        <PlusCircle className="h-4 w-4" />
                                        Crear Nuevo Activo
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Estadísticas */}
                        {assets.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Disponibilidad</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Equipos sin detalles:</span>
                                            <Badge variant="secondary">{assets.length}</Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">PCs:</span>
                                            <Badge>
                                                {assets.filter(a => a.tipo.toLowerCase() === 'pc').length}
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Laptops:</span>
                                            <Badge>
                                                {assets.filter(a => a.tipo.toLowerCase() === 'laptop').length}
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm">Servidores:</span>
                                            <Badge>
                                                {assets.filter(a => a.tipo.toLowerCase() === 'servidor').length}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}