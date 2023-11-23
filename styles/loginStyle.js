import {StyleSheet} from 'react-native';

export const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: '',
    paddingTop: '20%',
    backgroundColor: 'white',
  },
  logo: {
    fontSize: 60,
    marginBottom: 40,
    fontWeight: '300',
    fontFamily: 'Roboto',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#D3D3D3',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#003f5c',
  },
  inputTextError: {
    height: 50,
    color: 'red',
    borderColor: 'red',
  },
  loginBtn: {
    width: '50%',
    backgroundColor: '#36EBC7',
    borderRadius: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    fontSize: 20,
  },
  registerBtn: {
    width: '50%',
    backgroundColor: '#36EBC7',
    borderRadius: 25,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    fontSize: 20,
  },
  loginText: {
    color: '#fff',
    marginTop: -3,
    fontWeight: 'bold',
    fontSize: 20,
  },
  btnContainer: {
    flexDirection: 'row',
  },
  btnIcon: {
    marginLeft: 10,
  },
  image: {
    width: 400,
    height: 200,
    resizeMode: 'contain', // You can adjust the image resizing mode as needed
  },
});
