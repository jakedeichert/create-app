import ButtonList from 'components/pages/Home/ButtonList';

describe('Example tests...', () => {
  test('ButtonList component should have display name "Connect(ButtonList)"', () => {
    expect(ButtonList.displayName).toBe('Connect(ButtonList)');
  });

  test('true should equal true', () => {
    expect(true).toBe(true);
  });

  test('null should be null', () => {
    expect(null).toBe(null);
  });

  test('"react starter" should contain "start"', () => {
    expect('react starter').toContain('start');
  });
});
