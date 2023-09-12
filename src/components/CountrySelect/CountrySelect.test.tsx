import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CountrySelect from './CountrySelect';
import React from 'react';

describe('Test CountrySelect renders', () => {
  it('Renders', () => {
    render(<CountrySelect onChange={(): void => {}} />);
    expect(screen.getAllByDisplayValue(/USA/i)).toBeDefined();
  });
});

// describe('должен вызывать функцию onChange при изменении выбранной страны', async () => {
//   let currCountry: string = 'test';
//   const onChange = (country: string): void => {
//     currCountry = country;
//   };

//   const { getByRole } = render(<CountrySelect onChange={onChange} />);

//   const selectElement = getByRole('combobox');

//   fireEvent.change(selectElement, 'CA');
//   // fireEvent.change(selectElement, 'US');
//   expect(screen.getAllByText(/CANADA/i)).toBeDefined();
// });

// test('должен вызывать функцию onChange при изменении выбранной страны', async () => {
//   // Создаем заглушку для функции onChange
//   const onChange = (value: string): void => {
//     expect(value).toBe('CA');
//   };

//   // Рендерим компонент CountrySelect с функцией onChange
//   const { getByRole } = render(<CountrySelect onChange={onChange} />);

//   const selectElement = getByRole('combobox'); // Получаем элемент select

//   // Создаем событие ChangeEvent с нужным значением
//   const changeEvent = new Event('change', { bubbles: true });
//   Object.defineProperty(changeEvent, 'target', {
//     value: { value: 'CA' },
//     writable: true,
//   });

//   // Симулируем событие изменения значения
//   await fireEvent(selectElement, changeEvent);
// });
