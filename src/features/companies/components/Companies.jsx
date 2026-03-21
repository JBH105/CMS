"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  useAddCompanyOwnerMutation,
  useCreateCompanyMutation,
  useGetCompaniesQuery,
} from "@/features/companies/services/companyApi";
import DataTable from "@/shared/Table/DataTable";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import OnboardCompanyModal from "./OnboardCompanyModal";
import { toast } from "sonner";
import { Eye, Mail, Pencil, Phone, Trash2, UserPlus, Building2 } from "lucide-react";
import { capitalizeWords } from "@/utils/formater";
import CreateOwnerModal from "./crerateOwnerModal";
import EmptyPage from "@/shared/emptypage/emptyPage";

const Companies = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [ownerModal, setOwnerModal] = React.useState(false);
  const [selectedCompany, setSelectedCompany] = React.useState(null);

  const [createCompany, { isLoading: creating }] = useCreateCompanyMutation();
  const [addCompanyOwner, { isLoading: addingOwner }] =
    useAddCompanyOwnerMutation();

  // Fetch companies data
  const {
    data: companiesData,
    isLoading: isLoadingCompanies,
    isFetching: isFetchingCompanies,
    error,
    refetch,
  } = useGetCompaniesQuery();
  const isDataLoading = isLoadingCompanies || isFetchingCompanies || isLoading;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated || !user) {
        router.push("/login");
        return;
      }
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router]);

  const handleCreateCompany = async (payload) => {
    try {
      await createCompany(payload).unwrap();

      toast.success("Company created successfully");

      setOpenModal(false);
      refetch();
    } catch (error) {
      const errorMessage =
        error?.data?.error || error?.data?.message || "Something went wrong";

      toast.error(errorMessage);

      console.error("Create company error:", error);
    }
  };

  const handleAddOwner = (company) => {
    setSelectedCompany(company);
    setOwnerModal(true);
  };

  const handleCreateOwner = async (data) => {
    try {
      await addCompanyOwner({
        ...data,
        companyId: selectedCompany?._id,
      }).unwrap();

      toast.success("Owner added successfully");
      setOwnerModal(false);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add owner");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
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
        <span className="font-medium text-gray-600">
          {capitalizeWords(value)}
        </span>
      ),
    },
    {
      key: "industryName",
      title: "Industry",
      sortable: true,
      render: (value) => (
        <Badge
          variant="secondary"
          className="text-xs bg-zinc-100 text-zinc-800 rounded-md"
        >
          {value}
        </Badge>
      ),
    },
    {
      key: "companySize",
      title: "Size",
      sortable: true,
      render: (value) => <span className="text-gray-600">{value}</span>,
    },
    {
      key: "contact",
      title: "Contact Info",
      sortable: false,
      render: (_, row) => (
        <div className="flex flex-col space-y-2">
          <a
            href={`mailto:${row.email}`}
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors text-sm"
          >
            <Mail size={14} />
            <span>{row.email}</span>
          </a>

          <a
            href={`tel:${row.phone}`}
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors text-sm"
          >
            <Phone size={14} />
            <span>{row.phone}</span>
          </a>
        </div>
      ),
    },
    {
      key: "address",
      title: "Address",
      sortable: false,
      render: (value) => (
        <span className="text-gray-600 max-w-xs truncate block" title={value}>
          {capitalizeWords(value)}
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
          className="text-zinc-600 hover:text-zinc-900 transition-colors font-medium"
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
        onClick={() => handleAddOwner(row)}
        className="text-green-600"
      >
        <UserPlus className="w-4 h-4" />
      </Button>
      {/* View */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleViewCompany(row)}
        className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 p-2"
      >
        <Eye className="w-4 h-4" />
      </Button>

      {/* Edit */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleEditCompany(row)}
        className="text-gray-600"
      >
        <Pencil className="w-4 h-4" />
      </Button>

      {/* Delete */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleDeleteCompany(row)}
        className="text-red-700 "
      >
        <Trash2 className="w-4 h-4" />
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
    <div className="w-full h-full flex flex-col">
      <div className="w-full mx-auto p-4 sm:p-5 lg:p-5 flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Companies Management</h1>
            <p className="text-sm text-zinc-500 mt-1">
              Manage operations and details for each registered company.
            </p>
          </div>

          <Button
            onClick={() => setOpenModal(true)}
            className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm shadow-sm rounded-md transition-all flex items-center gap-2"
          >
            Onboard Company
          </Button>
        </div>

        {/* Companies Table */}

        {isDataLoading || (companies && companies.length > 0) ? (
          <DataTable
            data={companies || []}
            columns={columns}
            loading={isDataLoading}
            emptyMessage="No companies found. New companies will appear here when they register."
            pageSize={10}
            actions={actions}
            className="border-zinc-200"
          />
        ) : (
          <EmptyPage
            title="No Companies Found"
            description="There are no companies registered yet. Onboard a new company to get started."
            buttonText="Onboard Company"
            onAction={() => setOpenModal(true)}
            icon={Building2}
          />
        )}

        <OnboardCompanyModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={handleCreateCompany}
          loading={creating}
        />

        <CreateOwnerModal
          open={ownerModal}
          onClose={() => setOwnerModal(false)}
          onSubmit={handleCreateOwner}
          loading={addingOwner}
        />
      </div>
    </div>
  );
};

export default Companies;
