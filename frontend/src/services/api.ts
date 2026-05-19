import {
  IRestaurante,
  IPlato,
  CreateRestauranteDTO,
  UpdateRestauranteDTO,
  CreatePlatoDTO,
  UpdatePlatoDTO,
  IPlatoDetail,
  IApiListResponse,
} from '../types';
import { Capacitor } from '@capacitor/core';

/**
 * API Base Client
 * SOLID: SRP - Solo responsable de requests HTTP
 * Soporta tanto navegador web como aplicaciones nativas (iOS/Android)
 */
class ApiClient {
  private baseURL: string;
  private headers: HeadersInit;
  private isNative: boolean;

  constructor(baseURL?: string) {
    this.isNative = Capacitor.isNativePlatform();
    
    // Resolver URL del backend dinámicamente
    if (baseURL) {
      this.baseURL = baseURL;
    } else {
      this.baseURL = this.resolveBackendURL();
    }

    this.headers = {
      'Content-Type': 'application/json',
    };

    console.log(`[ApiClient] Inicializado - Plataforma: ${this.isNative ? 'Nativa' : 'Web'} - URL: ${this.baseURL}`);
  }

  /**
   * Resolver la URL del backend según el entorno
   * En desarrollo: http://localhost:5000/api
   * En producción (GitHub Pages): https://foodplease-3.onrender.com/api
   */
  private resolveBackendURL(): string {
    // 1. Verificar si existe variable de entorno explícita (tiene máxima prioridad)
    const envURL = import.meta.env.VITE_BACKEND_URL;
    if (envURL) {
      return envURL;
    }

    // 2. Comprobar si estamos en modo producción (al hacer npm run build / deploy)
    const isProd = import.meta.env.PROD;

    // URLs por defecto según plataforma
    if (this.isNative) {
      // En dispositivo nativo
      return isProd 
        ? 'https://foodplease-3.onrender.com/api' // <--- URL DE RENDER PARA NATIVO
        : 'http://localhost:5000/api';
    } else {
      // En navegador web
      return isProd
        ? 'https://foodplease-3.onrender.com/api' // <--- URL DE RENDER PARA GITHUB PAGES
        : 'http://127.0.0.1:5000/api';
    }
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.headers,
        ...(options.headers as HeadersInit),
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

/**
 * Restaurante API Service
 * SOLID: SRP - Solo responsable de operaciones de Restaurante
 * SOLID: DIP - Depende de abstracciones (interfaces)
 */
export interface IRestauranteService {
  getAll(): Promise<IApiListResponse<IRestaurante>>;
  getById(id: string): Promise<IRestaurante>;
  create(data: CreateRestauranteDTO): Promise<IRestaurante>;
  update(id: string, data: UpdateRestauranteDTO): Promise<IRestaurante>;
  delete(id: string): Promise<void>;
  getActivos(): Promise<IRestaurante[]>;
  getPlatos(id: string): Promise<IPlatoDetail[]>;
}

export class RestauranteService implements IRestauranteService {
  constructor(private apiClient: ApiClient = new ApiClient()) {}

  async getAll(): Promise<IApiListResponse<IRestaurante>> {
    return this.apiClient.get<IApiListResponse<IRestaurante>>(
      '/restaurantes/'
    );
  }

  async getById(id: string): Promise<IRestaurante> {
    return this.apiClient.get<IRestaurante>(`/restaurantes/${id}/`);
  }

  async create(data: CreateRestauranteDTO): Promise<IRestaurante> {
    return this.apiClient.post<IRestaurante>('/restaurantes/', data);
  }

  async update(
    id: string,
    data: UpdateRestauranteDTO
  ): Promise<IRestaurante> {
    return this.apiClient.put<IRestaurante>(`/restaurantes/${id}/`, data);
  }

  async delete(id: string): Promise<void> {
    await this.apiClient.delete<void>(`/restaurantes/${id}/`);
  }

  async getActivos(): Promise<IRestaurante[]> {
    const response = await this.apiClient.get<IRestaurante[]>(
      '/restaurantes/activos/'
    );
    return Array.isArray(response) ? response : [];
  }

  async getPlatos(id: string): Promise<IPlatoDetail[]> {
    const response = await this.apiClient.get<IPlatoDetail[]>(
      `/restaurantes/${id}/platos/`
    );
    return Array.isArray(response) ? response : [];
  }
}

/**
 * Plato API Service
 * SOLID: SRP - Solo responsable de operaciones de Plato
 * SOLID: OCP - Extendible sin modificar código existente
 */
export interface IPlatoService {
  getAll(params?: { restaurante_id?: string }): Promise<IApiListResponse<IPlato>>;
  getById(id: string): Promise<IPlato>;
  create(data: CreatePlatoDTO): Promise<IPlato>;
  update(id: string, data: UpdatePlatoDTO): Promise<IPlato>;
  delete(id: string): Promise<void>;
  getDisponibles(): Promise<IPlato[]>;
}

export class PlatoService implements IPlatoService {
  constructor(private apiClient: ApiClient = new ApiClient()) {}

  async getAll(params?: { restaurante_id?: string }): Promise<IApiListResponse<IPlato>> {
    const query =
      params?.restaurante_id
        ? `?restaurante_id=${params.restaurante_id}`
        : '';
    return this.apiClient.get<IApiListResponse<IPlato>>(`/platos/${query}`);
  }

  async getById(id: string): Promise<IPlato> {
    return this.apiClient.get<IPlato>(`/platos/${id}/`);
  }

  async create(data: CreatePlatoDTO): Promise<IPlato> {
    return this.apiClient.post<IPlato>('/platos/', data);
  }

  async update(id: string, data: UpdatePlatoDTO): Promise<IPlato> {
    return this.apiClient.put<IPlato>(`/platos/${id}/`, data);
  }

  async delete(id: string): Promise<void> {
    await this.apiClient.delete<void>(`/platos/${id}/`);
  }

  async getDisponibles(): Promise<IPlato[]> {
    const response = await this.apiClient.get<IPlato[]>(
      '/platos/disponibles/'
    );
    return Array.isArray(response) ? response : [];
  }
}

// ============================================
// SERVICE FACTORY (Singleton Pattern)
// ============================================

let restauranteService: IRestauranteService | null = null;
let platoService: IPlatoService | null = null;

export function getRestauranteService(): IRestauranteService {
  if (!restauranteService) {
    restauranteService = new RestauranteService();
  }
  return restauranteService;
}

export function getPlatoService(): IPlatoService {
  if (!platoService) {
    platoService = new PlatoService();
  }
  return platoService;
}