import { safeJSON } from './safeJSON';

describe('safeJSON', () => {
  describe('parse', () => {
    it('should parse valid JSON strings', () => {
      const validJson = '{"name":"test","value":123}';
      const expected = { name: 'test', value: 123 };

      expect(safeJSON.parse(validJson)).toEqual(expected);
    });

    it('should parse valid JSON arrays', () => {
      const validJsonArray = '[1,2,3]';
      const expected = [1, 2, 3];

      expect(safeJSON.parse(validJsonArray)).toEqual(expected);
    });

    it('should return the original string for invalid JSON', () => {
      const invalidJson = '{name:test}';

      expect(safeJSON.parse(invalidJson)).toBe(invalidJson);
    });
  });

  describe('stringify', () => {
    it('should stringify valid objects', () => {
      const obj = { name: 'test', value: 123 };
      const expected = '{"name":"test","value":123}';

      expect(safeJSON.stringify(obj)).toBe(expected);
    });

    it('should stringify arrays', () => {
      const arr = [1, 2, 3];
      const expected = '[1,2,3]';

      expect(safeJSON.stringify(arr)).toBe(expected);
    });

    it('should convert circular references to string', () => {
      const circular = {};
      circular['self'] = circular;

      expect(() => safeJSON.stringify(circular)).not.toThrow();
      expect(typeof safeJSON.stringify(circular)).toBe('string');
    });

    it('should convert values that cannot be stringified to their string representation', () => {
      const fn = () => 'hello';

      expect(safeJSON.stringify(fn)).toBe(String(fn));
    });
  });
});