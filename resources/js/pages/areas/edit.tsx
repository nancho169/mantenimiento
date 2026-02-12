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
import areasRoutes from '@/routes/areas';
import {
    ArrowLeft,
    Save,
    RefreshCw,
    Building,
    MapPin,
    AlertCircle,
    CheckCircle2,
    Home,
    Navigation
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MapPicker from '@/components/ui/map-picker';

interface Area {
    id: number;
    nombre: string;
    ubicacion_fisica?: string;
    latitud?: string;
    longitud?: string;
    created_at: string;
    updated_at: string;
}

export default function AreaEdit({ area }: { area: Area }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Áreas',
            href: areasRoutes.index().url,
        },
        {
            title: area.nombre || 'Editar Área',
            href: '#',
        },
    ];

    const { data, setData, put, processing, errors, reset } = useForm({
        nombre: area.nombre || '',
        ubicacion_fisica: area.ubicacion_fisica || '',
        latitud: area.latitud || '',
        longitud: area.longitud || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(areasRoutes.update({ area: area.id }).url, {
            onSuccess: () => {
                // Optional: Show success message or redirect
            },
        });
    };

    const handleLocationChange = (lat: number, lng: number) => {
        setData(data => ({ ...data, latitud: lat.toString(), longitud: lng.toString() }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Área: ${area.nombre}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 mx-auto w-full">
                {/* Header con gradiente */}
                <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-green-950/30 border border-emerald-100 dark:border-emerald-900/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Link href={areasRoutes.index().url}>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/50">
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    Editar Área
                                </h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="font-mono bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                                        ID: {area.id}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                        Última actualización: {new Date(area.updated_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link href={areasRoutes.index().url}>
                                <Button variant="outline" className="border-emerald-200 hover:bg-emerald-50">Cancelar</Button>
                            </Link>
                            <Button
                                onClick={() => reset()}
                                variant="outline"
                                disabled={processing}
                                className="border-teal-200 hover:bg-teal-50"
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
                                        <Building className="h-5 w-5 text-primary" />
                                        Información del Área
                                    </CardTitle>
                                    <CardDescription>
                                        Modifica los detalles del área o departamento
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="nombre">Nombre del Área</Label>
                                        <div className="relative">
                                            <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="nombre"
                                                value={data.nombre}
                                                onChange={(e) => setData('nombre', e.target.value)}
                                                className={`pl-9 ${errors.nombre ? 'border-destructive' : ''}`}
                                                placeholder="Ej: Recursos Humanos"
                                                required
                                            />
                                        </div>
                                        {errors.nombre && (
                                            <p className="text-sm text-destructive flex items-center gap-1">
                                                <AlertCircle className="h-3 w-3" />
                                                {errors.nombre}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="ubicacion_fisica">Ubicación Física</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="ubicacion_fisica"
                                                value={data.ubicacion_fisica}
                                                onChange={(e) => setData('ubicacion_fisica', e.target.value)}
                                                className={`pl-9 ${errors.ubicacion_fisica ? 'border-destructive' : ''}`}
                                                placeholder="Ej: Edificio A, Piso 2, Oficina 204"
                                            />
                                        </div>
                                        {errors.ubicacion_fisica && (
                                            <p className="text-sm text-destructive flex items-center gap-1">
                                                <AlertCircle className="h-3 w-3" />
                                                {errors.ubicacion_fisica}
                                            </p>
                                        )}
                                    </div>

                                    {/* Mapa y Coordenadas */}
                                    <div className="space-y-4 pt-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                                <div className="p-1.5 bg-primary/10 rounded">
                                                    <Navigation className="h-4 w-4 text-primary" />
                                                </div>
                                                Ubicación Geográfica
                                            </h3>
                                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                                Haga clic en el mapa para actualizar
                                            </span>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="border rounded-lg overflow-hidden">
                                                <MapPicker
                                                    onLocationChange={handleLocationChange}
                                                    initialLat={area.latitud ? parseFloat(area.latitud) : undefined}
                                                    initialLng={area.longitud ? parseFloat(area.longitud) : undefined}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="latitud" className="text-sm font-medium">
                                                        Latitud
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="latitud"
                                                            value={data.latitud}
                                                            readOnly
                                                            className="h-11 bg-muted/50 pl-10 font-mono"
                                                        />
                                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                                                            <span className="text-xs">°N</span>
                                                        </div>
                                                    </div>
                                                    {errors.latitud && (
                                                        <p className="text-sm text-destructive flex items-center gap-1">
                                                            <AlertCircle className="h-3 w-3" />
                                                            {errors.latitud}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="longitud" className="text-sm font-medium">
                                                        Longitud
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="longitud"
                                                            value={data.longitud}
                                                            readOnly
                                                            className="h-11 bg-muted/50 pl-10 font-mono"
                                                        />
                                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                                                            <span className="text-xs">°E</span>
                                                        </div>
                                                    </div>
                                                    {errors.longitud && (
                                                        <p className="text-sm text-destructive flex items-center gap-1">
                                                            <AlertCircle className="h-3 w-3" />
                                                            {errors.longitud}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="bg-muted/30 rounded-lg p-3">
                                                <p className="text-sm text-muted-foreground">
                                                    <strong>Nota:</strong> Las coordenadas se actualizarán automáticamente al hacer clic en el mapa.
                                                    Puede hacer zoom y desplazarse para encontrar la ubicación exacta.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Botón de Envío */}
                                <div className="flex justify-end gap-3 pt-6 border-t">
                                    <Link href={areasRoutes.index().url}>
                                        <Button type="button" variant="outline" disabled={processing}>
                                            Cancelar
                                        </Button>
                                    </Link>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="min-w-[150px] shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 border-0"
                                    >
                                        {processing ? (
                                            <>
                                                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                                Guardando...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                Actualizar Área
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Panel Lateral */}
                    <div className="space-y-6">
                        {/* Validación */}
                        <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    Estado
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className={`h-4 w-4 ${data.nombre ? 'text-green-500' : 'text-gray-300'}`} />
                                    <span className="text-sm">Nombre establecido</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className={`h-4 w-4 ${data.ubicacion_fisica ? 'text-green-500' : 'text-gray-300'}`} />
                                    <span className="text-sm">Ubicación definida</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className={`h-4 w-4 ${data.latitud && data.longitud ? 'text-green-500' : 'text-gray-300'}`} />
                                    <span className="text-sm">Coordenadas GPS</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Acciones Rápidas */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Acciones</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Link href={areasRoutes.index().url}>
                                    <Button variant="outline" className="w-full justify-start">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Volver al Listado
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}