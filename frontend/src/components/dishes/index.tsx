import React, { useState } from 'react';
import { IPlato, CreatePlatoDTO } from '../../types';
import {
  Button,
  Card,
  Input,
  Alert,
  Spinner,
  EmptyState,
} from '../common';
import { useAsync, useForm, useList } from '../../hooks';
import { getPlatoService } from '../../services/api';


export interface PlatoListProps {
  restauranteId?: string;
  onEdit?: (plato: IPlato) => void;
  onDelete?: (id: string) => void;
}

export const PlatoList: React.FC<PlatoListProps> = ({
  restauranteId,
  onEdit,
  onDelete,
}) => {
  const service = getPlatoService();
  const { status, data, error, refetch } = useAsync(
    () =>
      service.getAll(restauranteId ? { restaurante_id: restauranteId } : {}),
    true,
    [restauranteId]
  );

  const { items, search, setSearch } = useList(Array.isArray(data) ? data : []);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Está seguro?')) {
      try {
        await service.delete(id);
        await refetch();
        onDelete?.(id);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
        alert(`Error al eliminar: ${errorMsg}`);
      }
    }
  };

  if (status === 'loading') return <Spinner />;
  if (status === 'error')
    return (
      <Alert type="error" message={error?.message || 'Error loading'} />
    );
  if (!items.length)
    return <EmptyState message="No hay platos disponibles" />;

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Buscar plato..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((plato) => (
          <Card key={plato.id_plato} title={plato.nombre}>
            <div className="space-y-2">
              <p className="text-sm" style={{ color: '#6b7280' }}>{plato.descripcion}</p>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg" style={{ color: '#1F2937' }}>
                  ${plato.precio.toFixed(2)}
                </span>
                <span
                  style={{
                    fontSize: '0.875rem',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    backgroundColor: plato.disponible ? '#f0fdf4' : '#fef2f2',
                    color: plato.disponible ? '#15803d' : '#991b1b',
                    fontWeight: 'bold',
                  }}
                >
                  {plato.disponible ? 'Disponible' : 'No disponible'}
                </span>
              </div>

              <p className="text-xs" style={{ color: '#6b7280' }}>
                Tiempo: {plato.tiempo_preparacion} min
              </p>

              <p className="text-xs" style={{ color: '#6b7280' }}>
                Ingredientes: {plato.ingredientes}
              </p>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => onEdit?.(plato)}
                >
                  Editar
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDelete(plato.id_plato)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ============================================
// FORM PLATO
// ============================================

export interface PlatoFormProps {
  restauranteId: string;
  initialData?: IPlato;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const PlatoForm: React.FC<PlatoFormProps> = ({
  restauranteId,
  initialData,
  onSuccess,
  onCancel,
}) => {
  const service = getPlatoService();
  const [submitError, setSubmitError] = useState<string>();

  const initialValues: CreatePlatoDTO = initialData
    ? {
        restaurante: initialData.restaurante,
        nombre: initialData.nombre,
        descripcion: initialData.descripcion,
        precio: initialData.precio,
        tiempo_preparacion: initialData.tiempo_preparacion,
        ingredientes: initialData.ingredientes,
      }
    : {
        restaurante: restauranteId,
        nombre: '',
        descripcion: '',
        precio: 0,
        tiempo_preparacion: 15,
        ingredientes: '',
      };

  const {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    reset,
  } = useForm(initialValues, async (formValues) => {
    try {
      if (initialData) {
        await service.update(initialData.id_plato, formValues);
      } else {
        await service.create(formValues);
      }
      reset();
      onSuccess?.();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Error');
      throw err;
    }
  });

  return (
    <Card title={initialData ? 'Editar Plato' : 'Crear Plato'}>
      {submitError && (
        <Alert
          type="error"
          message={submitError}
          onClose={() => setSubmitError(undefined)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre"
          name="nombre"
          value={values.nombre}
          onChange={handleChange}
          required
        />

        <Input
          label="Descripción"
          name="descripcion"
          value={values.descripcion}
          onChange={handleChange}
          required
        />

        <Input
          label="Precio"
          name="precio"
          type="number"
          step="0.01"
          value={values.precio}
          onChange={handleChange}
          min="0"
          required
        />

        <Input
          label="Tiempo Preparación (minutos)"
          name="tiempo_preparacion"
          type="number"
          value={values.tiempo_preparacion}
          onChange={handleChange}
          min="1"
          max="120"
          required
        />

        <Input
          label="Ingredientes"
          name="ingredientes"
          value={values.ingredientes}
          onChange={handleChange}
          placeholder="separados por comas"
          required
        />

        <div className="flex gap-2">
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
          >
            {initialData ? 'Actualizar' : 'Crear'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
};
