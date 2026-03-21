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
import CommonDialog from "@/shared/dialog/dialog";
import { Plus, Users } from "lucide-react";
import EmptyPage from "@/shared/emptypage/emptyPage";

const ClientPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedClient, setSelectedClient] = useState(null);

  const { data: clients, isLoading, isFetching, refetch } = useGetAllClientQuery();
  const isDataLoading = isLoading || isFetching;

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

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full  mx-auto p-4 sm:p-5 lg:p-5 flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Clients</h1>
            <p className="text-sm text-zinc-500 mt-1">
              Manage all your client projects and details.
            </p>
          </div>
          <Button
            onClick={handleCreateClick}
            className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm shadow-sm rounded-md transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Client
          </Button>
        </div>

        {isDataLoading || (clients && clients.length > 0) ? (
          <ClientTable
            data={clients || []}
            loading={isDataLoading}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ) : (
          <EmptyPage
            title="No Clients Found"
            description="You don't have any clients yet. Add your first client to get started."
            buttonText="Create Client"
            onAction={handleCreateClick}
            icon={Users}
          />
        )}
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
