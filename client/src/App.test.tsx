import ReactDOM from 'react-dom/client';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import App from './App';

let container: HTMLDivElement | null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container as HTMLDivElement);
    container = null;
});

test('renders header', async () => {
    await act(async () => {
        ReactDOM.createRoot(container as HTMLDivElement).render(<App />);
    });
    const headerText = screen.getByText(/HBC Positions/i);
    expect(headerText).toBeInTheDocument();
});
