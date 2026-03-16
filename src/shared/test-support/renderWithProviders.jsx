import { render } from '@testing-library/react-native';

export function renderWithProviders(ui) {
  return render(<>{ui}</>);
}
