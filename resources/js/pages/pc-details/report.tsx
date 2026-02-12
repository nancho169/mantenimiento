import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

interface HardwareAsset {
    id: number;
    tipo: string;
    marca: string;
    modelo: string;
    numero_serie: string;
    estado: string;
    area?: {
        nombre: string;
    };
}

interface PcDetail {
    id: number;
    asset_id: number;
    cpu: string;
    ram_gb: number;
    almacenamiento: string;
    sistema_operativo: string;
    anydesk_id?: string;
    teamviewer_id?: string;
    hardware_asset?: HardwareAsset;
    ip_address?: string;
}

export default function PcDetailReport({ details, date }: { details: PcDetail[], date: string }) {

    useEffect(() => {
        setTimeout(() => {
            window.print();
        }, 500);
    }, []);

    return (
        <div className="bg-white text-black p-8 min-h-screen font-sans">
            <Head title={`Reporte de Hardware - ${date}`} />

            <div className="mb-8 border-b pb-4">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold uppercase tracking-tight">Reporte de Inventario de Hardware</h1>
                        <p className="text-sm text-gray-500 mt-1">Departamento de TI - Mantenimiento</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold">Fecha: {date}</p>
                        <p className="text-xs text-gray-500">Total Equipos: {details.length}</p>
                    </div>
                </div>
            </div>

            <table className="w-full text-xs text-left border-collapse">
                <thead>
                    <tr className="border-b-2 border-black">
                        <th className="py-2 font-bold uppercase">ID</th>
                        <th className="py-2 font-bold uppercase">Tipo</th>
                        <th className="py-2 font-bold uppercase">Equipo</th>
                        <th className="py-2 font-bold uppercase">Serial</th>
                        <th className="py-2 font-bold uppercase">Ubicación</th>
                        <th className="py-2 font-bold uppercase">Especificaciones</th>
                        <th className="py-2 font-bold uppercase">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {details.map((detail, index) => (
                        <tr key={detail.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : ''} print:bg-transparent`}>
                            <td className="py-2 pr-2 font-mono text-gray-500">#{detail.hardware_asset?.id}</td>
                            <td className="py-2 pr-2">{detail.hardware_asset?.tipo}</td>
                            <td className="py-2 pr-2 font-medium">
                                {detail.hardware_asset?.marca} {detail.hardware_asset?.modelo}
                            </td>
                            <td className="py-2 pr-2 font-mono">{detail.hardware_asset?.numero_serie}</td>
                            <td className="py-2 pr-2 truncate max-w-[150px]">
                                {detail.hardware_asset?.area?.nombre || '-'}
                            </td>
                            <td className="py-2 pr-2">
                                <div className="space-y-0.5">
                                    <div><span className="font-semibold">CPU:</span> {detail.cpu}</div>
                                    <div><span className="font-semibold">RAM:</span> {detail.ram_gb}GB | <span className="font-semibold">HDD:</span> {detail.almacenamiento}</div>
                                    <div><span className="font-semibold">OS:</span> {detail.sistema_operativo}</div>
                                </div>
                            </td>
                            <td className="py-2">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${detail.hardware_asset?.estado === 'Operativo' ? 'border-green-300 text-green-700' :
                                        detail.hardware_asset?.estado === 'En Mantenimiento' ? 'border-yellow-300 text-yellow-700' :
                                            detail.hardware_asset?.estado === 'En Reparación' ? 'border-orange-300 text-orange-700' :
                                                'border-gray-300 text-gray-700'
                                    }`}>
                                    {detail.hardware_asset?.estado}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-8 pt-4 border-t text-xs text-gray-400 flex justify-between">
                <p>Generado automáticamente por el sistema.</p>
                <p>Página 1 de 1</p>
            </div>

            <style>{`
                @media print {
                    @page { size: landscape; margin: 1cm; }
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                }
            `}</style>
        </div>
    );
}
