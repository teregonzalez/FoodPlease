import React, { useState } from 'react';
import { IRestaurante, CreateRestauranteDTO } from '../../types';
import {
  Button,
  Card,
  Input,
  Alert,
  Spinner,
  EmptyState,
} from '../common';
import { useAsync, useForm, useList } from '../../hooks';
import { getRestauranteService } from '../../services/api';

export interface RestauranteListProps {
  onEdit?: (restaurante: IRestaurante) => void;
  onDelete?: (id: string) => void;
}

export const RestauranteList: React.FC<RestauranteListProps> = ({
  onEdit,
  onDelete,
}) => {
  const service = getRestauranteService();
  const { status, data, error, refetch } = useAsync(
    () => service.getAll(),
    true
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
    return (
      <EmptyState message="No hay restaurantes todavía" />
    );

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Buscar restaurante..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto" style={{ borderRadius: '8px', overflow: 'hidden' }}>
        <table className="w-full border-collapse" style={{ borderColor: '#d1d5db' }}>
          <thead style={{ backgroundColor: '#1F2937', color: '#FFFFFF' }}>
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Dirección</th>
              <th className="p-3 text-left">Teléfono</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((restaurante) => (
              <tr key={restaurante.id_restaurante} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td className="p-3" style={{ backgroundColor: '#f9fafb', fontWeight: 'bold' }}>
                  {restaurante.id_restaurante}
                </td>
                <td className="p-3" style={{ fontWeight: 'bold', color: '#1F2937' }}>
                  {restaurante.nombre}
                </td>
                <td className="p-3">
                  {restaurante.direccion}
                </td>
                <td className="p-3">
                  {restaurante.telefono}
                </td>
                <td className="p-3">
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                      backgroundColor: restaurante.activo ? '#f0fdf4' : '#fef2f2',
                      color: restaurante.activo ? '#15803d' : '#991b1b',
                      fontWeight: 'bold',
                    }}
                  >
                    {restaurante.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onEdit?.(restaurante)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleDelete(restaurante.id_restaurante)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================
// FORM RESTAURANTE
// ============================================

export interface RestauranteFormProps {
  initialData?: IRestaurante;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const RestauranteForm: React.FC<RestauranteFormProps> = ({
  initialData,
  onSuccess,
  onCancel,
}) => {
  const service = getRestauranteService();
  const [submitError, setSubmitError] = useState<string>();

  const initialValues: CreateRestauranteDTO = initialData
    ? {
        id_restaurante: initialData.id_restaurante,
        nombre: initialData.nombre,
        direccion: initialData.direccion,
        telefono: initialData.telefono,
        email: initialData.email,
        tiempo_promedio_preparacion:
          initialData.tiempo_promedio_preparacion,
      }
    : {
        id_restaurante: '',
        nombre: '',
        direccion: '',
        telefono: '',
        email: '',
        tiempo_promedio_preparacion: 30,
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
        await service.update(initialData.id_restaurante, formValues);
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
    <Card title={initialData ? 'Editar Restaurante' : 'Crear Restaurante'}>
      {submitError && (
        <Alert
          type="error"
          message={submitError}
          onClose={() => setSubmitError(undefined)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {initialData && (
          <Input
            label="ID Restaurante"
            name="id_restaurante"
            value={values.id_restaurante}
            onChange={handleChange}
            disabled={true}
            required
          />
        )}

        <Input
          label="Nombre"
          name="nombre"
          value={values.nombre}
          onChange={handleChange}
          required
        />

        <Input
          label="Dirección"
          name="direccion"
          value={values.direccion}
          onChange={handleChange}
          required
        />

        <Input
          label="Teléfono"
          name="telefono"
          value={values.telefono}
          onChange={handleChange}
          required
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Tiempo Preparación (minutos)"
          name="tiempo_promedio_preparacion"
          type="number"
          value={values.tiempo_promedio_preparacion}
          onChange={handleChange}
          min="5"
          max="120"
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
