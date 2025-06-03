import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 100,
    backgroundColor: '#4338CA',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  monthText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginHorizontal: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  estadoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  fechaText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  notaText: {
    fontSize: 16,
    color: '#111827',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4338CA',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default styles;
