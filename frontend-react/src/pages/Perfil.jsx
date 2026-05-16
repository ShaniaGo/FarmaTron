/**

 * Página de perfil del usuario: datos personales, foto de perfil, seguridad y preferencias.

 * @module pages/Perfil

 */



import React, { useState, useRef, useEffect } from 'react';

import { User, Mail, Phone, MapPin, Shield, CreditCard, Bell, Key, Camera, Loader2 } from 'lucide-react';

import { toast } from 'react-hot-toast';

import { useAuth } from '../context/AuthContext';

import api from '../api';

import { getFotoPerfilUrl } from '../utils/profilePhoto';



const Perfil = () => {

    const { user, updateUser } = useAuth();

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({ ...user });

    const [uploadingPhoto, setUploadingPhoto] = useState(false);

    const [previewUrl, setPreviewUrl] = useState(null);

    const fileInputRef = useRef(null);



    useEffect(() => {

        setFormData({ ...user });

        setPreviewUrl(null);

    }, [user]);



    const fotoUrl = previewUrl || getFotoPerfilUrl(user);



    const handleInputChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };



    const handleSave = () => {

        setIsEditing(false);

    };



    const handlePhotoClick = () => {

        fileInputRef.current?.click();

    };



    const handlePhotoChange = async (e) => {

        const file = e.target.files?.[0];

        if (!file) return;



        if (!file.type.startsWith('image/')) {

            toast.error('Selecciona una imagen válida (JPG, PNG o WebP)');

            return;

        }



        if (file.size > 2 * 1024 * 1024) {

            toast.error('La imagen no debe superar 2 MB');

            return;

        }



        const localPreview = URL.createObjectURL(file);

        setPreviewUrl(localPreview);

        setUploadingPhoto(true);



        const data = new FormData();

        data.append('foto', file);



        try {

            const res = await api.post('/profile/upload-photo', data);



            if (res.data?.success) {

                const usuario = res.data.data?.usuario || {};

                updateUser({

                    ...usuario,

                    foto_perfil: usuario.foto_perfil,

                    foto_perfil_url: res.data.data?.foto_perfil_url || getFotoPerfilUrl(usuario),

                });

                setPreviewUrl(null);

                toast.success('Foto de perfil guardada');

            } else {

                toast.error(res.data?.message || 'No se pudo guardar la foto');

                setPreviewUrl(null);

            }

        } catch (err) {

            const msg = err.response?.data?.message

                || err.response?.data?.errors?.foto?.[0]

                || 'Error al subir la foto';

            toast.error(msg);

            setPreviewUrl(null);

        } finally {

            setUploadingPhoto(false);

            URL.revokeObjectURL(localPreview);

            if (fileInputRef.current) {

                fileInputRef.current.value = '';

            }

        }

    };



    return (

        <div className="container mx-auto px-4 py-8">

            <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Perfil</h1>



            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2">

                <div className="bg-white rounded-lg shadow-md overflow-hidden">

                    <div className="p-6">

                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-xl font-semibold text-gray-900">Información Personal</h2>

                        <button

                        type="button"

                        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}

                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"

                        >

                        {isEditing ? 'Guardar Cambios' : 'Editar Perfil'}

                        </button>

                    </div>



                    <div className="space-y-6">

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

                        <div className="relative group">

                            <div className="w-24 h-24 rounded-full overflow-hidden bg-primary-100 flex items-center justify-center border-2 border-primary-200">

                                {fotoUrl ? (

                                    <img

                                        src={fotoUrl}

                                        alt="Foto de perfil"

                                        className="w-full h-full object-cover"

                                    />

                                ) : (

                                    <User className="h-10 w-10 text-primary-600" />

                                )}

                                {uploadingPhoto && (

                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full">

                                        <Loader2 className="h-8 w-8 text-white animate-spin" />

                                    </div>

                                )}

                            </div>

                            <button

                                type="button"

                                onClick={handlePhotoClick}

                                disabled={uploadingPhoto}

                                className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"

                                title="Cambiar foto"

                            >

                                <Camera className="h-4 w-4" />

                            </button>

                            <input

                                ref={fileInputRef}

                                type="file"

                                accept="image/jpeg,image/png,image/jpg,image/webp"

                                className="hidden"

                                onChange={handlePhotoChange}

                            />

                        </div>

                        <div>

                            <p className="text-sm text-gray-600 mb-1">Foto de perfil</p>

                            <p className="text-xs text-gray-500 mb-2">

                                JPG, PNG o WebP. Máximo 2 MB.

                            </p>

                            <button

                                type="button"

                                onClick={handlePhotoClick}

                                disabled={uploadingPhoto}

                                className="text-sm text-primary-600 hover:text-primary-800 font-medium disabled:opacity-50"

                            >

                                {uploadingPhoto ? 'Guardando...' : 'Subir o cambiar foto'}

                            </button>

                            <p className="text-sm text-gray-600 mt-4">Miembro desde</p>

                            <p className="font-medium">

                            {user?.fecha_registro

                                ? new Date(user.fecha_registro).toLocaleDateString('es-ES', {

                                    year: 'numeric',

                                    month: 'long',

                                })

                                : '—'}

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

                                    value={`${user?.primer_nombre || ''} ${user?.segundo_nombre || ''} ${user?.primer_apellido || ''} ${user?.segundo_apellido || ''}`.trim()}

                                    onChange={handleInputChange}

                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"

                                    readOnly

                                />

                                ) : (

                                <p className="px-4 py-2 bg-gray-50 rounded-lg">

                                    {user?.nombre || `${user?.primer_nombre || ''} ${user?.segundo_nombre || ''} ${user?.primer_apellido || ''} ${user?.segundo_apellido || ''}`.trim()}

                                </p>

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

                                    value={formData?.email ?? ''}

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

                                    value={formData?.telefono ?? ''}

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

                                    value={formData?.direccion ?? ''}

                                    onChange={handleInputChange}

                                    rows="3"

                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"

                                />

                                ) : (

                                <p className="px-4 py-2 bg-gray-50 rounded-lg">{user?.direccion || '—'}</p>

                                )}

                            </div>



                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">

                                <div className="flex items-center gap-2">

                                    <MapPin className="h-4 w-4" />

                                    Rol de usuario

                                </div>

                                </label>

                                <p className="px-4 py-2 bg-gray-50 rounded-lg capitalize">{user?.tipo || '—'}</p>

                            </div>

                        </div>

                    </div>

                    </div>

                </div>

                </div>



                <div className="space-y-6">

                <div className="bg-white rounded-lg shadow-md p-6">

                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">

                    <Shield className="h-5 w-5" />

                    Seguridad

                    </h3>

                    <button type="button" className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">

                    <div className="flex items-center gap-3">

                        <Key className="h-5 w-5 text-gray-600" />

                        <span>Cambiar Contraseña</span>

                    </div>

                    <span className="text-primary-600">→</span>

                    </button>

                </div>



                <div className="bg-white rounded-lg shadow-md p-6">

                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">

                    <CreditCard className="h-5 w-5" />

                    Métodos de Pago

                    </h3>

                    <div className="space-y-3">

                    <div className="p-3 border border-gray-200 rounded-lg">

                        <div className="flex justify-between items-center">

                        <div>

                            <p className="font-medium">Pago Móvil</p>

                            <p className="text-sm text-gray-600">Banco de Venezuela</p>

                        </div>

                        <button type="button" className="text-primary-600 hover:text-primary-800 text-sm">

                            Editar

                        </button>

                        </div>

                    </div>

                    <button type="button" className="w-full py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-primary-600 hover:border-primary-600">

                        + Agregar método de pago

                    </button>

                    </div>

                </div>



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


