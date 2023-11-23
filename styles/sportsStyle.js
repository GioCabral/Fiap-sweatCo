import {StyleSheet} from 'react-native';

export const sportsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 55,
    paddingTop: 30,
  },
  list: {
    flex: 1,
    padding: 10,
  },
  sportButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 5,
  },
  sportButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    color: '#36EBC7',
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
