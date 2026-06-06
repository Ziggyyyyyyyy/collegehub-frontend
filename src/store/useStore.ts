import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { College } from '@/types';

interface CollegeStore {
  savedColleges: College[];
  compareColleges: College[];
  saveCollege: (college: College) => void;
  removeCollege: (collegeId: string) => void;
  addToCompare: (college: College) => void;
  removeFromCompare: (collegeId: string) => void;
  clearCompare: () => void;
}

export const useCollegeStore = create<CollegeStore>()(
  persist(
    (set, get) => ({
      savedColleges: [],
      compareColleges: [],
      
      saveCollege: (college) => {
        const current = get().savedColleges;
        if (!current.find(c => c.id === college.id)) {
          set({ savedColleges: [...current, college] });
        }
      },
      
      removeCollege: (collegeId) => {
        set({ 
          savedColleges: get().savedColleges.filter(c => c.id !== collegeId) 
        });
      },
      
      addToCompare: (college) => {
        const current = get().compareColleges;
        if (current.length < 3 && !current.find(c => c.id === college.id)) {
          set({ compareColleges: [...current, college] });
        }
      },
      
      removeFromCompare: (collegeId) => {
        set({ 
          compareColleges: get().compareColleges.filter(c => c.id !== collegeId) 
        });
      },
      
      clearCompare: () => {
        set({ compareColleges: [] });
      }
    }),
    {
      name: 'college-storage'
    }
  )
);
