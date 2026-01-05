import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Model3D } from '../types/types';

interface ModelStore {
  models: Model3D[];
  addModel: (model: Model3D) => void;
  removeModel: (id: string) => void;
  getModel: (id: string) => Model3D | undefined;
}

export const useModelStore = create<ModelStore>()(
  persist(
    (set, get) => ({
      models: [],
      
      addModel: (model) => {
        set((state) => ({
          models: [...state.models, model]
        }));
      },
      
      removeModel: (id) => {
        set((state) => ({
          models: state.models.filter((m) => m.id !== id)
        }));
      },
      
      getModel: (id) => {
        return get().models.find((m) => m.id === id);
      }
    }),
    {
      name: 'ar-models-storage',
      // Store full model data including data URLs
      // File objects are optional and won't be persisted
      partialize: (state) => ({
        models: state.models.map(({ file, ...rest }) => rest)
      })
    }
  )
);
