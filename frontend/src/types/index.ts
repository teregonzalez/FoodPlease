/**
 * Tipos TypeScript para FoodPlease
 * SOLID: ISP - Interfaces pequeñas y específicas
 */

// ============================================
// MODELOS DE DATOS
// ============================================

export interface IRestaurante {
  id_restaurante: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  tiempo_promedio_preparacion: number;
  activo: boolean;
  fecha_registro: string;
}

export interface IPlato {
  id_plato: string;
  restaurante: string;
  nombre: string;
  descripcion: string;
  precio: number;
  tiempo_preparacion: number;
  ingredientes: string;
  disponible: boolean;
  fecha_creacion: string;
}

export interface IPlatoDetail extends IPlato {
  restaurante_nombre: string;
}

// ============================================
// DTOs (Data Transfer Objects)
// ============================================

export interface CreateRestauranteDTO {
  id_restaurante: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  tiempo_promedio_preparacion: number;
}

export interface UpdateRestauranteDTO
  extends Partial<CreateRestauranteDTO> {}

export interface CreatePlatoDTO {
  restaurante: string;
  nombre: string;
  descripcion: string;
  precio: number;
  tiempo_preparacion: number;
  ingredientes: string;
}

export interface UpdatePlatoDTO extends Partial<CreatePlatoDTO> {}

// ============================================
// RESPONSES DE API
// ============================================

export interface IApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface IApiListResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

// ============================================
// ESTADOS DE COMPONENTES
// ============================================

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  status: AsyncStatus;
  data: T | null;
  error: Error | null;
}

// ============================================
// FORM STATES
// ============================================

export interface IFormErrors {
  [key: string]: string[];
}

export interface IFormState {
  values: Record<string, any>;
  errors: IFormErrors;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
}
