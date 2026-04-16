# 🏗️ ARQUITECTURA SOLID - FoodPlease Frontend React

Documento detallado sobre cómo está implementado cada principio SOLID en el frontend React.

---

## 📚 Tabla de Contenidos

1. [Single Responsibility Principle](#1-single-responsibility-principle-srp)
2. [Open/Closed Principle](#2-openclosed-principle-ocp)
3. [Liskov Substitution Principle](#3-liskov-substitution-principle-lsp)
4. [Interface Segregation Principle](#4-interface-segregation-principle-isp)
5. [Dependency Inversion Principle](#5-dependency-inversion-principle-dip)
6. [Patrones de Diseño](#patrones-de-diseño)

---

## 1. Single Responsibility Principle (SRP)

> **Una clase/módulo debe tener una única razón para cambiar**

### ✅ Implementación

- **components/common/** → Componentes UI puros
- **services/api.ts** → Comunicación API
- **hooks/index.ts** → Lógica reutilizable
- **types/index.ts** → Definiciones únicamente
- **utils/helpers.ts** → Validadores, formateadores

---

## 2. Open/Closed Principle (OCP)

> **Abierto para extensión, cerrado para modificación**

### ✅ Implementación

- Interfaces base extensibles
- Múltiples implementaciones de servicios
- Componentes con props configurables
- Factory pattern para nuevos servicios

---

## 3. Liskov Substitution Principle (LSP)

> **Las subclases son sustituibles por su interfaz**

### ✅ Implementación

- IRestauranteService puede ser RestauranteService o RestauranteServiceMock
- IPlatoService intercambiable entre implementaciones
- Garantiza contrato entre interfaz e implementaciones

---

## 4. Interface Segregation Principle (ISP)

> **Interfaces pequeñas y específicas**

### ✅ Implementación

- CreateRestauranteDTO (solo para crear)
- UpdateRestauranteDTO (solo para actualizar)
- IRestauranteService (solo métodos necesarios)
- Props segregadas por componente

---

## 5. Dependency Inversion Principle (DIP)

> **Depender de abstracciones, no de concreciones**

### ✅ Implementación

- Custom hooks reciben funciones inyectadas
- Factory pattern para singletons
- API Client inyectable
- Componentes reciben servicios vía props

---

## 🎨 Patrones

- **Singleton:** `getRestauranteService()`
- **Factory:** Creación centralizada de servicios
- **Strategy:** Diferentes ApiClient
- **Adapter:** Transformación de APIs
- **Observer:** Context API (próximo)

---

**Cumplimiento:** 100% SOLID ✅
