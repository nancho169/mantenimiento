import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';
import areasRoutes from '@/routes/areas';
import MapPicker from '@/components/ui/map-picker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, MapPin, Navigation, Save } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Áreas',
        href: areasRoutes.index().url,
    },
    {
        title: 'Nueva Área',
        href: areasRoutes.create().url,
    },
];

export default function AreaCreate() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        ubicacion_fisica: '',
        latitud: '',
        longitud: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(areasRoutes.store().url);
    };

    const handleLocationChange = (lat: number, lng: number) => {
        setData(data => ({ ...data, latitud: lat.toString(), longitud: lng.toString() }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nueva Área" />

            <div className="container  mx-auto px-4 py-8">
                <div className="flex flex-col gap-6">
                    {/* Header con gradiente */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-green-950/30 border border-emerald-100 dark:border-emerald-900/50">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    Crear Nueva Área
                                </h1>
                                <p className="text-muted-foreground mt-1">
                                    Complete la información para registrar una nueva área en el sistema
                                </p>
                            </div>
                            <Link href={areasRoutes.index().url}>
                                <Button variant="outline" className="gap-2 border-emerald-200 hover:bg-emerald-50">
                                    <Navigation className="h-4 w-4" />
                                    Volver a Áreas
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
                            <CardTitle className="text-xl">Información del Área</CardTitle>
                            <CardDescription>
                                Ingrese los datos requeridos para la nueva área. Todos los campos son obligatorios.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-6">
                            <form onSubmit={submit} className="space-y-8">
                                {/* Información Básica */}
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold flex items-center gap-2">
                                            <div className="p-1.5 bg-primary/10 rounded">
                                                <MapPin className="h-4 w-4 text-primary" />
                                            </div>
                                            Datos Principales
                                        </h3>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <div className="space-y-2">
                                                    <Label htmlFor="nombre" className="font-medium">
                                                        Nombre del Área
                                                        <span className="text-destructive ml-1">*</span>
                                                    </Label>
                                                    <Input
                                                        id="nombre"
                                                        value={data.nombre}
                                                        onChange={(e) => setData('nombre', e.target.value)}
                                                        required
                                                        placeholder="Ej: Zona de Jardines Central"
                                                        className="h-11"
                                                    />
                                                    {errors.nombre && (
                                                        <p className="text-sm text-destructive flex items-center gap-1">
                                                            <AlertCircle className="h-3 w-3" />
                                                            {errors.nombre}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="space-y-2">
                                                    <Label htmlFor="ubicacion_fisica" className="font-medium">
                                                        Ubicación Física
                                                        <span className="text-destructive ml-1">*</span>
                                                    </Label>
                                                    <Input
                                                        id="ubicacion_fisica"
                                                        value={data.ubicacion_fisica}
                                                        onChange={(e) => setData('ubicacion_fisica', e.target.value)}
                                                        required
                                                        placeholder="Ej: Edificio Principal, Piso 3"
                                                        className="h-11"
                                                    />
                                                    {errors.ubicacion_fisica && (
                                                        <p className="text-sm text-destructive flex items-center gap-1">
                                                            <AlertCircle className="h-3 w-3" />
                                                            {errors.ubicacion_fisica}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mapa y Coordenadas */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                                <div className="p-1.5 bg-primary/10 rounded">
                                                    <Navigation className="h-4 w-4 text-primary" />
                                                </div>
                                                Ubicación Geográfica
                                            </h3>
                                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                                Haga clic en el mapa para seleccionar
                                            </span>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="border rounded-lg overflow-hidden">
                                                <MapPicker onLocationChange={handleLocationChange} />
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

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
                                    <Link href={areasRoutes.index().url} className="w-full sm:w-auto">
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
                                        className="w-full sm:w-auto h-11 gap-2 shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 border-0"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                Guardando...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4" />
                                                Guardar Área
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Información Adicional */}
                    <div className="bg-muted/30 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground text-center">
                            Los datos proporcionados serán utilizados para la gestión y localización de áreas dentro de la plataforma.
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}