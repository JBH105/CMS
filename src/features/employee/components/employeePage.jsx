// src/components/employee/EmployeePage.jsx
"use client";

import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import EmployeeTable from "./employeeTable";

const EmployeePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = async (values) => {
    setLoading(true);
    try {
      // Add your API call here to create employee
      console.log("Employee Data:", values);
      // await createEmployee(values).unwrap();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setModalOpen(false);
      // Refresh employee list here
      // refetch();
    } catch (error) {
      console.error("Error creating employee:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <Button 
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Employee
          </Button>
        </div>

        <EmployeeTable />
      </div>

      {/* Create Employee Modal */}
      {/* <CreateEmployee
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        loading={loading}
      /> */}
    </div>
  );
};

export default EmployeePage;