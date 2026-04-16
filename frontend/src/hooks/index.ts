import { useState, useEffect, useCallback } from 'react';
import { AsyncState, AsyncStatus } from '../types';

/**
 * Custom Hook: useAsync
 * SOLID: SRP - Solo responsable de manejar estado asíncrono
 * SOLID: DIP - Inyectable (la función es un parámetro)
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true,
  dependencies: any[] = []
): AsyncState<T> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
  });

  // useCallback para evitar recrear la función en cada render
  const execute = useCallback(async () => {
    setState({ status: 'loading', data: null, error: null });
    try {
      const response = await asyncFunction();
      setState({ status: 'success', data: response, error: null });
      return response;
    } catch (error) {
      setState({
        status: 'error',
        data: null,
        error: error instanceof Error ? error : new Error('Unknown error'),
      });
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, dependencies);

  return { ...state, refetch: execute };
}

/**
 * Custom Hook: useFetch
 * SOLID: SRP - Abstracción sobre useAsync para fetch genérico
 * SOLID: OCP - Extendible para casos específicos
 */
export function useFetch<T>(
  url: string,
  options: RequestInit = {}
): AsyncState<T> & { refetch: () => void } {
  return useAsync(
    async () => {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers as any),
        },
        ...options,
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    },
    true,
    [url]
  );
}

/**
 * Custom Hook: useForm
 * SOLID: SRP - Solo responsable de estado del formulario
 */
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  onSubmit: (values: T) => Promise<void>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const finalValue = type === 'number' ? parseFloat(value) : value;

      setValues((prevValues) => ({
        ...prevValues,
        [name]: finalValue,
      }));
    },
    []
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      setTouched((prevTouched) => ({
        ...prevTouched,
        [name]: true,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        setErrors({
          submit: [error instanceof Error ? error.message : 'Unknown error'],
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, onSubmit]
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue: (name: string, value: any) => {
      setValues((prev) => ({ ...prev, [name]: value }));
    },
  };
}

/**
 * Custom Hook: useList
 * SOLID: SRP - Manejo de listas (filtrado, paginación)
 * SOLID: OCP - Extendible para diferentes tipos de listas
 */
export function useList<T extends Record<string, any>>(items: T[] = []) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredItems = items.filter((item) => {
    if (!search) return true;
    return Object.values(item).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    );
  });

  const sortedItems = sortBy
    ? [...filteredItems].sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        const comparison = aVal > bVal ? 1 : -1;
        return sortOrder === 'asc' ? comparison : -comparison;
      })
    : filteredItems;

  return {
    items: sortedItems,
    search,
    setSearch,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    count: filteredItems.length,
  };
}
