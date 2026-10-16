import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, afterEach, expect, test, vi } from 'vitest';
import { Assistant } from './Assistant';
beforeEach(() => { localStorage.clear(); });
afterEach(() => { vi.unstubAllGlobals(); });
function open() { return render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Assistant /></MemoryRouter>); }
test('submits to the general assistant and stores the answer', async () => {
  const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ answer: 'Here is your draft.', capabilities: ['creation'] }) });
  vi.stubGlobal('fetch', fetchMock);
  open();
  fireEvent.change(screen.getByLabelText('Ask Gubbu'), { target: { value: 'Write a proposal' } });
  fireEvent.click(screen.getByLabelText('Send request'));
  expect(await screen.findByText('Here is your draft.')).toBeInTheDocument();
  expect(fetchMock.mock.calls[0][0]).toBe('/api-proxy/assistant');
  expect(JSON.parse(localStorage.getItem('gubbu-conversations'))[0].messages).toHaveLength(2);
});
test('restores failed requests for retry without duplicating messages', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Service unavailable')));
  open();
  fireEvent.change(screen.getByLabelText('Ask Gubbu'), { target: { value: 'Help me plan' } });
  fireEvent.click(screen.getByLabelText('Send request'));
  expect(await screen.findByRole('alert')).toHaveTextContent('Service unavailable');
  expect(screen.getByLabelText('Ask Gubbu')).toHaveValue('Help me plan');
  await waitFor(() => expect(JSON.parse(localStorage.getItem('gubbu-conversations'))[0].messages).toHaveLength(0));
});
test('connections disclose missing integrations', () => {
  open();
  fireEvent.click(screen.getByRole('button', { name: /Connections/ }));
  expect(screen.getAllByText('Not connected')).toHaveLength(3);
});
