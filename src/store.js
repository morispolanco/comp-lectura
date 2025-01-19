import { create } from 'zustand';
import { materiales } from './data/lecturas';

// Obtener el número total de lecturas disponibles
const totalLecturas = materiales.principiante?.length || 0;

const useStore = create((set) => ({
  mensajes: [],
  nivelLectura: 'principiante',
  lecturaActual: 0,
  progreso: {
    comprension: 0,
    vocabulario: 0,
    pensamiento_critico: 0
  },
  agregarMensaje: (mensaje) => 
    set((state) => ({ 
      mensajes: [...state.mensajes, mensaje] 
    })),
  actualizarProgreso: (nuevoProgreso) =>
    set((state) => ({
      progreso: { ...state.progreso, ...nuevoProgreso }
    })),
  setNivelLectura: (nivel) =>
    set({ nivelLectura: nivel }),
  setLecturaActual: (indice) =>
    set({ lecturaActual: indice % totalLecturas })
}));

export default useStore;
