import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, CreditCard, Bell, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Perfil = () => {
  // const [user, setUser] = useState({
  //   nombre: 'Juan Pérez',
  //   email: 'juan.perez@email.com',
  //   telefono: '+1 (555) 123-4567',
  //   direccion: 'Av. Principal 123, Ciudad, País',
  //   fechaRegistro: '2024-01-01'
  // });

    const { user } = useAuth();
    console.log(user);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...user });

    const handleInputChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        // setUser(formData);
        setIsEditing(false);
        // Aquí iría la llamada a la API para actualizar
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Perfil</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna izquierda - Información personal */}
                <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Información Personal</h2>
                        <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                        {isEditing ? 'Guardar Cambios' : 'Editar Perfil'}
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                        <div className="bg-primary-100 p-4 rounded-full">
                            <User className="h-8 w-8 text-primary-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Miembro desde</p>
                            <p className="font-medium">
                            {new Date(user?.fecha_registro).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long'
                            }) }
                            </p>
                        </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Nombre Completo
                            </div>
                            </label>
                            {isEditing ? (
                            <input
                                type="text"
                                name="nombre"
                                value={user?.primer_nombre+" "+user?.segundo_nombre+' '+user?.primer_apellido+" "+user?.segundo_apellido}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            ) : (
                            <p className="px-4 py-2 bg-gray-50 rounded-lg">{user?.primer_nombre} {user?.segundo_nombre} {user?.primer_apellido} {user?.segundo_apellido}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Correo Electrónico
                            </div>
                            </label>
                            {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={user?.email ?? ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            ) : (
                            <p className="px-4 py-2 bg-gray-50 rounded-lg">{user?.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                Teléfono
                            </div>
                            </label>
                            {isEditing ? (
                            <input
                                type="tel"
                                name="telefono"
                                value={user?.telefono ?? ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            ) : (
                            <p className="px-4 py-2 bg-gray-50 rounded-lg">{user?.telefono}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Dirección
                            </div>
                            </label>
                            {isEditing ? (
                            <textarea
                                name="direccion"
                                value={user?.direccion ?? ''}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            ) : (
                            <p className="px-4 py-2 bg-gray-50 rounded-lg">{user?.direccion}</p>
                            )}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                {/* Columna derecha - Configuración y enlaces rápidos */}
                <div className="space-y-6">
                {/* Seguridad */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Seguridad
                    </h3>
                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                        <Key className="h-5 w-5 text-gray-600" />
                        <span>Cambiar Contraseña</span>
                    </div>
                    <span className="text-primary-600">→</span>
                    </button>
                </div>

                {/* Métodos de pago */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Métodos de Pago
                    </h3>
                    <div className="space-y-3">
                    <div className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-center">
                        <div>
                            <p className="font-medium">Visa •••• 1234</p>
                            <p className="text-sm text-gray-600">Principal</p>
                        </div>
                        <button className="text-primary-600 hover:text-primary-800 text-sm">
                            Editar
                        </button>
                        </div>
                    </div>
                    <button className="w-full py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-primary-600 hover:border-primary-600">
                        + Agregar método de pago
                    </button>
                    </div>
                </div>

                {/* Notificaciones */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notificaciones
                    </h3>
                    <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span>Notificaciones por email</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Notificaciones push</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;