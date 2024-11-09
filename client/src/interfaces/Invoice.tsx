interface Invoice {
  id: number;
  due_date: string;
  vendor_name: string;
  description: string;
  amount: number;
  paid: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export type { Invoice };
