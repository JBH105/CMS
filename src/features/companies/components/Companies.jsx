"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  useCreateCompanyMutation,
  useGetCompaniesQuery,
} from "@/features/companies/services/companyApi";
import DataTable from "@/shared/Table/DataTable";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import OnboardCompanyModal from "./OnboardCompanyModal";

const Companies = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);

  const [createCompany, { isLoading: creating }] = useCreateCompanyMutation();

  // Fetch companies data
  const {
    data: companiesData,
    isLoading: isLoadingCompanies,
    error,
    refetch,
  } = useGetCompaniesQuery();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated || !user) {
        router.push("/login");
        return;
      }
      setIsLoading(false);
      console.log("Companies Component: User authenticated:", user);
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router]);

  const handleCreateCompany = async (payload) => {
    try {
      await createCompany(payload).unwrap();

      setOpenModal(false);
      refetch();
    } catch (error) {
      console.error("Create company error", error);
    }
  };

  if (isLoading || isLoadingCompanies) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-blue-600 text-xl">Loading companies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="text-red-500 text-xl">Error loading companies data</div>
      </div>
    );
  }

  const companies = companiesData?.data || [];

  // Define table columns
  const columns = [
    {
      key: "companyName",
      title: "Company Name",
      sortable: true,
      render: (value) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
    {
      key: "industryName",
      title: "Industry",
      sortable: true,
      render: (value) => (
        <Badge
          variant="secondary"
          className="text-xs bg-blue-100 text-blue-800 border-blue-200"
        >
          {value}
        </Badge>
      ),
    },
    {
      key: "companySize",
      title: "Size",
      sortable: true,
      render: (value) => (
        <span className="text-gray-700">{value} employees</span>
      ),
    },
    {
      key: "email",
      title: "Email",
      sortable: true,
      render: (value) => (
        <a
          href={`mailto:${value}`}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          {value}
        </a>
      ),
    },
    {
      key: "phone",
      title: "Phone",
      sortable: false,
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      key: "address",
      title: "Address",
      sortable: false,
      render: (value) => (
        <span className="text-gray-700 max-w-xs truncate block" title={value}>
          {value}
        </span>
      ),
    },
    {
      key: "website",
      title: "Website",
      sortable: false,
      render: (value) => (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          {value.replace("https://", "")}
        </a>
      ),
    },
    {
      key: "created_at",
      title: "Created",
      sortable: true,
      render: (value) => (
        <span className="text-gray-600 text-sm">
          {new Date(value).toLocaleDateString()}
        </span>
      ),
    },
  ];

  // Define actions for each row
  const actions = (row) => (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleViewCompany(row)}
        className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
      >
        View
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleEditCompany(row)}
        className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
      >
        Edit
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => handleDeleteCompany(row)}
        className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300"
      >
        Delete
      </Button>
    </div>
  );

  const handleViewCompany = (company) => {
    console.log("View company:", company);
  };

  const handleEditCompany = (company) => {
    console.log("Edit company:", company);
  };

  const handleDeleteCompany = (company) => {
    console.log("Delete company:", company);
  };

  return (
    <div className="w-full">
      <div className="w-full mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Companies Management
          </h1>

          <Button onClick={() => setOpenModal(true)}>Onboard Company</Button>
        </div>

        {/* Companies Table */}

        <DataTable
          data={companies}
          columns={columns}
          loading={isLoadingCompanies}
          emptyMessage="No companies found. New companies will appear here when they register."
          pageSize={10}
          actions={actions}
          className=" border-blue-200"
        />

        <OnboardCompanyModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={handleCreateCompany}
          loading={creating}
        />
      </div>
    </div>
  );
};

export default Companies;
