// src/components/EmployeesList.tsx
import { Search, MapPin } from 'lucide-react';

export default function EmployeesList() {
  const employees = [
    {
      id: '1',
      name: 'Marco Rossi',
      avatar: 'MR',
      role: 'Senior Full-Stack Developer',
      location: 'Tirana',
      skills: ['React', 'Node.js', 'TypeScript', 'Azure'],
      availability: 'Available',
      experience: '8 years'
    },
    {
      id: '2',
      name: 'Sofia Greco',
      avatar: 'SG',
      role: 'Senior Backend Engineer',
      location: 'Milan',
      skills: ['Python', 'Django', 'Azure', 'Kubernetes'],
      availability: 'Busy',
      experience: '10 years'
    },
    {
      id: '3',
      name: 'Elena Ferri',
      avatar: 'EF',
      role: 'Data Engineer',
      location: 'Tirana',
      skills: ['Python', 'Spark', 'SQL', 'Airflow'],
      availability: 'Partial (20h/week)',
      experience: '6 years'
    },
    {
      id: '4',
      name: 'Luigi Ferrari',
      avatar: 'LF',
      role: 'Frontend Developer',
      location: 'Rome',
      skills: ['React', 'Figma', 'TypeScript', 'CSS'],
      availability: 'Available',
      experience: '7 years'
    },
  ];

  const getAvailabilityColor = (status: string) => {
    if (status === 'Available') return 'bg-green-100 text-green-700';
    if (status === 'Busy') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search employees..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employees.map((employee) => (
          <div 
            key={employee.id}
            className="bg-white border border-gray-200 rounded-lg p-5"
          >
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-[#0066CC] rounded-lg flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                {employee.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-bold text-gray-900">{employee.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getAvailabilityColor(employee.availability)}`}>
                    {employee.availability}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{employee.role}</p>
                <div className="flex items-center space-x-3 text-sm text-gray-600 mb-3">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{employee.location}</span>
                  </span>
                  <span>{employee.experience}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {employee.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}