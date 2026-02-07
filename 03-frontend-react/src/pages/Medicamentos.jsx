import React, { useState, useEffect } from 'react';
import { Search, Filter, Pill, ShoppingCart } from 'lucide-react';

const Medicamentos = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const categorias = [
    'Todos',
    'Analgésicos',
    'Antibióticos',
    'Antigripales',
    'Digestivos',
    'Dermatológicos',
    'Vitaminas'
  ];

  // Datos de ejemplo (reemplazar con API real)
  const medicamentosEjemplo = [
    {
      id: 1,
      nombre: 'Paracetamol 500mg',
      descripcion: 'Analgésico y antipirético',
      precio: 5.99,
      stock: 50,
      categoria: 'Analgésicos',
      farmacia: 'Farmacia Central',
      imagen: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      nombre: 'Amoxicilina 500mg',
      descripcion: 'Antibiótico de amplio espectro',
      precio: 12.99,
      stock: 30,
      categoria: 'Antibióticos',
      farmacia: 'Farmacia Salud',
      imagen: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      nombre: 'Ibuprofeno 400mg',
      descripcion: 'Antiinflamatorio no esteroideo',
      precio: 7.50,
      stock: 40,
      categoria: 'Analgésicos',
      farmacia: 'Farmacia 24 Horas',
      imagen: 'https://via.placeholder.com/150'
    },
    {
      id: 4,
      nombre: 'Omeprazol 20mg',
      descripcion: 'Inhibidor de bomba de protones',
      precio: 15.75,
      stock: 25,
      categoria: 'Digestivos',
      farmacia: 'Farmacia Central',
      imagen: 'https://via.placeholder.com/150'
    },
    {
      id: 5,
      nombre: 'Vitamina C 1000mg',
      descripcion: 'Suplemento vitamínico',
      precio: 9.99,
      stock: 60,
      categoria: 'Vitaminas',
      farmacia: 'Farmacia Salud',
      imagen: 'https://via.placeholder.com/150'
    },
    {
      id: 6,
      nombre: 'Loratadina 10mg',
      descripcion: 'Antihistamínico',
      precio: 8.25,
      stock: 35,
      categoria: 'Dermatológicos',
      farmacia: 'Farmacia 24 Horas',
      imagen: 'https://via.placeholder.com/150'
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setMedicamentos(medicamentosEjemplo);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredMedicamentos = medicamentos.filter(med => {
    const matchesSearch = med.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Todos' || 
                           med.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (medicamento) => {
    console.log('Agregar al carrito:', medicamento);
    // Implementar lógica del carrito
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Cargando medicamentos...</p>
        </div>
      </div>
    );
  }

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
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de medicamentos */}
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
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Agregar al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMedicamentos.length === 0 && (
        <div className="text-center py-12">
          <Pill className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron medicamentos</h3>
          <p className="text-gray-600">Intenta con otros términos de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default Medicamentos;