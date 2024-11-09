import { useQuery } from "@tanstack/react-query";
import { Invoice } from "../interfaces/Invoice";
import axiosInstance from "../utils/axiosConfig";

const fetchInvoices = async (): Promise<Invoice[]> => {
  const response = await axiosInstance.get<Invoice[]>("/invoices");
  return response.data;
};

export const useInvoices = () => {
  return useQuery<Invoice[], Error>({
    queryKey: ["invoices"],
    queryFn: fetchInvoices,
    staleTime: 1000 * 60 * 5, // 5 min
  });
};
