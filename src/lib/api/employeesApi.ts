import type { Employee, ApiResponse } from './types';

const API_BASE_URL = 'https://dummy.restapiexample.com/api/v1';

export class EmployeesApi {
  static async getAllEmployees(): Promise<Employee[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/employees`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse<Employee[]> = await response.json();
      if (data.status !== 'success') {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }

  static async getEmployee(id: number): Promise<Employee> {
    try {
      const response = await fetch(`${API_BASE_URL}/employee/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse<Employee> = await response.json();
      if (data.status !== 'success') {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      console.error(`Error fetching employee ${id}:`, error);
      throw error;
    }
  }

  static async createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    try {
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse<Employee> = await response.json();
      if (data.status !== 'success') {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  }

  static async updateEmployee(id: number, employee: Partial<Employee>): Promise<Employee> {
    try {
      const response = await fetch(`${API_BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse<Employee> = await response.json();
      if (data.status !== 'success') {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      console.error(`Error updating employee ${id}:`, error);
      throw error;
    }
  }

  static async deleteEmployee(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse<string> = await response.json();
      if (data.status !== 'success') {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(`Error deleting employee ${id}:`, error);
      throw error;
    }
  }
} 