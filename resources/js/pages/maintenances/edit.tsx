import { Head, Link, useForm, router } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Save, Trash2, ShieldAlert } from 'lucide-react';
import maintenancesRoutes from '@/routes/maintenances';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
    {
        title: 'Editar Mantenimiento',
        href: '#',
    },
];

export default function MaintenanceEdit({ maintenance, assets }: { maintenance: Maintenance, assets: HardwareAsset[] }) {
    // Format dates to YYYY-MM-DD for input type="date"
    const formatDateForInput = (dateString?: string) => {
        if (!dateString) return '';
        return dateString.split('T')[0];
    };

    const { data, setData, put, processing, errors } = useForm({
        asset_id: String(maintenance.asset_id),
        fecha_servicio: formatDateForInput(maintenance.fecha_servicio),
        tecnico: maintenance.tecnico,
        descripcion: maintenance.descripcion,
        proximo_mantenimiento: formatDateForInput(maintenance.proximo_mantenimiento),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(maintenancesRoutes.update({ maintenance: maintenance.id }).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Mantenimiento" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 mx-auto w-full max-w-6xl">
                {/* Header con gradiente */}
                <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 border border-blue-100 dark:border-blue-900/50">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Editar Mantenimiento
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Actualiza la información del servicio técnico.
                        </p>
                    </div>
                    <Badge
                        variant="outline"
                        className="text-sm py-1.5 px-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                    >
                        ID: {maintenance.id}
                    </Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-[1fr_320px]">
                    <div className="space-y-6">
                        {/* Card principal con diseño mejorado */}
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                                <CardTitle className="text-xl">Información del Servicio</CardTitle>
                                <CardDescription>
                                    Modifica los detalles del mantenimiento realizado.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <form onSubmit={submit} className="space-y-6">

                                    <div className="space-y-2">
                                        <Label htmlFor="asset_id" className="text-base font-semibold">Activo Intervenido</Label>
                                        <Select
                                            onValueChange={(value) => setData('asset_id', value)}
                                            defaultValue={data.asset_id}
                                        >
                                            <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500">
                                                <SelectValue placeholder="Selecciona el activo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {assets.map((asset) => (
                                                    <SelectItem key={asset.id} value={String(asset.id)}>
                                                        {asset.marca} {asset.modelo} - {asset.tipo} (S/N: {asset.numero_serie})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.asset_id && (
                                            <p className="text-sm text-red-600 font-medium flex items-center gap-1">
                                                <span className="text-lg">⚠️</span> {errors.asset_id}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="fecha_servicio" className="text-base font-semibold">Fecha de Servicio</Label>
                                            <Input
                                                id="fecha_servicio"
                                                type="date"
                                                className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                                                value={data.fecha_servicio}
                                                onChange={(e) => setData('fecha_servicio', e.target.value)}
                                                required
                                            />
                                            {errors.fecha_servicio && (
                                                <p className="text-sm text-red-600 font-medium flex items-center gap-1">
                                                    <span className="text-lg">⚠️</span> {errors.fecha_servicio}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="tecnico" className="text-base font-semibold">Técnico Responsable</Label>
                                            <Input
                                                id="tecnico"
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                value={data.tecnico}
                                                onChange={(e) => setData('tecnico', e.target.value)}
                                                required
                                            />
                                            {errors.tecnico && (
                                                <p className="text-sm text-red-600 font-medium flex items-center gap-1">
                                                    <span className="text-lg">⚠️</span> {errors.tecnico}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="descripcion" className="text-base font-semibold">Descripción del Trabajo</Label>
                                        <Textarea
                                            id="descripcion"
                                            className="min-h-[120px] border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                                            value={data.descripcion}
                                            onChange={(e) => setData('descripcion', e.target.value)}
                                            required
                                        />
                                        {errors.descripcion && (
                                            <p className="text-sm text-red-600 font-medium flex items-center gap-1">
                                                <span className="text-lg">⚠️</span> {errors.descripcion}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="proximo_mantenimiento" className="text-base font-semibold">Próximo Mantenimiento (Opcional)</Label>
                                        <div className="flex gap-4 items-center">
                                            <Input
                                                id="proximo_mantenimiento"
                                                type="date"
                                                className="max-w-[200px] border-green-200 focus:border-green-500 focus:ring-green-500"
                                                value={data.proximo_mantenimiento}
                                                onChange={(e) => setData('proximo_mantenimiento', e.target.value)}
                                            />
                                            <span className="text-xs text-muted-foreground">
                                                Fecha sugerida para revisar el equipo nuevamente.
                                            </span>
                                        </div>
                                        {errors.proximo_mantenimiento && (
                                            <p className="text-sm text-red-600 font-medium flex items-center gap-1">
                                                <span className="text-lg">⚠️</span> {errors.proximo_mantenimiento}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-end gap-4 pt-6 border-t">
                                        <Link href={maintenancesRoutes.index().url}>
                                            <Button variant="outline" type="button" className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                                                <ArrowLeft className="h-4 w-4" />
                                                Cancelar
                                            </Button>
                                        </Link>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="gap-2 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0"
                                        >
                                            <Save className="h-4 w-4" />
                                            Guardar Cambios
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Danger Zone mejorada */}
                    <div className="space-y-6">
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -mr-16 -mt-16" />
                            <CardHeader className="relative z-10">
                                <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
                                    <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                                        <ShieldAlert className="h-5 w-5 text-red-600 dark:text-red-400" />
                                    </div>
                                    Zona de Peligro
                                </CardTitle>
                                <CardDescription className="text-red-600/70 dark:text-red-400/70">
                                    Acciones irreversibles para este registro.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <Button
                                    variant="destructive"
                                    className="w-full gap-2 shadow-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 border-0"
                                    onClick={() => {
                                        if (confirm('¿Estás seguro de eliminar este registro de mantenimiento? Esta acción no se puede deshacer.')) {
                                            router.delete(maintenancesRoutes.destroy({ maintenance: maintenance.id }).url);
                                        }
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Eliminar Registro
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
