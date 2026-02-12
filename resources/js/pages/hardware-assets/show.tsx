import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState, useRef } from 'react';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    ArrowLeft,
    Pencil,
    Printer,
    QrCode,
    Calendar,
    Cpu,
    Building,
    Hash,
    Shield,
    Wrench,
    Clock,
    Tag,
    HardDrive,
    Layers,
    Upload,
    FileText,
    Download,
    Trash2
} from 'lucide-react';
import QRCode from 'react-qr-code';
import hardwareAssets from '@/routes/hardware-assets';
import maintenances from '@/routes/maintenances';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface User {
    id: number;
    name: string;
}

interface Document {
    id: number;
    asset_id: number;
    filename: string;
    original_name: string;
    mime_type: string;
    size: number;
    path: string;
    uploaded_by: number;
    uploader?: User;
    created_at: string;
}

interface Area {
    id: number;
    nombre: string;
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
    documents?: Document[];
    created_at: string;
    updated_at: string;
}

export default function HardwareAssetShow({ asset }: { asset: HardwareAsset }) {
    const [activeTab, setActiveTab] = useState('history');
    const [uploadingDoc, setUploadingDoc] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Activos de Hardware',
            href: hardwareAssets.index().url,
        },
        {
            title: 'Detalle del Activo',
            href: '#',
        },
    ];

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Ficha Técnica - ${asset.marca} ${asset.modelo}</title>
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                            @media print {
                                @page { margin: 1cm; size: A4; }
                                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                            }
                            body {
                                font-family: 'Inter', sans-serif;
                                margin: 0;
                                padding: 20px;
                                color: #1a1a1a;
                                line-height: 1.5;
                            }
                            .header {
                                display: flex;
                                justify-content: space-between;
                                align-items: flex-start;
                                padding-bottom: 20px;
                                border-bottom: 2px solid #e5e7eb;
                                margin-bottom: 30px;
                            }
                            .logo-area h1 { margin: 0; font-size: 24px; color: #111; }
                            .logo-area p { margin: 5px 0 0; color: #666; font-size: 14px; }
                            .meta-info { text-align: right; font-size: 12px; color: #666; }
                            
                            .main-content {
                                display: flex;
                                gap: 40px;
                            }
                            .info-column { flex: 1; }
                            .qr-column { width: 200px; text-align: center; }
                            
                            .section { margin-bottom: 25px; }
                            .section-title {
                                font-size: 14px;
                                text-transform: uppercase;
                                letter-spacing: 0.05em;
                                color: #6b7280;
                                border-bottom: 1px solid #e5e7eb;
                                padding-bottom: 5px;
                                margin-bottom: 15px;
                                font-weight: 600;
                            }
                            
                            .grid-container {
                                display: grid;
                                grid-template-columns: repeat(2, 1fr);
                                gap: 15px;
                            }
                            .field { margin-bottom: 10px; }
                            .label { font-size: 12px; color: #6b7280; margin-bottom: 2px; }
                            .value { font-size: 15px; font-weight: 500; color: #111; }
                            
                            .qr-box {
                                border: 1px solid #e5e7eb;
                                padding: 15px;
                                border-radius: 8px;
                                display: inline-block;
                                margin-bottom: 10px;
                            }
                            .qr-code svg { width: 100% !important; height: auto !important; }
                            .asset-id-pill {
                                background: #f3f4f6;
                                padding: 4px 12px;
                                border-radius: 9999px;
                                font-family: monospace;
                                font-size: 14px;
                                font-weight: 600;
                            }
                            
                            .footer {
                                position: fixed;
                                bottom: 0;
                                left: 0;
                                right: 0;
                                font-size: 10px;
                                color: #9ca3af;
                                text-align: center;
                                padding-top: 10px;
                                border-top: 1px solid #e5e7eb;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <div class="logo-area">
                                <h1>Ficha Técnica de Activo</h1>
                                <p>Control de Inventario y Mantenimiento</p>
                            </div>
                            <div class="meta-info">
                                <p>Generado el: ${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                <p>ID Sistema: #${asset.id}</p>
                            </div>
                        </div>

                        <div class="main-content">
                            <div class="info-column">
                                <div class="section">
                                    <div class="section-title">Información del Equipo</div>
                                    <div class="grid-container">
                                        <div class="field">
                                            <div class="label">Marca</div>
                                            <div class="value">${asset.marca}</div>
                                        </div>
                                        <div class="field">
                                            <div class="label">Modelo</div>
                                            <div class="value">${asset.modelo}</div>
                                        </div>
                                        <div class="field">
                                            <div class="label">Tipo</div>
                                            <div class="value">${asset.tipo}</div>
                                        </div>
                                        <div class="field">
                                            <div class="label">Estado</div>
                                            <div class="value">${asset.estado}</div>
                                        </div>
                                    </div>
                                </div>

                                <div class="section">
                                    <div class="section-title">Identificación y Ubicación</div>
                                    <div class="field">
                                        <div class="label">Número de Serie</div>
                                        <div class="value" style="font-family: monospace;">${asset.numero_serie}</div>
                                    </div>
                                    <div class="field" style="margin-top: 15px;">
                                        <div class="label">Ubicación / Área</div>
                                        <div class="value">${asset.area?.nombre || 'No asignada'}</div>
                                    </div>
                                    <div class="field" style="margin-top: 15px;">
                                        <div class="label">UUID</div>
                                        <div class="value" style="font-family: monospace; font-size: 12px;">${asset.uuid}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="qr-column">
                                <div class="qr-box">
                                    <div class="qr-code">
                                        ${document.querySelector('.print-qr')?.outerHTML || ''}
                                    </div>
                                </div>
                                <div style="margin-top: 10px;">
                                    <span class="asset-id-pill">ID: ${asset.id}</span>
                                </div>
                            </div>
                        </div>

                        <div class="footer">
                             Documento generado automáticamente por el sistema de gestión.
                        </div>
                    </body>
                </html>
            `);
            printWindow.document.close();
            // Wait for resources to load (though we used text, it's instant)
            setTimeout(() => {
                printWindow.print();
            }, 500);
        }
    };

    const handlePrintQR = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>QR - ${asset.marca} ${asset.modelo}</title>
                        <style>
                            @media print {
                                @page { margin: 0; size: auto; }
                                body { margin: 0; padding: 0; }
                            }
                            body {
                                font-family: sans-serif;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                min-height: 100vh;
                                margin: 0;
                            }
                            .qr-label {
                                text-align: center;
                                padding: 20px;
                                border: 1px dashed #ccc;
                            }
                            .qr-code svg { margin: 0 auto; display: block; }
                            .model { font-weight: bold; font-size: 14px; margin-top: 10px; }
                            .sn { font-family: monospace; font-size: 12px; color: #666; }
                        </style>
                    </head>
                    <body>
                        <div class="qr-label">
                            <div class="qr-code">
                                ${document.querySelector('.print-qr')?.outerHTML || ''}
                            </div>
                            <div class="model">${asset.marca} ${asset.modelo}</div>
                            <div class="sn">SN: ${asset.numero_serie}</div>
                            <div class="sn">ID: ${asset.id}</div>
                        </div>
                    </body>
                    <script>
                        setTimeout(() => { window.print(); window.close(); }, 500);
                    </script>
                </html>
            `);
            printWindow.document.close();
        }
    };

    const getStatusColor = (estado: string) => {
        switch (estado.toLowerCase()) {
            case 'activo':
                return 'bg-green-500/10 text-green-700 border-green-200';
            case 'en mantenimiento':
                return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
            case 'dañado':
                return 'bg-red-500/10 text-red-700 border-red-200';
            case 'retirado':
                return 'bg-gray-500/10 text-gray-700 border-gray-200';
            default:
                return 'bg-blue-500/10 text-blue-700 border-blue-200';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleRegisterMaintenance = () => {
        router.visit(maintenances.create({ query: { asset_id: asset.id } }).url);
    };

    const handleScheduleReview = () => {
        router.visit(maintenances.create({ query: { asset_id: asset.id } }).url);
    };

    const handleAttachDocuments = () => {
        setActiveTab('docs');
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploadingDoc(true);

        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('documents[]', file);
        });

        router.post(`/hardware-assets/${asset.id}/documents`, formData, {
            onSuccess: () => {
                setUploadingDoc(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
            onError: (errors) => {
                console.error('Error al subir documentos:', errors);
                setUploadingDoc(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    const handleDeleteDocument = (documentId: number) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este documento?')) return;

        router.delete(`/documents/${documentId}`);
    };

    const formatFileSize = (bytes: number): string => {
        const units = ['B', 'KB', 'MB', 'GB'];
        let size = bytes;
        let unitIndex = 0;

        while (size > 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(2)} ${units[unitIndex]}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${asset.marca} ${asset.modelo} - Detalle`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6 mx-auto w-full">
                {/* Header Mejorado */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
                    <div className="flex items-center gap-3">
                        <Link href={hardwareAssets.index().url}>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                {asset.marca} {asset.modelo}
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="font-mono text-xs">
                                    ID: {asset.id}
                                </Badge>
                                <Badge className={`${getStatusColor(asset.estado)} font-semibold`}>
                                    {asset.estado}
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <style>{`
                            @media print {
                                nav, aside, header, .no-print { display: none !important; }
                                main { margin: 0; padding: 0; }
                            }
                        `}</style>
                        <Button variant="outline" onClick={handlePrint} className="gap-2">
                            <Printer className="h-4 w-4" />
                            Imprimir Ficha
                        </Button>
                        <Button variant="outline" onClick={handlePrintQR} className="gap-2">
                            <QrCode className="h-4 w-4" />
                            Imprimir QR
                        </Button>
                        <Link href={hardwareAssets.edit({ hardware_asset: asset.id }).url}>
                            <Button className="gap-2">
                                <Pencil className="h-4 w-4" />
                                Editar
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Grid Principal */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Información Principal */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="overflow-hidden border-l-4 border-l-primary">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <Cpu className="h-5 w-5 text-primary" />
                                            Especificaciones del Activo
                                        </CardTitle>
                                        <CardDescription>
                                            Información detallada del equipo
                                        </CardDescription>
                                    </div>
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <HardDrive className="h-5 w-5 text-primary" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                            <Tag className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Tipo de Equipo</p>
                                                <p className="font-semibold">{asset.tipo}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                            <Hash className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Número de Serie</p>
                                                <p className="font-semibold font-mono">{asset.numero_serie}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                            <Calendar className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Fecha de Registro</p>
                                                <p className="font-semibold">{formatDate(asset.created_at)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                            <Building className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Ubicación / Área</p>
                                                <p className="font-semibold">{asset.area?.nombre || 'No asignada'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                            <Shield className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">UUID</p>
                                                <p className="font-semibold font-mono text-xs break-all">{asset.uuid}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                                            <Clock className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Última Actualización</p>
                                                <p className="font-semibold">{formatDate(asset.updated_at)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tabs para Información Adicional */}
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="history">
                                    <Clock className="h-4 w-4 mr-2" />
                                    Historial
                                </TabsTrigger>
                                <TabsTrigger value="maintenance">
                                    <Wrench className="h-4 w-4 mr-2" />
                                    Mantenimiento
                                </TabsTrigger>
                                <TabsTrigger value="docs">
                                    <Layers className="h-4 w-4 mr-2" />
                                    Documentación
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="history" className="mt-4">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-start p-3 rounded-lg border">
                                                <div>
                                                    <p className="font-semibold">Registro Inicial</p>
                                                    <p className="text-sm text-muted-foreground">Activo registrado en el sistema</p>
                                                </div>
                                                <Badge variant="outline">{formatDate(asset.created_at)}</Badge>
                                            </div>
                                            {/* Agregar más eventos de historial aquí */}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="maintenance" className="mt-4">
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="text-center py-8">
                                            <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                            <h3 className="font-semibold mb-2">Sin registros de mantenimiento</h3>
                                            <p className="text-sm text-muted-foreground">
                                                No hay mantenimientos registrados para este equipo.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="docs" className="mt-4">
                                <Card>
                                    <CardContent className="pt-6">
                                        {asset.documents && asset.documents.length > 0 ? (
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="font-semibold">Documentos ({asset.documents.length})</h3>
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        multiple
                                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                                                        onChange={handleFileChange}
                                                        className="hidden"
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="gap-2"
                                                        onClick={handleUploadClick}
                                                        disabled={uploadingDoc}
                                                    >
                                                        {uploadingDoc ? (
                                                            <>
                                                                <FileText className="h-4 w-4 animate-pulse" />
                                                                Subiendo...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Upload className="h-4 w-4" />
                                                                Subir más
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                                <div className="space-y-2">
                                                    {asset.documents.map((doc) => (
                                                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                                                            <div className="flex items-center gap-3 flex-1">
                                                                <FileText className="h-5 w-5 text-blue-500" />
                                                                <div className="flex-1">
                                                                    <p className="font-medium text-sm">{doc.original_name}</p>
                                                                    <p className="text-xs text-muted-foreground">
                                                                        {formatFileSize(doc.size)} • Subido por {doc.uploader?.name || 'Usuario'} • {new Date(doc.created_at).toLocaleDateString()}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    asChild
                                                                >
                                                                    <a href={`/documents/${doc.id}/download`} download>
                                                                        <Download className="h-4 w-4" />
                                                                    </a>
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => handleDeleteDocument(doc.id)}
                                                                >
                                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <Layers className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                                <h3 className="font-semibold mb-2">Documentación no disponible</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Sube documentos relacionados con este equipo.
                                                </p>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    multiple
                                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                                <Button
                                                    variant="outline"
                                                    className="mt-4 gap-2"
                                                    onClick={handleUploadClick}
                                                    disabled={uploadingDoc}
                                                >
                                                    {uploadingDoc ? (
                                                        <>
                                                            <FileText className="h-4 w-4 animate-pulse" />
                                                            Subiendo...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Upload className="h-4 w-4" />
                                                            Subir Documentos
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Panel Lateral - QR y Acciones Rápidas */}
                    <div className="space-y-6">
                        {/* Tarjeta QR Mejorada */}
                        <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <QrCode className="h-5 w-5 text-primary" />
                                        Código QR
                                    </CardTitle>
                                    <Badge variant="outline">Identificación</Badge>
                                </div>
                                <CardDescription>
                                    Escanee para ver los detalles del activo
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-4">
                                <div className="bg-white p-6 rounded-xl border shadow-lg print:shadow-none print-qr">
                                    <QRCode
                                        value={currentUrl}
                                        size={180}
                                        bgColor="#ffffff"
                                        fgColor="#000000"
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        level="H"
                                    />
                                </div>
                                <div className="text-center space-y-2">
                                    <p className="font-bold text-xl">{asset.marca} {asset.modelo}</p>
                                    <p className="font-mono text-sm bg-muted px-3 py-1 rounded-md">
                                        SN: {asset.numero_serie}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {asset.area?.nombre || 'Sin ubicación asignada'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tarjeta de Acciones Rápidas */}
                        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-dashed">
                            <CardHeader>
                                <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-2"
                                    onClick={handleRegisterMaintenance}
                                >
                                    <Wrench className="h-4 w-4" />
                                    Registrar Mantenimiento
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-2"
                                    onClick={handleScheduleReview}
                                >
                                    <Calendar className="h-4 w-4" />
                                    Programar Revisión
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-2"
                                    onClick={handleAttachDocuments}
                                >
                                    <Layers className="h-4 w-4" />
                                    Adjuntar Documentos
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Información de Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground no-print">
                    <div className="text-center p-3 rounded-lg bg-muted/20">
                        <p className="font-medium">Creado</p>
                        <p>{formatDate(asset.created_at)}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/20">
                        <p className="font-medium">Última Actualización</p>
                        <p>{formatDate(asset.updated_at)}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/20">
                        <p className="font-medium">Identificador Único</p>
                        <p className="font-mono truncate">{asset.uuid}</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}