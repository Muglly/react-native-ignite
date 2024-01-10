import { api } from '@services/api'
import { Dashboard } from '@screens/Dashboard'
import { saveStorageCity } from '@libs/asyncStorage/cityStorage'
import { act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@__tests__/utils/customRender'
import { mockCityAPIResponse } from '@__tests__/mocks/api/mockCityAPIResponse'
import { mockWeatherAPIResponse } from '@__tests__/mocks/api/mockWeatherAPIResponse'

describe('Screen: Dashboard', () => {
  beforeAll(async () => {
    const newCity = {
      id: '1',
      name: 'Salvador',
      latitude: 123,
      longitude: 456
    }

    await saveStorageCity(newCity)
  })

  it('should be show city weather', async () => {
    jest.spyOn(api, 'get').mockResolvedValue({ data: mockWeatherAPIResponse })

    render(<Dashboard />)
    
    const cityName = await waitFor(() => screen.findByText(/Salvador/i))
    expect(cityName).toBeTruthy()
  })
  
  it('should be show another selected weather city', async () => {
    jest.spyOn(api, 'get')
    .mockResolvedValueOnce({ data: mockWeatherAPIResponse })
    .mockResolvedValueOnce({ data: mockCityAPIResponse })
    .mockResolvedValueOnce({ data: mockWeatherAPIResponse })
    
    render(<Dashboard />)
    
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading'))

    const cityName = 'São Paulo'
    await waitFor(() => act(() => {
      const search = screen.getByTestId('search-input')
      fireEvent.changeText(search, cityName)
    }))

    await waitFor(() => act(() => {
      fireEvent.press(screen.getByText(cityName, { exact: false }))
    }))

    expect(screen.getByText(cityName, { exact: false })).toBeTruthy()
  })
})