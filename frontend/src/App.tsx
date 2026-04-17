import React, { useState } from 'react';
import { IRestaurante, IPlato } from './types';
import {
  RestauranteList,
  RestauranteForm,
} from './components/restaurants';
import { PlatoList, PlatoForm } from './components/dishes';

/**
 * Aplicación Principal
 * SOLID: SRP - Orquestación de componentes
 * Diseño: 2 colores - Gris oscuro (#1F2937) y Blanco (#FFFFFF)
 */

type View = 'restaurants' | 'dishes' | 'create-restaurant' | 'edit-restaurant' | 'create-dish' | 'edit-dish';

const App: React.FC = () => {
  const [view, setView] = useState<View>('restaurants');
  const [selectedRestaurante, setSelectedRestaurante] = useState<IRestaurante | undefined>();
  const [selectedPlato, setSelectedPlato] = useState<IPlato | undefined>();

  const handleSelectRestaurante = (restaurante: IRestaurante) => {
    setSelectedRestaurante(restaurante);
    setView('edit-restaurant');
  };

  const handleCreateRestaurante = () => {
    setSelectedRestaurante(undefined);
    setView('create-restaurant');
  };

  const handleBackToRestaurantes = () => {
    setSelectedRestaurante(undefined);
    setView('restaurants');
  };

  const handleSelectDish = (plato: IPlato) => {
    setSelectedPlato(plato);
    setView('edit-dish');
  };

  const handleCreateDish = () => {
    if (!selectedRestaurante) return;
    setSelectedPlato(undefined);
    setView('create-dish');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#1F2937' }} className="text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold">FoodPlease Admin</h1>
          <p className="mt-2 text-gray-300">Gestión de Restaurantes y Menú</p>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{ backgroundColor: '#1F2937' }} className="text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setView('restaurants')}
              className="px-4 py-2 rounded font-semibold transition"
              style={{
                backgroundColor: view === 'restaurants' || view === 'edit-restaurant' ? '#ffffff' : 'rgba(255,255,255,0.2)',
                color: view === 'restaurants' || view === 'edit-restaurant' ? '#1F2937' : '#ffffff',
              }}
            >
              Restaurantes
            </button>
            <button
              onClick={() => setView('dishes')}
              className="px-4 py-2 rounded font-semibold transition"
              style={{
                backgroundColor: view === 'dishes' || view === 'create-dish' || view === 'edit-dish' ? '#ffffff' : 'rgba(255,255,255,0.2)',
                color: view === 'dishes' || view === 'create-dish' || view === 'edit-dish' ? '#1F2937' : '#ffffff',
              }}
              disabled={!selectedRestaurante}
            >
              Platos
              {selectedRestaurante && (
                <span className="ml-2 text-sm">
                  ({selectedRestaurante.nombre})
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Restaurants */}
        {view === 'restaurants' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold" style={{ color: '#1F2937' }}>Restaurantes</h2>
              <button
                onClick={handleCreateRestaurante}
                className="text-white px-6 py-2 rounded font-semibold hover:shadow-lg transition"
                style={{ backgroundColor: '#1F2937' }}
              >
                + Nuevo Restaurante
              </button>
            </div>
            <RestauranteList
              key={view}
              onEdit={handleSelectRestaurante}
              onDelete={() => {}}
            />
          </div>
        )}

        {view === 'create-restaurant' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RestauranteForm
              onSuccess={handleBackToRestaurantes}
              onCancel={handleBackToRestaurantes}
            />
          </div>
        )}

        {view === 'edit-restaurant' && selectedRestaurante && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <RestauranteForm
                initialData={selectedRestaurante}
                onSuccess={handleBackToRestaurantes}
                onCancel={handleBackToRestaurantes}
              />
            </div>
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold" style={{ color: '#1F2937' }}>Platos del Restaurante</h3>
                <button
                  onClick={handleCreateDish}
                  className="text-white px-6 py-2 rounded font-semibold hover:shadow-lg transition"
                  style={{ backgroundColor: '#1F2937' }}
                >
                  + Nuevo Plato
                </button>
              </div>
              <PlatoList
                restauranteId={selectedRestaurante.id_restaurante}
                onEdit={handleSelectDish}
                onDelete={() => {}}
              />
            </div>
          </div>
        )}

        {view === 'dishes' && selectedRestaurante && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold" style={{ color: '#1F2937' }}>
                Platos de {selectedRestaurante.nombre}
              </h2>
              <button
                onClick={handleCreateDish}
                className="text-white px-6 py-2 rounded font-semibold hover:shadow-lg transition"
                style={{ backgroundColor: '#1F2937' }}
              >
                + Nuevo Plato
              </button>
            </div>
            <PlatoList
              restauranteId={selectedRestaurante.id_restaurante}
              onEdit={handleSelectDish}
              onDelete={() => {}}
            />
          </div>
        )}

        {view === 'create-dish' && selectedRestaurante && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PlatoForm
              restauranteId={selectedRestaurante.id_restaurante}
              onSuccess={() => setView('dishes')}
              onCancel={() => setView('dishes')}
            />
          </div>
        )}

        {view === 'edit-dish' && selectedPlato && selectedRestaurante && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PlatoForm
              restauranteId={selectedRestaurante.id_restaurante}
              initialData={selectedPlato}
              onSuccess={() => setView('dishes')}
              onCancel={() => setView('dishes')}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-white text-center py-6 mt-12" style={{ backgroundColor: '#1F2937', marginTop: '100px' }}>
        <p>
          FoodPlease © 2026 - Gestión de Restaurantes
        </p>
      </footer>
    </div>
  );
};

export default App;
