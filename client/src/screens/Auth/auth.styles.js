import {StyleSheet} from 'react-native';
import {lightTheme} from '../../theme/Theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightTheme.PRIMARY_BACKGROUND_COLOR,
  },
  header: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  loginHeader: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  loginHeaderTitle: {
    flex: 1,
    textAlign: 'center',
    color: lightTheme.PRIMARY_TITLE_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: lightTheme.PRIMARY_TITLE_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    flex: 0.5,
    justifyContent: 'center',
    width: '80%',
  },
  footer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  alreadyHave: {
    marginTop: 20,
    alignItems: 'center',
  },
  alreadyHaveText: {
    color: lightTheme.PRIMARY_TITLE_COLOR,
    fontSize: 13,
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: lightTheme.PRIMARY_BUTTON_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    color: lightTheme.PRIMARY_BUTTON_TEXT_COLOR,
    fontSize: 16,
  },
});
