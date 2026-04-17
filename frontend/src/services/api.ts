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

/**
 * API Base Client
 * SOLID: SRP - Solo responsable de requests HTTP
 */
class ApiClient {
  private baseURL: string;
  private headers: HeadersInit;

  constructor(baseURL: string = 'http://127.0.0.1:5000/api') {
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json',
    };
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
