import { College } from '@/types';

export const COLLEGES: College[] = [
  {
    id: '1',
    name: 'Indian Institute of Technology Bombay',
    location: 'Mumbai, Maharashtra',
    city: 'Mumbai',
    state: 'Maharashtra',
    fees: 248000,
    rating: 4.9,
    courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'],
    detailedCourses: [
      { id: 'c1', name: 'B.Tech Computer Science', duration: '4 Years', fees: 248000 },
      { id: 'c2', name: 'B.Tech Electrical', duration: '4 Years', fees: 248000 },
      { id: 'c3', name: 'B.Tech Mechanical', duration: '4 Years', fees: 248000 },
      { id: 'c4', name: 'M.Tech AI', duration: '2 Years', fees: 150000 }
    ],
    placements: {
      average: 2800000,
      highest: 21000000,
      percentage: 98,
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'],
      stats: [
        { year: 2023, average: 2800000, highest: 21000000, percentage: 98 },
        { year: 2022, average: 2500000, highest: 18000000, percentage: 96 },
        { year: 2021, average: 2200000, highest: 15000000, percentage: 94 }
      ]
    },
    reviews: {
      count: 1500,
      average: 4.8,
      list: [
        { id: 'r1', author: 'Rahul Sharma', rating: 5, date: '2024-03-15', text: 'Incredible campus, faculty, and placements! Best decision of my life.' },
        { id: 'r2', author: 'Priya Patel', rating: 4, date: '2024-02-20', text: 'Excellent academics and research opportunities. Campus life is amazing!' }
      ]
    },
    ranking: 1,
    established: 1958,
    type: 'Public',
    studentCount: 10000,
    facultyCount: 600,
    campusSize: 550,
    accreditation: 'AICTE',
    description: 'IIT Bombay is a public technical and research university located in Powai, Mumbai. It is renowned for its engineering programs and research contributions.',
    highlights: ['Ranked #1 in India', 'Top 50 in Asia', 'World-class research facilities', 'Strong industry connections'],
    similarCollegeIds: ['2', '3', '4']
  },
  {
    id: '2',
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi, Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    fees: 220000,
    rating: 4.8,
    courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Chemical Engineering'],
    detailedCourses: [
      { id: 'c5', name: 'B.Tech Computer Science', duration: '4 Years', fees: 220000 },
      { id: 'c6', name: 'B.Tech Electrical', duration: '4 Years', fees: 220000 },
      { id: 'c7', name: 'B.Tech Mechanical', duration: '4 Years', fees: 220000 },
      { id: 'c8', name: 'B.Tech Chemical', duration: '4 Years', fees: 220000 }
    ],
    placements: {
      average: 2500000,
      highest: 18000000,
      percentage: 96,
      topRecruiters: ['Amazon', 'Microsoft', 'Google', 'Adobe', 'Intel'],
      stats: [
        { year: 2023, average: 2500000, highest: 18000000, percentage: 96 },
        { year: 2022, average: 2200000, highest: 16000000, percentage: 94 },
        { year: 2021, average: 2000000, highest: 14000000, percentage: 92 }
      ]
    },
    reviews: {
      count: 1200,
      average: 4.7,
      list: [
        { id: 'r3', author: 'Amit Kumar', rating: 5, date: '2024-01-10', text: 'Excellent infrastructure and faculty. Placements are fantastic!' },
        { id: 'r4', author: 'Neha Singh', rating: 4, date: '2023-12-05', text: 'Great college with vibrant campus life and strong alumni network.' }
      ]
    },
    ranking: 2,
    established: 1961,
    type: 'Public',
    studentCount: 9000,
    facultyCount: 550,
    campusSize: 320,
    accreditation: 'AICTE',
    description: 'IIT Delhi is a public technical and research university located in Hauz Khas, Delhi.',
    highlights: ['Prime location in Delhi', 'Strong entrepreneurship culture', 'Excellent sports facilities', 'Top recruiters'],
    similarCollegeIds: ['1', '3', '5']
  },
  {
    id: '3',
    name: 'Indian Institute of Science Bangalore',
    location: 'Bangalore, Karnataka',
    city: 'Bangalore',
    state: 'Karnataka',
    fees: 180000,
    rating: 4.9,
    courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Physics'],
    detailedCourses: [
      { id: 'c9', name: 'B.Tech Computer Science', duration: '4 Years', fees: 180000 },
      { id: 'c10', name: 'M.Tech AI & ML', duration: '2 Years', fees: 120000 },
      { id: 'c11', name: 'PhD Physics', duration: '5 Years', fees: 50000 }
    ],
    placements: {
      average: 3200000,
      highest: 25000000,
      percentage: 99,
      topRecruiters: ['Google', 'Microsoft Research', 'Apple', 'Tesla', 'Qualcomm'],
      stats: [
        { year: 2023, average: 3200000, highest: 25000000, percentage: 99 },
        { year: 2022, average: 2900000, highest: 22000000, percentage: 98 },
        { year: 2021, average: 2600000, highest: 19000000, percentage: 97 }
      ]
    },
    reviews: {
      count: 800,
      average: 4.9,
      list: [
        { id: 'r5', author: 'Suresh Reddy', rating: 5, date: '2024-04-20', text: 'Best research institution in India. Faculty and facilities are unmatched.' },
        { id: 'r6', author: 'Ananya Iyer', rating: 5, date: '2024-03-05', text: 'Research-focused environment with world-class infrastructure.' }
      ]
    },
    ranking: 3,
    established: 1909,
    type: 'Public',
    studentCount: 4000,
    facultyCount: 400,
    campusSize: 440,
    accreditation: 'UGC',
    description: 'IISc Bangalore is a public, deemed, research university for higher education and research in science, engineering, design, and management.',
    highlights: ['Research excellence', 'PhD programs', 'Industry collaborations', 'Beautiful campus'],
    similarCollegeIds: ['1', '2', '6']
  },
  {
    id: '4',
    name: 'Indian Institute of Technology Madras',
    location: 'Chennai, Tamil Nadu',
    city: 'Chennai',
    state: 'Tamil Nadu',
    fees: 230000,
    rating: 4.8,
    courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Aerospace Engineering'],
    detailedCourses: [
      { id: 'c12', name: 'B.Tech Computer Science', duration: '4 Years', fees: 230000 },
      { id: 'c13', name: 'B.Tech Aerospace', duration: '4 Years', fees: 230000 }
    ],
    placements: {
      average: 2600000,
      highest: 19000000,
      percentage: 97,
      topRecruiters: ['Amazon', 'Microsoft', 'Goldman Sachs', 'JP Morgan', 'Adobe'],
      stats: [
        { year: 2023, average: 2600000, highest: 19000000, percentage: 97 },
        { year: 2022, average: 2300000, highest: 17000000, percentage: 95 }
      ]
    },
    reviews: {
      count: 1300,
      average: 4.8,
      list: [
        { id: 'r7', author: 'Karthik Raj', rating: 5, date: '2024-02-18', text: 'Beautiful campus, great faculty, and amazing placements.' },
        { id: 'r8', author: 'Divya Nair', rating: 4, date: '2024-01-25', text: 'Strong engineering programs and research facilities.' }
      ]
    },
    ranking: 4,
    established: 1959,
    type: 'Public',
    studentCount: 9500,
    facultyCount: 580,
    campusSize: 620,
    accreditation: 'AICTE',
    description: 'IIT Madras is a public technical and research university located in Chennai, Tamil Nadu.',
    highlights: ['Ranked #4 in India', 'Excellent sports facilities', 'Strong alumni network'],
    similarCollegeIds: ['1', '2', '5']
  },
  {
    id: '5',
    name: 'Indian Institute of Technology Kanpur',
    location: 'Kanpur, Uttar Pradesh',
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    fees: 210000,
    rating: 4.7,
    courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering'],
    detailedCourses: [
      { id: 'c14', name: 'B.Tech Computer Science', duration: '4 Years', fees: 210000 },
      { id: 'c15', name: 'B.Tech Electrical', duration: '4 Years', fees: 210000 }
    ],
    placements: {
      average: 2400000,
      highest: 17000000,
      percentage: 95,
      topRecruiters: ['Microsoft', 'Google', 'Amazon', 'Adobe', 'Oracle'],
      stats: [
        { year: 2023, average: 2400000, highest: 17000000, percentage: 95 },
        { year: 2022, average: 2100000, highest: 15000000, percentage: 93 }
      ]
    },
    reviews: {
      count: 1100,
      average: 4.7,
      list: [
        { id: 'r9', author: 'Arjun Verma', rating: 5, date: '2024-03-01', text: 'Great academics and research opportunities.' },
        { id: 'r10', author: 'Pooja Gupta', rating: 4, date: '2024-02-10', text: 'Strong programming culture and coding clubs.' }
      ]
    },
    ranking: 5,
    established: 1959,
    type: 'Public',
    studentCount: 8500,
    facultyCount: 520,
    campusSize: 1055,
    accreditation: 'AICTE',
    description: 'IIT Kanpur is a public technical and research university located in Kanpur, Uttar Pradesh.',
    highlights: ['Large campus', 'Strong programming culture', 'Research focus'],
    similarCollegeIds: ['1', '2', '6']
  },
  {
    id: '6',
    name: 'Indian Institute of Technology Kharagpur',
    location: 'Kharagpur, West Bengal',
    city: 'Kharagpur',
    state: 'West Bengal',
    fees: 200000,
    rating: 4.7,
    courses: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Aerospace Engineering'],
    detailedCourses: [
      { id: 'c16', name: 'B.Tech Computer Science', duration: '4 Years', fees: 200000 },
      { id: 'c17', name: 'B.Tech Aerospace', duration: '4 Years', fees: 200000 }
    ],
    placements: {
      average: 2300000,
      highest: 16000000,
      percentage: 94,
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Cisco', 'IBM'],
      stats: [
        { year: 2023, average: 2300000, highest: 16000000, percentage: 94 },
        { year: 2022, average: 2000000, highest: 14000000, percentage: 92 }
      ]
    },
    reviews: {
      count: 1400,
      average: 4.6,
      list: [
        { id: 'r11', author: 'Sourav Das', rating: 5, date: '2024-04-10', text: 'Oldest IIT with rich heritage and excellent programs.' },
        { id: 'r12', author: 'Ankita Bose', rating: 4, date: '2024-03-20', text: 'Great campus life and diverse student community.' }
      ]
    },
    ranking: 6,
    established: 1951,
    type: 'Public',
    studentCount: 11000,
    facultyCount: 620,
    campusSize: 2100,
    accreditation: 'AICTE',
    description: 'IIT Kharagpur is a public technical and research university located in Kharagpur, West Bengal.',
    highlights: ['First IIT in India', 'Largest campus', 'Strong engineering programs'],
    similarCollegeIds: ['2', '3', '5']
  }
];

export function getCollegeById(id: string): College | undefined {
  return COLLEGES.find(college => college.id === id);
}
