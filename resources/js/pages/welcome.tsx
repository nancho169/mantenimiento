import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Server, Wrench, BarChart3, Shield, Clock, FileText } from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Sistema de Mantenimiento" />
            <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-slate-100 dark:from-slate-950 dark:via-amber-950 dark:to-slate-900">
                {/* Navbar */}
                <nav className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-amber-600 rounded-lg">
                                    <Server className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl font-bold text-slate-900 dark:text-white">
                                    Sistema de Mantenimiento
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                {auth.user ? (
                                    <Link href={dashboard()}>
                                        <Button>Dashboard</Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={login()}>
                                            <Button variant="ghost">Iniciar Sesión</Button>
                                        </Link>
                                        {canRegister && (
                                            <Link href={register()}>
                                                <Button>Registrarse</Button>
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="container mx-auto px-4 py-20 md:py-32">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-block mb-4 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                            <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                                Gestión Profesional de Activos
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                            Gestión Integral de
                            <span className="block text-amber-600 dark:text-amber-400">
                                Mantenimiento de Hardware
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                            Controla tu infraestructura tecnológica, programa mantenimientos y genera reportes detallados desde una única plataforma.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {auth.user ? (
                                <Link href={dashboard()}>
                                    <Button size="lg" className="text-lg px-8 py-6">
                                        Ir al Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={login()}>
                                        <Button size="lg" className="text-lg px-8 py-6">
                                            Comenzar Ahora
                                        </Button>
                                    </Link>
                                    <Link href={register()}>
                                        <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                                            Crear Cuenta
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="container mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Funcionalidades Principales
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            Todo lo que necesitas para gestionar el ciclo de vida completo de tus activos tecnológicos
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        <Card className="border-2 hover:border-amber-500 transition-all hover:shadow-lg">
                            <CardHeader>
                                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg w-fit mb-4">
                                    <Server className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                                </div>
                                <CardTitle>Inventario de Activos</CardTitle>
                                <CardDescription>
                                    Control total de PCs, servidores, laptops y periféricos con seguimiento detallado por ubicación y estado.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-2 hover:border-green-500 transition-all hover:shadow-lg">
                            <CardHeader>
                                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg w-fit mb-4">
                                    <Wrench className="h-8 w-8 text-green-600 dark:text-green-400" />
                                </div>
                                <CardTitle>Planificación de Mantenimiento</CardTitle>
                                <CardDescription>
                                    Programa y registra mantenimientos preventivos y correctivos con historial completo de intervenciones.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-2 hover:border-purple-500 transition-all hover:shadow-lg">
                            <CardHeader>
                                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg w-fit mb-4">
                                    <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                </div>
                                <CardTitle>Reportes y Análisis</CardTitle>
                                <CardDescription>
                                    Visualiza el estado de tu infraestructura en tiempo real con reportes exportables y métricas clave.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-2 hover:border-amber-500 transition-all hover:shadow-lg">
                            <CardHeader>
                                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg w-fit mb-4">
                                    <Shield className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                                </div>
                                <CardTitle>Gestión por Áreas</CardTitle>
                                <CardDescription>
                                    Organiza tus activos por departamentos o ubicaciones físicas para un control más eficiente.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-2 hover:border-cyan-500 transition-all hover:shadow-lg">
                            <CardHeader>
                                <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg w-fit mb-4">
                                    <Clock className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <CardTitle>Historial Completo</CardTitle>
                                <CardDescription>
                                    Accede al historial detallado de cada equipo: mantenimientos, reparaciones y cambios de estado.
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card className="border-2 hover:border-rose-500 transition-all hover:shadow-lg">
                            <CardHeader>
                                <div className="p-3 bg-rose-100 dark:bg-rose-900/30 rounded-lg w-fit mb-4">
                                    <FileText className="h-8 w-8 text-rose-600 dark:text-rose-400" />
                                </div>
                                <CardTitle>Exportación de Datos</CardTitle>
                                <CardDescription>
                                    Exporta inventarios y reportes en formatos CSV para análisis externos o auditorías.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </section>

                {/* CTA Section */}
                {!auth.user && (
                    <section className="container mx-auto px-4 py-16">
                        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-amber-600 to-orange-600 border-0 text-white">
                            <CardContent className="p-12 text-center">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    ¿Listo para optimizar tu gestión?
                                </h2>
                                <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
                                    Únete ahora y comienza a gestionar tu infraestructura de manera profesional
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href={register()}>
                                        <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                                            Crear Cuenta Gratis
                                        </Button>
                                    </Link>
                                    <Link href={login()}>
                                        <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white/10">
                                            Ya tengo cuenta
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                )}

                {/* Footer */}
                <footer className="border-t bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm mt-16">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-amber-600 rounded">
                                    <Server className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Sistema de Mantenimiento
                                </span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                © {new Date().getFullYear()} Todos los derechos reservados
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
