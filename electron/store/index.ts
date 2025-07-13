import Store from 'electron-store';

// TODO: Add encryption key to ENV
export const store = new Store({ encryptionKey: '1234567890' });
