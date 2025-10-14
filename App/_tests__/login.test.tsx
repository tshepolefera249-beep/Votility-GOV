import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '@/screens/LoginScreen';

test('shows login button', () => {
  const { getByText } = render(<LoginScreen />);
  expect(getByText('Login')).toBeTruthy();
});
