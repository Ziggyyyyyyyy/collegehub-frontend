export interface Course {
  id: string;
  name: string;
  duration: string;
  fees: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface PlacementStat {
  year: number;
  average: number;
  highest: number;
  percentage: number;
}

export interface College {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  fees: number;
  rating: number;
  courses: string[];
  detailedCourses: Course[];
  placements: {
    average: number;
    highest: number;
    percentage: number;
    topRecruiters: string[];
    stats: PlacementStat[];
  };
  reviews: {
    count: number;
    average: number;
    list: Review[];
  };
  ranking: number;
  established: number;
  type: 'Private' | 'Public';
  studentCount: number;
  facultyCount: number;
  campusSize: number;
  accreditation: string;
  description: string;
  highlights: string[];
  similarCollegeIds: string[];
}

export interface FilterOptions {
  search: string;
  location: string[];
  minFees: number;
  maxFees: number;
  minRating: number;
  courses: string[];
}

export interface SortOption {
  value: string;
  label: string;
}

export interface Filter {
  id: string;
  label: string;
  value: string;
  type: 'location' | 'course' | 'fees' | 'rating';
}
