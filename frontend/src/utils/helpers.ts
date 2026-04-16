/**
 * Utilidades para validación
 * SOLID: SRP - Solo responsable de validaciones
 */

export const validators = {
  /**
   * Validar ID de restaurante
   */
  restauranteId: (value: string): boolean => {
    return /^[A-Z]{3,5}\d{3,4}$/.test(value);
  },

  /**
   * Validar email
   */
  email: (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  },

  /**
   * Validar teléfono
   */
  phone: (value: string): boolean => {
    return /^(\+?56)?[\s]?[0-9]{9}$/.test(value);
  },

  /**
   * Validar precio
   */
  price: (value: number): boolean => {
    return value > 0 && value <= 999999;
  },

  /**
   * Validar time (minutos)
   */
  time: (value: number): boolean => {
    return value >= 1 && value <= 1440;
  },
};

/**
 * Formateadores
 * SOLID: SRP - Solo responsable de formateo
 */

export const formatters = {
  /**
   * Formatear precio a moneda
   */
  price: (value: number): string => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(value);
  },

  /**
   * Formatear fecha
   */
  date: (value: string): string => {
    return new Date(value).toLocaleDateString('es-CL');
  },

  /**
   * Formatear tiempo
   */
  time: (minutes: number): string => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  },
};

/**
 * Helpers para manejo de errores
 * SOLID: SRP - Solo responsable de errores
 */

export const errorHandlers = {
  /**
   * Parsear error de API
   */
  parseApiError: (error: any): string => {
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    if (error.detail) return error.detail;
    return 'Ocurrió un error inesperado';
  },

  /**
   * Mostrar error en consola
   */
  log: (error: any): void => {
    console.error('[ERROR]', error);
  },
};
