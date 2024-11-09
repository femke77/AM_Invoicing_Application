import { useQuery } from "@tanstack/react-query";
import { Invoice } from "../interfaces/Invoice";
import axiosInstance from "../utils/axiosConfig";

const fetchInvoiceById = async (id: number): Promise<Invoice> => {
  const response = await axiosInstance.get<Invoice>(`/invoices/${id}`);
  return response.data;
};

export const useInvoiceById = (id: number | null) => {
  return useQuery<Invoice, Error>({
    queryKey: ["invoice", id],
    queryFn: () => {
      if (id === null) {
        throw new Error("Invoice ID cannot be null");
      }
      return fetchInvoiceById(id);
    },
    enabled: id !== null,
  });
};
