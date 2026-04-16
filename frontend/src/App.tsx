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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-red-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">🍕 FoodPlease Admin</h1>
          <p className="text-red-100">Gestión de Restaurantes y Menú</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setView('restaurants')}
              className={`px-4 py-2 rounded font-semibold transition ${
                view === 'restaurants' || view === 'edit-restaurant'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              📋 Restaurantes
            </button>
            <button
              onClick={() => setView('dishes')}
              className={`px-4 py-2 rounded font-semibold transition ${
                view === 'dishes' ||
                view === 'create-dish' ||
                view === 'edit-dish'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              disabled={!selectedRestaurante}
            >
              🍴 Platos
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
              <h2 className="text-2xl font-bold">Restaurantes</h2>
              <button
                onClick={handleCreateRestaurante}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                ➕ Nuevo Restaurante
              </button>
            </div>
            <RestauranteList
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
                <h3 className="text-xl font-bold">Platos del Restaurante</h3>
                <button
                  onClick={handleCreateDish}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  ➕ Nuevo Plato
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
              <h2 className="text-2xl font-bold">
                Platos de {selectedRestaurante.nombre}
              </h2>
              <button
                onClick={handleCreateDish}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                ➕ Nuevo Plato
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
      <footer className="bg-gray-800 text-white text-center py-4 mt-12" style={{position: "absolute", bottom: 0, width: "100%"}}>
        <p>
          FoodPlease © 2024 - Frontend React con Patrones SOLID
        </p>
      </footer>
    </div>
  );
};

export default App;
