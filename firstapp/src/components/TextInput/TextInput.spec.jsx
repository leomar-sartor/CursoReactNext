import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextInput } from '.';

describe('<TextInput />', () => {
  it('should have a value os searchvalue', () => {
    const fn = jest.fn();

    render(<TextInput handleChange={fn} searchValue={'testing'} />);

    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input.value).toBe('testing');
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();

    render(<TextInput handleChange={fn} searchValue="um valor qualquer" />);

    const input = screen.getByPlaceholderText(/type your search/i);

    const value = 'um valor qualquer';

    userEvent.type(input, value);
    //screen.debug(input);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('should match snapshot', () => {
    const fn = jest.fn();

    const { container } = render(<TextInput handleChange={fn} searchValue={''} />);

    expect(container).toMatchSnapshot();
  });
});
