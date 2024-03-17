import { Button, Paper } from '@mantine/core';
import TransactionPDFReport from '../components/TransactionPDFReport';
import { useTransaction } from '../context/TransactionContext';
import { PDFDownloadLink } from '@react-pdf/renderer';
import '../index.css';

function Reports() {
  const { transactions } = useTransaction();

  return (
    <>
      <Paper shadow="sm" radius="md" p="lg" style={{ maxWidth: '768px', margin: 'auto' }}>
        <h1 className='text-center'>Reports Page</h1>
        <Button variant='outline'>
          <PDFDownloadLink document={<TransactionPDFReport transactions={transactions} />} fileName="transaction_report.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
          </PDFDownloadLink>
        </Button>
      </Paper>
    </>
  );
}

export default Reports;



// Generate simple CSV data of users monthly financial data statements (once data is categorized) which includes transactions and balances