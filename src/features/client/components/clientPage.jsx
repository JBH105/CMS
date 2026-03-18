"use client";

import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import ClientTable from "./clientTable";
import ClientForm from "./clientform";
import {
  useGetAllClientQuery,
  useCreateClientMutation,
  useUpdateClientInfoMutation,
  useDeleteClientMutation,
} from "../services/clientApi";
import { toast } from "sonner";
import Loader from "@/layout/loader/loader";
import CommonDialog from "@/shared/dialog/dialog";

const ClientPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedClient, setSelectedClient] = useState(null);

  const { data: clients, isLoading, refetch } = useGetAllClientQuery();
  const [createClient, { isLoading: createLoading }] =
    useCreateClientMutation();
  const [updateClient, { isLoading: updateLoading }] =
    useUpdateClientInfoMutation();
  const [deleteClient] = useDeleteClientMutation();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeleteClient, setSelectedDeleteClient] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedClient(null);
    setModalMode("create");
  };

  const handleCreateClient = async (values) => {
    try {
      await createClient(values).unwrap();
      toast.success("Client created successfully");
      setModalOpen(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.error || "Failed to create client");
    }
  };

  const handleUpdateClient = async (values) => {
    try {
      await updateClient(values).unwrap();
      toast.success("Client updated successfully");
      setModalOpen(false);
      setSelectedClient(null);
      setModalMode("create");
      refetch();
    } catch (error) {
      toast.error(error?.data?.error || "Failed to update client");
    }
  };

  const handleDelete = (row) => {
    setSelectedDeleteClient(row);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedDeleteClient) return;

    try {
      setDeleteLoading(true);

      await deleteClient(selectedDeleteClient._id).unwrap();

      toast.success("Client deleted successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.error || "Failed to delete client");
    } finally {
      setDeleteLoading(false);
      setDeleteDialogOpen(false);
      setSelectedDeleteClient(null);
    }
  };

  const handleEdit = (row) => {
    setSelectedClient(row);
    setModalMode("update");
    setModalOpen(true);
  };

  const handleCreateClick = () => {
    setModalMode("create");
    setSelectedClient(null);
    setModalOpen(true);
  };

  const handleSubmit = (values) => {
    if (modalMode === "update") {
      handleUpdateClient(values);
    } else {
      handleCreateClient(values);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <div className="w-full mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <Button
            onClick={handleCreateClick}
            className="bg-gradient-to-br from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-medium text-md shadow-md hover:shadow-lg rounded-lg transition-all duration-300 border-0"
          >
            Create Client
          </Button>
        </div>

        <ClientTable
          data={clients}
          loading={isLoading}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      <ClientForm
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        loading={createLoading || updateLoading}
        initialData={selectedClient}
        mode={modalMode}
      />

      <CommonDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        title="Confirm Delete"
        description={`Are you sure you want to delete "${selectedDeleteClient?.name}"?`}
      />
    </div>
  );
};

export default ClientPage;
