// src/components/EmployeesList.tsx
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Search, MapPin } from 'lucide-react';
import type { Id } from '../../convex/_generated/dataModel';

interface EmployeesListProps {
  onViewEmployee: (employeeId: Id<'employees'>) => void;
}

export default function EmployeesList({ onViewEmployee }: EmployeesListProps) {
  const data = useQuery(api.employees.list);
  const employees = (data ?? []).map((e) => ({
    id: String(e._id),
    srcId: e._id as Id<'employees'>,
    name: `${e.firstName} ${e.lastName}`,
    avatar: `${e.firstName?.[0] ?? ''}${e.lastName?.[0] ?? ''}`.toUpperCase(),
    role: e.role,
    location: e.location,
    skills: (e.skills ?? []).map((s: any) => s.name),
    experience: `${e.yearsOfExperience ?? 0} years`,
  }));

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-500 mt-1">{employees.length} team members</p>
        </div>
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
          />
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((employee) => (
          <div 
            key={employee.id}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:border-[#0066CC] transition-all duration-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#0066CC] rounded-lg flex items-center justify-center text-white text-xl font-bold mb-3">
                {employee.avatar}
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{employee.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{employee.role}</p>
              
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100 w-full justify-center">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{employee.location}</span>
                </span>
                <span>•</span>
                <span>{employee.experience}</span>
              </div>
              
              <div className="flex flex-wrap gap-1.5 justify-center">
                {employee.skills.map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-gray-50 text-gray-700 rounded text-xs border border-gray-200">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 w-full flex justify-end">
                <button
                  onClick={() => onViewEmployee(employee.srcId)}
                  className="px-4 py-2 text-[#0066CC] text-sm font-medium hover:bg-blue-50 rounded-lg transition-colors"
                >
                  View Profile →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}