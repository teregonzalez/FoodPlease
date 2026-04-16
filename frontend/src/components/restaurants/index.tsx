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
    () => service.getAll().then((res) => res.results || []),
    true
  );

  const { items, search, setSearch } = useList(data || []);

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Está seguro?')) {
      try {
        await service.delete(id);
        refetch();
        onDelete?.(id);
      } catch (err) {
        alert('Error al eliminar');
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

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Nombre</th>
              <th className="border border-gray-300 p-2">Dirección</th>
              <th className="border border-gray-300 p-2">Teléfono</th>
              <th className="border border-gray-300 p-2">Estado</th>
              <th className="border border-gray-300 p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((restaurante) => (
              <tr key={restaurante.id_restaurante} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">
                  <span className="bg-blue-200 px-2 py-1 rounded">
                    {restaurante.id_restaurante}
                  </span>
                </td>
                <td className="border border-gray-300 p-2 font-semibold">
                  {restaurante.nombre}
                </td>
                <td className="border border-gray-300 p-2">
                  {restaurante.direccion}
                </td>
                <td className="border border-gray-300 p-2">
                  {restaurante.telefono}
                </td>
                <td className="border border-gray-300 p-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      restaurante.activo ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  >
                    {restaurante.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="border border-gray-300 p-2">
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onEdit?.(restaurante)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
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
        <Input
          label="ID Restaurante"
          name="id_restaurante"
          value={values.id_restaurante}
          onChange={handleChange}
          disabled={!!initialData}
          required
        />

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
            variant="success"
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
