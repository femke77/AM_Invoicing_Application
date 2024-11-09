import { useQuery } from "@tanstack/react-query";
import { Invoice } from "../interfaces/Invoice";
import axiosInstance from "../utils/axiosConfig";

const fetchInvoices = async (page: number, limit: number): Promise<Invoice[]> => {
  const response = await axiosInstance.get<Invoice[]>("/invoices", {
    params: { page, limit },
  });
  return response.data;
};

export const useInvoices = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['invoices', page, limit],
    queryFn: () => fetchInvoices(page, limit),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10, 
    placeholderData: (previousData) => previousData
  })
}
