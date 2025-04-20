import { jest } from '@jest/globals';
import { onResponse } from './onResponse';

describe('onResponse', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('returns original report when testResults is undefined', () => {
    const mockReport = { success: true };
    const result = onResponse(mockReport);
    expect(result).toBe(mockReport);
  });

  it('returns original report when testResults is null', () => {
    const mockReport = { success: true, testResults: null };
    const result = onResponse(mockReport);
    expect(result).toBe(mockReport);
  });

  it('transforms report with no failures and includes all tests', () => {
    const mockReport = {
      success: true,
      numPassedTests: 10,
      numFailedTests: 0,
      testResults: [
        {
          name: 'file1.test.ts',
          assertionResults: [
            {
              status: 'passed',
              fullName: 'Test 1',
              failureMessages: [],
              title: 'should pass',
            },
          ],
        },
      ],
    };

    const result = onResponse(mockReport);

    expect(result.success).toBe(true);
    expect(result.passed).toBe(10);
    expect(result.failed).toBe(0);
    expect(result.results.failed).toEqual([]);
    expect(result.results.passed).toHaveLength(1);
    expect(result.results.passed[0]).toEqual({
      file: 'file1.test.ts',
      status: 'passed',
      test: 'Test 1',
      message: '',
    });
  });

  it('transforms report with failures and includes both passing and failing tests', () => {
    const failureMessage = 'Test failed';
    const mockReport = {
      success: false,
      numPassedTests: 5,
      numFailedTests: 2,
      testResults: [
        {
          name: 'file1.test.ts',
          assertionResults: [
            {
              status: 'failed',
              fullName: 'Test 1',
              failureMessages: [failureMessage],
              title: 'should fail',
            },
            {
              status: 'passed',
              fullName: 'Test 2',
              failureMessages: [],
              title: 'should pass',
            },
          ],
        },
        {
          name: 'file2.test.ts',
          assertionResults: [
            {
              status: 'failed',
              fullName: 'Test 3',
              failureMessages: [failureMessage],
              title: 'should also fail',
            },
          ],
        },
      ],
    };

    const result = onResponse(mockReport);

    expect(result.success).toBe(false);
    expect(result.passed).toBe(5);
    expect(result.failed).toBe(2);

    // Check failed array
    expect(result.results.failed).toHaveLength(2);
    expect(result.results.failed[0]).toEqual({
      file: 'file1.test.ts',
      status: 'failed',
      test: 'Test 1',
      message: failureMessage,
    });
    expect(result.results.failed[1]).toEqual({
      file: 'file2.test.ts',
      status: 'failed',
      test: 'Test 3',
      message: failureMessage,
    });

    // Check passed array
    expect(result.results.passed).toHaveLength(1);
    expect(result.results.passed[0]).toEqual({
      file: 'file1.test.ts',
      status: 'passed',
      test: 'Test 2',
      message: '',
    });
  });

  it('handles multiple failure messages per test', () => {
    const failureMessages = ['Error 1', 'Error 2'];
    const mockReport = {
      success: false,
      numPassedTests: 0,
      numFailedTests: 1,
      testResults: [
        {
          name: 'file.test.ts',
          assertionResults: [
            {
              status: 'failed',
              fullName: 'Complex test',
              failureMessages,
              title: 'should handle multiple errors',
            },
          ],
        },
      ],
    };

    const result = onResponse(mockReport);

    expect(result.results.failed).toHaveLength(1);
    expect(result.results.failed[0].message).toBe(failureMessages.join('\n'));
  });

  it('handles edge case with empty test results array', () => {
    const mockReport = {
      success: true,
      numPassedTests: 0,
      numFailedTests: 0,
      testResults: [],
    };

    const result = onResponse(mockReport);

    expect(result.success).toBe(true);
    expect(result.passed).toBe(0);
    expect(result.failed).toBe(0);
    expect(result.results.failed).toEqual([]);
    expect(result.results.passed).toEqual([]);
  });
});