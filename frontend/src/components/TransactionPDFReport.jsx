import { Divider } from '@mantine/core';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    header: {
      marginBottom: 10,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      textDecoration: 'underline',
    },
    subtitle: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    date: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 10,
    },
    transactionContainer: {
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#CCCCCC',
      paddingBottom: 10,
    },
    row: {
      flexDirection: 'row', // Ensure items are laid out horizontally
      marginBottom: 5,
    },
    label: {
      width: 100,
      fontWeight: 'bold',
      marginRight: 10,
      textAlign: 'right',
    },
    value: {
      flex: 1,
      fontWeight: 'thin'
    },
  });  

// Create PDF report component
const TransactionPDFReport = ({ transactions }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>BetterBudget</Text>
          <Text style={styles.subtitle}>Transactions Report</Text>
          <Text style={styles.date}>Date of Generation: {currentDate}</Text>
          {transactions.map((transaction, index) => (
                <>
                     <View key={index} style={styles.row}>
                     <Text style={styles.label}>Name:</Text>
                     <Text style={styles.value}>{transaction.name}</Text>
                   </View>
                   <View style={styles.row}>
                     <Text style={styles.label}>Amount:</Text>
                     <Text style={styles.value}>{transaction.amount}</Text>
                   </View>
                   <View style={styles.row}>
                     <Text style={styles.label}>Date:</Text>
                     <Text style={styles.value}>{transaction.date}</Text>
                   </View>
                   <View style={styles.row}>
                     <Text style={styles.label}>Type:</Text>
                     <Text style={styles.value}>{transaction.transactionType}</Text>
                   </View>
                   <View style={styles.row}>
                     <Text style={styles.label}>Status:</Text>
                     <Text style={styles.value}>{transaction.status}</Text>
                   </View>
                   <View style={{ marginBottom: 10 }} />
                   </>
            ))}
        </View>
      </Page>
    </Document>
  );
};

export default TransactionPDFReport;

