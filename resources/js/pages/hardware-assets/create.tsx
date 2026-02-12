import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AreaSelector from '@/components/area-selector';
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
import hardwareAssetsRoutes from '@/routes/hardware-assets';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Monitor, Save, Navigation, Box, Tag, Server, Printer, Laptop } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Area {
    id: number;
    nombre: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Activos de Hardware',
        href: hardwareAssetsRoutes.index().url,
    },
    {
        title: 'Nuevo Activo',
        href: hardwareAssetsRoutes.create().url,
    },
];

export default function HardwareAssetCreate({ areas }: { areas: Area[] }) {
    const { data, setData, post, processing, errors } = useForm({
        tipo: '',
        marca: '',
        modelo: '',
        numero_serie: '',
        estado: '',
        area_id: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(hardwareAssetsRoutes.store().url);
    };

    const getIconForType = (type: string) => {
        switch (type) {
            case 'PC': return <Monitor className="h-4 w-4" />;
            case 'Laptop': return <Laptop className="h-4 w-4" />;
            case 'Servidor': return <Server className="h-4 w-4" />;
            case 'Impresora': return <Printer className="h-4 w-4" />;
            default: return <Box className="h-4 w-4" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo Activo" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-6">
                    {/* Header con gradiente */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-cyan-950/30 dark:via-blue-950/30 dark:to-indigo-950/30 border border-cyan-100 dark:border-cyan-900/50">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                                    Registrar Nuevo Activo
                                </h1>
                                <p className="text-muted-foreground mt-1">
                                    Ingrese los detalles del hardware para el inventario
                                </p>
                            </div>
                            <Link href={hardwareAssetsRoutes.index().url}>
                                <Button variant="outline" className="gap-2 border-cyan-200 hover:bg-cyan-50">
                                    <Navigation className="h-4 w-4" />
                                    Volver a Activos
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">

                        {Object.keys(errors).length > 0 && (
                            <Alert variant="destructive" className="border-l-4 border-l-destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Por favor, corrija los errores en el formulario antes de continuar.
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Form Card */}
                    <Card className="border shadow-lg">
                        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
                            <CardTitle className="text-xl">Información del Activo</CardTitle>
                            <CardDescription>
                                Todos los campos marcados con * son obligatorios. El UUID se generará automáticamente.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-6">
                            <form onSubmit={submit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Columna Izquierda: Información Básica */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                                            <Tag className="h-4 w-4 text-primary" />
                                            Datos del Equipo
                                        </h3>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="tipo" className="font-medium">
                                                    Tipo de Activo <span className="text-destructive">*</span>
                                                </Label>
                                                <Select
                                                    onValueChange={(value) => setData('tipo', value)}
                                                    defaultValue={data.tipo}
                                                >
                                                    <SelectTrigger className="h-11">
                                                        <SelectValue placeholder="Seleccione el tipo de equipo" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="PC">PC de Escritorio</SelectItem>
                                                        <SelectItem value="Laptop">Laptop / Notebook</SelectItem>
                                                        <SelectItem value="Impresora">Impresora / Multifuncional</SelectItem>
                                                        <SelectItem value="Monitor">Monitor</SelectItem>
                                                        <SelectItem value="Servidor">Servidor</SelectItem>
                                                        <SelectItem value="Periférico">Periférico (Teclado, Mouse, etc.)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {errors.tipo && (
                                                    <p className="text-sm text-destructive">{errors.tipo}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="marca" className="font-medium">
                                                        Marca <span className="text-destructive">*</span>
                                                    </Label>
                                                    <Input
                                                        id="marca"
                                                        value={data.marca}
                                                        onChange={(e) => setData('marca', e.target.value)}
                                                        placeholder="Ej. HP, Dell"
                                                        className="h-11"
                                                    />
                                                    {errors.marca && (
                                                        <p className="text-sm text-destructive">{errors.marca}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="modelo" className="font-medium">
                                                        Modelo <span className="text-destructive">*</span>
                                                    </Label>
                                                    <Input
                                                        id="modelo"
                                                        value={data.modelo}
                                                        onChange={(e) => setData('modelo', e.target.value)}
                                                        placeholder="Ej. ProDesk 400"
                                                        className="h-11"
                                                    />
                                                    {errors.modelo && (
                                                        <p className="text-sm text-destructive">{errors.modelo}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="numero_serie" className="font-medium">
                                                    Número de Serie <span className="text-destructive">*</span>
                                                </Label>
                                                <div className="relative">
                                                    <Input
                                                        id="numero_serie"
                                                        value={data.numero_serie}
                                                        onChange={(e) => setData('numero_serie', e.target.value)}
                                                        placeholder="S/N del fabricante"
                                                        className="h-11 pl-10 font-mono"
                                                    />
                                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                                                        <span className="text-xs">#</span>
                                                    </div>
                                                </div>
                                                {errors.numero_serie && (
                                                    <p className="text-sm text-destructive">{errors.numero_serie}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Columna Derecha: Ubicación y Estado */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
                                            <Navigation className="h-4 w-4 text-primary" />
                                            Ubicación y Estado
                                        </h3>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="area_id" className="font-medium">
                                                    Área Asignada <span className="text-destructive">*</span>
                                                </Label>
                                                <AreaSelector
                                                    areas={areas}
                                                    value={data.area_id}
                                                    onChange={(value) => setData('area_id', value)}
                                                    error={errors.area_id}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="estado" className="font-medium">
                                                    Estado Actual <span className="text-destructive">*</span>
                                                </Label>
                                                <Select
                                                    onValueChange={(value) => setData('estado', value)}
                                                    defaultValue={data.estado}
                                                >
                                                    <SelectTrigger className="h-11">
                                                        <SelectValue placeholder="Estado del activo" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Operativo">
                                                            <span className="flex items-center gap-2">
                                                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                                                Operativo
                                                            </span>
                                                        </SelectItem>
                                                        <SelectItem value="En Mantenimiento">
                                                            <span className="flex items-center gap-2">
                                                                <span className="h-2 w-2 rounded-full bg-yellow-500" />
                                                                En Mantenimiento
                                                            </span>
                                                        </SelectItem>
                                                        <SelectItem value="En Reparación">
                                                            <span className="flex items-center gap-2">
                                                                <span className="h-2 w-2 rounded-full bg-orange-500" />
                                                                En Reparación
                                                            </span>
                                                        </SelectItem>
                                                        <SelectItem value="Baja">
                                                            <span className="flex items-center gap-2">
                                                                <span className="h-2 w-2 rounded-full bg-red-500" />
                                                                Baja
                                                            </span>
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                {errors.estado && (
                                                    <p className="text-sm text-destructive">{errors.estado}</p>
                                                )}
                                            </div>

                                            {/* Info Box */}
                                            <div className="bg-muted/50 rounded-lg p-4 mt-8">
                                                <h4 className="text-sm font-medium mb-2">Información Importante</h4>
                                                <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                                                    <li>Asegúrese de verificar el número de serie físico.</li>
                                                    <li>El código QR se generará automáticamente al guardar.</li>
                                                    <li>Si es un PC, podrá agregar detalles técnicos luego.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t mt-4">
                                    <Link href={hardwareAssetsRoutes.index().url} className="w-full sm:w-auto">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full h-11"
                                            disabled={processing}
                                        >
                                            Cancelar
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto h-11 gap-2 shadow-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 border-0"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                Guardando...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4" />
                                                Registrar Activo
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
