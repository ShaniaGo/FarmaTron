import React, { useState, useEffect } from 'react';
import { Search, Filter, Pill, ShoppingCart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [addingToCart, setAddingToCart] = useState(null);
  const { user } = useAuth();

  // Categorías solo se cargan una vez
  useEffect(() => {
    api.get('/productos/categorias')
      .then((res) => {
        if (res.data?.success) {
          const cats = res.data.data || [];
          setCategorias([{ id: '', nombre: 'Todos' }, ...cats]);
        }
      })
      .catch(() => {});
  }, []);

  // Medicamentos se recargan al cambiar búsqueda o filtro
  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (selectedCategory && selectedCategory !== 'Todos') params.categoria_id = selectedCategory;

        const productosRes = await api.get('/productos', { params: { ...params, per_page: 50 } });

        if (productosRes.data?.success) {
          const data = productosRes.data.data;
          const lista = data?.data ?? (Array.isArray(data) ? data : []);
          setMedicamentos(Array.isArray(lista) ? lista : []);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar medicamentos');
        setMedicamentos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicamentos();
  }, [searchTerm, selectedCategory]);

  const mapMedicamento = (med) => {
    const stockDisponible = med.stock?.filter(s => s.disponible && s.stock_actual > 0) || [];
    const precioMin = stockDisponible.length
      ? Math.min(...stockDisponible.map(s => parseFloat(s.precio_venta)))
      : parseFloat(med.precio_referencia || 0);
    const totalStock = stockDisponible.reduce((sum, s) => sum + (s.stock_actual || 0), 0);
    const farmacias = stockDisponible.map(s => s.farmacia?.nombre).filter(Boolean);

    return {
      id: med.id,
      nombre: med.nombre_comercial,
      descripcion: med.descripcion || `${med.nombre_generico || ''} ${med.concentracion || ''} - ${med.contenido || ''}`.trim() || 'Medicamento de venta en farmacias',
      precio: precioMin,
      stock: totalStock,
      categoria: med.categoria?.nombre || 'Sin categoría',
      farmacia: farmacias[0] || (farmacias.length > 1 ? `${farmacias.length} farmacias` : 'Disponible'),
      imagen: med.imagen_url,
      stockDisponible,
      requiereReceta: med.requiere_receta
    };
  };

  const filteredMedicamentos = medicamentos.map(mapMedicamento);

  const handleAddToCart = async (med) => {
    if (!user) {
      window.location.href = '/login?redirect=/medicamentos';
      return;
    }
    const stock = med.stockDisponible?.[0];
    if (!stock?.id) {
      toast.error('No hay stock disponible para este medicamento');
      return;
    }

    setAddingToCart(med.id);
    try {
      await api.post('/carrito/agregar', {
        stock_farmacia_id: Number(stock.id),
        cantidad: 1
      });
      toast.success(`${med.nombre} agregado al carrito`);
    } catch (err) {
      console.error('Error al agregar:', err);
      const msg = err.response?.data?.message || err.response?.data?.error || 'No se pudo agregar al carrito';
      toast.error(msg);
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Catálogo de Medicamentos</h1>
        <p className="text-gray-600">Encuentra los medicamentos que necesitas</p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Barra de búsqueda */}
          <div className="flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar medicamentos..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filtro por categoría */}
          <div className="w-full md:w-64">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categorias.map((cat) => (
                  <option key={cat.id ?? cat.nombre} value={cat.id ?? ''}>{cat.nombre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de medicamentos */}
      <div className="min-h-[280px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Buscando medicamentos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <Pill className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-gray-600 text-sm">Verifica que el backend esté corriendo</p>
          </div>
        ) : filteredMedicamentos.length === 0 ? (
          <div className="text-center py-16">
            <Pill className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron medicamentos</h3>
            <p className="text-gray-600">Intenta con otros términos de búsqueda o filtros</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicamentos.map((med) => (
              <div key={med.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
                  <div className="flex items-center mb-4">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                      <Pill className="h-8 w-8 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{med.nombre}</h3>
                      <p className="text-sm text-gray-600">{med.categoria}</p>
                    </div>
                  </div>
              
                  <p className="text-gray-700 mb-4">{med.descripcion}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-primary-600">${med.precio.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">Stock: {med.stock} unidades</p>
                    </div>
                    <p className="text-sm text-gray-600">{med.farmacia}</p>
                  </div>

                  <button
                    onClick={() => handleAddToCart(med)}
                    disabled={addingToCart === med.id || med.stock === 0}
                    className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {addingToCart === med.id ? 'Agregando...' : med.stock === 0 ? 'Sin stock' : 'Agregar al Carrito'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Medicamentos;