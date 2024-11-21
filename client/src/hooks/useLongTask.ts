import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosConfig";

export const useLongTask = () => {

  const [taskStatus, setTaskStatus] = useState<string | null>(null); 

  const { mutateAsync, isSuccess, data } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post('/invoices/long');
      return response.data;
    },
    onSuccess: (data) => {

        
      if (data.jobId) {

        
        pollTaskStatus(data.jobId);
      }
    },
  });

  const pollTaskStatus = async (jobId: string) => {
console.log(jobId);

    const interval = setInterval(async () => {
      const response = await axiosInstance.get(`/invoices/long-status/${jobId}`);
      console.log(response);
      
      setTaskStatus(response.data.status);

      if (response.data.status === "completed" || response.data.status === "not found") {
        setTaskStatus(response.data.status);
        clearInterval(interval); 
      }
    }, 2000); 
  };

  const startTask = async () => {
    await mutateAsync();
  };

  return { startTask, taskStatus,  isSuccess, data };
};
