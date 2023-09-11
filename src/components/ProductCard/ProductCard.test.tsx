import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProductCard from './ProductCard';
import React from 'react';
import { getProducts } from '../../utils/api/clientApi';
import { ClientResponse, ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import { MemoryRouter } from 'react-router';

describe('Product Card Renders', async () => {
  const products: void | ClientResponse<ProductProjectionPagedSearchResponse> = await getProducts({
    queryArgs: {
      sort: 'price asc',
    },
  });
  if (products) {
    const firstProduct = products.body.results[0];

    it('Renders', () => {
      const { container } = render(
        <MemoryRouter>
          <ProductCard product={firstProduct} />
        </MemoryRouter>
      );
      const currentCard = container.querySelector(
        '.MuiGrid-root MuiGrid-item css-13i4rnv-MuiGrid-root'
      );
      expect(currentCard).toBeDefined();
    });
  }

  // it('Test Add to Cart', () => {

  // })
});

// describe('Test EmailInput can`t be change when read only passed', () => {
//   it('ReadOnly', () => {
//     render(<EmailInput onChange={(): void => {}} value="11111" readOnlyValue={true} />);
//     const currentInput = screen.getByPlaceholderText('Enter your email');
//     if (currentInput) {
//       fireEvent.change(currentInput, { target: { value: 'inv' } });
//     }
//     expect(screen.getAllByDisplayValue(/11111/i)).toBeDefined();
//   });
// });
