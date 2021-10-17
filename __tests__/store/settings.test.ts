import settings from '../../src/store/settings'
// @ts-ignore
import { setItem, getItem } from '@react-native-async-storage/async-storage'

const defaultSettings = {
  darkTheme: true,
  fingerprint: false,
}
const mockUserSettings = {
  darkTheme: false,
  fingerprint: false,
}

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn()
}))

describe('Settings store', () => {
  beforeEach(() => {
    setItem.mockImplementation(() => Promise.resolve(1))
    getItem.mockImplementation(() => Promise.resolve(JSON.stringify(defaultSettings)))
  })

  it('Set correct settings by default', async () => {
    await settings.getDefaultSettings()
    expect(settings).toEqual({ ...settings, ...defaultSettings })
  })
  it('Correct set user settings', async () => {
    getItem.mockImplementation(() => Promise.resolve(JSON.stringify(mockUserSettings)))
    await settings.getDefaultSettings()
    expect(settings).toEqual({ ...settings, ...mockUserSettings })
  })
})
