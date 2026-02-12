import { Head, Link, useForm } from '@inertiajs/react';
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
import { ArrowLeft, Save } from 'lucide-react';
import maintenancesRoutes from '@/routes/maintenances';

interface HardwareAsset {
    id: number;
    tipo: string;
    marca: string;
    modelo: string;
    numero_serie: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mantenimientos',
        href: maintenancesRoutes.index().url,
    },
    {
        title: 'Nuevo Mantenimiento',
        href: maintenancesRoutes.create().url,
    },
];

export default function MaintenanceCreate({ assets }: { assets: HardwareAsset[] }) {
    const { data, setData, post, processing, errors } = useForm({
        asset_id: '',
        fecha_servicio: new Date().toISOString().split('T')[0], // Today YYYY-MM-DD
        tecnico: '',
        descripcion: '',
        proximo_mantenimiento: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(maintenancesRoutes.store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo Mantenimiento" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 mx-auto w-full">
                {/* Header con gradiente */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/30 border border-green-100 dark:border-green-900/50">
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                        Registrar Mantenimiento
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Completa los detalles del servicio técnico realizado.
                    </p>
                </div>

                {/* Card principal con diseño mejorado */}
                <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                        <CardTitle className="text-xl">Detalles del Servicio</CardTitle>
                        <CardDescription>
                            Ingresa la información del activo y los trabajos realizados.
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
                                        placeholder="Nombre del técnico"
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
                                    placeholder="Detalla las tareas realizadas, repuestos utilizados, observaciones..."
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
                                    className="gap-2 shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-0"
                                >
                                    <Save className="h-4 w-4" />
                                    Registrar Mantenimiento
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
