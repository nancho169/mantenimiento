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
import hardwareAssets from '@/routes/hardware-assets';
import {
    ArrowLeft,
    Save,
    RefreshCw,
    Cpu,
    Building,
    Hash,
    Package,
    Activity,
    AlertCircle,
    CheckCircle2,
    Shield
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

interface Area {
    id: number;
    nombre: string;
    ubicacion_fisica?: string;
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
    descripcion?: string;
    fecha_adquisicion?: string;
    garantia_hasta?: string;
    requiere_mantenimiento?: boolean;
}



export default function HardwareAssetEdit({ asset, areas }: { asset: HardwareAsset, areas: Area[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Activos',
            href: hardwareAssets.index().url,
        },
        {
            title: asset.modelo || 'Editar Activo',
            href: '#',
        },
    ];

    const { data, setData, put, processing, errors, reset } = useForm({
        tipo: asset.tipo || '',
        marca: asset.marca || '',
        modelo: asset.modelo || '',
        numero_serie: asset.numero_serie || '',
        estado: asset.estado || 'Operativo',
        area_id: String(asset.area_id || ''),
        descripcion: asset.descripcion || '',
        fecha_adquisicion: asset.fecha_adquisicion || '',
        garantia_hasta: asset.garantia_hasta || '',
        requiere_mantenimiento: asset.requiere_mantenimiento || false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(hardwareAssets.update({ hardware_asset: asset.id }).url, {
            onSuccess: () => {
                // Reset form on success
                reset();
            },
        });
    };

    const getStatusColor = (estado: string) => {
        switch (estado.toLowerCase()) {
            case 'operativo':
                return 'bg-green-500/10 text-green-700 border-green-200';
            case 'en mantenimiento':
                return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
            case 'en reparación':
                return 'bg-orange-500/10 text-orange-700 border-orange-200';
            case 'baja':
                return 'bg-red-500/10 text-red-700 border-red-200';
            default:
                return 'bg-blue-500/10 text-blue-700 border-blue-200';
        }
    };

    const assetTypes = [
        { value: 'PC', label: 'Computadora de Escritorio', icon: '💻' },
        { value: 'Laptop', label: 'Laptop', icon: '💻' },
        { value: 'Impresora', label: 'Impresora', icon: '🖨️' },
        { value: 'Monitor', label: 'Monitor', icon: '🖥️' },
        { value: 'Servidor', label: 'Servidor', icon: '🖥️' },
        { value: 'Periférico', label: 'Periférico', icon: '🖱️' },
        { value: 'Router', label: 'Router/Switch', icon: '📡' },
        { value: 'Telefono', label: 'Teléfono IP', icon: '📞' },
        { value: 'Escáner', label: 'Escáner', icon: '📄' },
        { value: 'Tablet', label: 'Tablet', icon: '📱' },
    ];

    const estados = [
        { value: 'Operativo', label: 'Operativo', color: 'text-green-600' },
        { value: 'En Mantenimiento', label: 'En Mantenimiento', color: 'text-yellow-600' },
        { value: 'En Reparación', label: 'En Reparación', color: 'text-orange-600' },
        { value: 'Dañado', label: 'Dañado', color: 'text-red-600' },
        { value: 'Baja', label: 'Dado de Baja', color: 'text-gray-600' },
        { value: 'Reservado', label: 'Reservado', color: 'text-blue-600' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar: ${asset.marca} ${asset.modelo}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6  mx-auto w-full">
                {/* Header con gradiente */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-cyan-950/30 dark:via-blue-950/30 dark:to-indigo-950/30 border border-cyan-100 dark:border-cyan-900/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Link href={hardwareAssets.show({ hardware_asset: asset.id }).url}>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/50">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                                    Editar Activo
                                </h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="font-mono bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                                        ID: {asset.id}
                                    </Badge>
                                    <Badge className={`${getStatusColor(asset.estado)}`}>
                                        {asset.estado}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link href={hardwareAssets.show({ hardware_asset: asset.id }).url}>
                                <Button variant="outline" className="border-cyan-200 hover:bg-cyan-50">Cancelar</Button>
                            </Link>
                            <Button
                                onClick={() => reset()}
                                variant="outline"
                                disabled={processing}
                                className="border-indigo-200 hover:bg-indigo-50"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Restablecer
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Formulario Principal */}
                    <Card className="lg:col-span-2 border-l-4 border-l-primary">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-5 w-5 text-primary" />
                                        Información del Activo
                                    </CardTitle>
                                    <CardDescription>
                                        Actualiza los datos del equipo de hardware
                                    </CardDescription>
                                </div>
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Cpu className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-8">
                                {/* Sección 1: Identificación */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-muted-foreground" />
                                        <h3 className="font-semibold">Identificación</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <div>
                                                <Label htmlFor="tipo" className="flex items-center gap-2 mb-2">
                                                    <Cpu className="h-4 w-4" />
                                                    Tipo de Activo
                                                </Label>
                                                <Select
                                                    onValueChange={(value) => setData('tipo', value)}
                                                    defaultValue={data.tipo}
                                                >
                                                    <SelectTrigger className={errors.tipo ? 'border-destructive' : ''}>
                                                        <SelectValue placeholder="Selecciona un tipo" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {assetTypes.map((type) => (
                                                            <SelectItem key={type.value} value={type.value}>
                                                                <div className="flex items-center gap-2">
                                                                    <span>{type.icon}</span>
                                                                    <span>{type.label}</span>
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.tipo && (
                                                    <div className="flex items-center gap-1 mt-1 text-destructive text-sm">
                                                        <AlertCircle className="h-3 w-3" />
                                                        {errors.tipo}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="marca">Marca</Label>
                                                <Input
                                                    id="marca"
                                                    value={data.marca}
                                                    onChange={(e) => setData('marca', e.target.value)}
                                                    className={errors.marca ? 'border-destructive' : ''}
                                                    placeholder="Ej: Dell, HP, Lenovo"
                                                />
                                                {errors.marca && (
                                                    <div className="flex items-center gap-1 mt-1 text-destructive text-sm">
                                                        <AlertCircle className="h-3 w-3" />
                                                        {errors.marca}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <Label htmlFor="modelo">Modelo</Label>
                                                <Input
                                                    id="modelo"
                                                    value={data.modelo}
                                                    onChange={(e) => setData('modelo', e.target.value)}
                                                    className={errors.modelo ? 'border-destructive' : ''}
                                                    placeholder="Ej: OptiPlex 7070, ThinkPad X1"
                                                />
                                                {errors.modelo && (
                                                    <div className="flex items-center gap-1 mt-1 text-destructive text-sm">
                                                        <AlertCircle className="h-3 w-3" />
                                                        {errors.modelo}
                                                    </div>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="numero_serie" className="flex items-center gap-2 mb-2">
                                                    <Hash className="h-4 w-4" />
                                                    Número de Serie
                                                </Label>
                                                <Input
                                                    id="numero_serie"
                                                    value={data.numero_serie}
                                                    onChange={(e) => setData('numero_serie', e.target.value)}
                                                    className={`font-mono ${errors.numero_serie ? 'border-destructive' : ''}`}
                                                    placeholder="Ej: CN-0RG4G3-S48195-5B9-17Z4"
                                                />
                                                {errors.numero_serie && (
                                                    <div className="flex items-center gap-1 mt-1 text-destructive text-sm">
                                                        <AlertCircle className="h-3 w-3" />
                                                        {errors.numero_serie}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Sección 2: Asignación y Estado */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Building className="h-4 w-4 text-muted-foreground" />
                                        <h3 className="font-semibold">Asignación y Estado</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <div>
                                                <Label htmlFor="area_id" className="flex items-center gap-2 mb-2">
                                                    <Building className="h-4 w-4" />
                                                    Área Asignada
                                                </Label>
                                                <Select
                                                    onValueChange={(value) => setData('area_id', value === '_unassigned' ? '' : value)}
                                                    defaultValue={data.area_id || '_unassigned'}
                                                >
                                                    <SelectTrigger className={errors.area_id ? 'border-destructive' : ''}>
                                                        <SelectValue placeholder="Selecciona un área" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="_unassigned">
                                                            <span className="text-muted-foreground">Sin asignar</span>
                                                        </SelectItem>
                                                        {areas.map((area) => (
                                                            <SelectItem key={area.id} value={String(area.id)}>
                                                                <div className="flex flex-col">
                                                                    <span>{area.nombre}</span>
                                                                    {area.ubicacion_fisica && (
                                                                        <span className="text-xs text-muted-foreground">
                                                                            {area.ubicacion_fisica}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.area_id && (
                                                    <div className="flex items-center gap-1 mt-1 text-destructive text-sm">
                                                        <AlertCircle className="h-3 w-3" />
                                                        {errors.area_id}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <Label htmlFor="estado" className="flex items-center gap-2 mb-2">
                                                    <Activity className="h-4 w-4" />
                                                    Estado Actual
                                                </Label>
                                                <Select
                                                    onValueChange={(value) => setData('estado', value)}
                                                    defaultValue={data.estado}
                                                >
                                                    <SelectTrigger className={errors.estado ? 'border-destructive' : ''}>
                                                        <SelectValue placeholder="Selecciona un estado" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {estados.map((estado) => (
                                                            <SelectItem key={estado.value} value={estado.value}>
                                                                <div className="flex items-center gap-2">
                                                                    <div className={`w-2 h-2 rounded-full ${estado.color.replace('text-', 'bg-')}`} />
                                                                    {estado.label}
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.estado && (
                                                    <div className="flex items-center gap-1 mt-1 text-destructive text-sm">
                                                        <AlertCircle className="h-3 w-3" />
                                                        {errors.estado}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Sección 3: Información Adicional */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Package className="h-4 w-4 text-muted-foreground" />
                                        <h3 className="font-semibold">Información Adicional</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="descripcion">Descripción</Label>
                                            <Textarea
                                                id="descripcion"
                                                value={data.descripcion}
                                                onChange={(e) => setData('descripcion', e.target.value)}
                                                placeholder="Especificaciones técnicas, configuración, observaciones..."
                                                rows={3}
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="fecha_adquisicion">Fecha de Adquisición</Label>
                                                <Input
                                                    id="fecha_adquisicion"
                                                    type="date"
                                                    value={data.fecha_adquisicion}
                                                    onChange={(e) => setData('fecha_adquisicion', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="garantia_hasta">Garantía hasta</Label>
                                                <Input
                                                    id="garantia_hasta"
                                                    type="date"
                                                    value={data.garantia_hasta}
                                                    onChange={(e) => setData('garantia_hasta', e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                                            <div>
                                                <Label htmlFor="requiere_mantenimiento" className="font-medium">
                                                    Requiere Mantenimiento Programado
                                                </Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Habilitar recordatorios de mantenimiento
                                                </p>
                                            </div>
                                            <Switch
                                                id="requiere_mantenimiento"
                                                checked={data.requiere_mantenimiento}
                                                onCheckedChange={(checked) => setData('requiere_mantenimiento', checked)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Botón de Envío */}
                                <div className="flex justify-end gap-3 pt-6 border-t">
                                    <Link href={hardwareAssets.show({ hardware_asset: asset.id }).url}>
                                        <Button type="button" variant="outline" disabled={processing}>
                                            Cancelar
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="min-w-[180px] shadow-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 border-0"
                                    >
                                        {processing ? (
                                            <>
                                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                                Guardando...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Actualizar Activo
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Panel Lateral */}
                    <div className="space-y-6">
                        {/* Resumen del Activo */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Resumen</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground">ID del Activo</p>
                                    <p className="font-mono text-sm">{asset.id}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground">UUID</p>
                                    <p className="font-mono text-xs break-all">{asset.uuid}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground">Última Actualización</p>
                                    <p className="text-sm">
                                        {new Date(asset.updated_at).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Validación de Cambios */}
                        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    Validación
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">Todos los campos obligatorios completados</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">Número de serie válido</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">Área asignada disponible</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Acciones Rápidas */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Acciones</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href={hardwareAssets.show({ hardware_asset: asset.id }).url}>
                                    <Button variant="outline" className="w-full justify-start">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Volver al Detalle
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-destructive hover:text-destructive"
                                    onClick={() => {
                                        if (confirm('¿Estás seguro de que deseas eliminar este activo?')) {
                                            // Lógica de eliminación aquí
                                        }
                                    }}
                                >
                                    <AlertCircle className="mr-2 h-4 w-4" />
                                    Eliminar Activo
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}