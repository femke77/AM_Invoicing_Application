import React, { useState } from 'react';
import { useInvoices } from '../hooks/useInvoices';
import Modal from './Modal';
import { useInvoiceById } from '../hooks/useInvoiceById';
import { Invoice } from '../interfaces/Invoice';
import dayjs from 'dayjs';

const InvoicesList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(12); //change as you like


  const { data: invoices, isLoading, error } = useInvoices(page, limit);
  const isLastPage = invoices ? invoices.length < limit : false;
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const { data: selectedInvoice, isLoading: isInvoiceLoading } = useInvoiceById(selectedInvoiceId);

  const handleInvoiceClick = (id: number) => {
    setSelectedInvoiceId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedInvoiceId(null);
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1)); // Prevent going below page 1

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Invoices List</h2>
      <p>Click on an invoice to view details.</p>
      <ul>
        {invoices ? (
          invoices.map((invoice: Invoice) => (
            <li key={invoice.id} onClick={() => handleInvoiceClick(invoice.id)}>
              Due Date: {dayjs(invoice.due_date).format('MM/DD/YYYY')} - $
              {invoice.amount}.00 - Vendor: {invoice.vendor_name}
            </li>
          ))) : (<p>No Invoices Found</p>)}
        {error && <p>Error fetching invoices.</p>}
      </ul>

      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} disabled={isLastPage} >Next</button>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {isInvoiceLoading ? (
            <div>Loading invoice details...</div>
          ) : (
            selectedInvoice && (
              <div>
                <h3>Invoice Details</h3>
                <p>ID: {selectedInvoice.id}</p>
                <p>Amount: ${selectedInvoice.amount}.00</p>
                <p>Due Date: {dayjs(selectedInvoice.due_date).format('MM/DD/YYYY')}</p>
                <p>Description: {selectedInvoice.description}</p>
                <p>Status: {selectedInvoice.paid ? 'Paid' : 'Not Paid'}</p>
                <p>Vendor: {selectedInvoice.vendor_name}</p>
                <p>User: {selectedInvoice.user?.name}</p>
                User email:{' '}
                <a href={`mailto:${selectedInvoice.user?.email}`}>
                  {selectedInvoice.user?.email}
                </a>
              </div>
            )
          )}
        </Modal>
      )}
    </div>
  );
};

export default InvoicesList;
