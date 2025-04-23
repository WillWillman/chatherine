import { z } from 'zod';
import { runCMD } from '../utils';

const formatResult = testResult =>
  testResult
    ?.assertionResults
    ?.map(assertionResult => ({
      file: testResult.name,
      status: assertionResult.status,
      test: assertionResult.fullName,
      message: assertionResult.failureMessages.join('\n'),
    }));

const formatTestResults = (testResults = []) => {
  const formatted = testResults.flatMap(formatResult);
  const byStatus = ({ status }) => status;
  return Object.groupBy(formatted, byStatus);
};

export const runUnitTests = {
  description: 'Runs unit tests in the cwd specified (usually workspace root directory) with an optional test pattern filter',
  args: {
    cwd: z.string(),
    pattern: z.string().optional().default(''),
  },
  toolCallback: args => runCMD(`npm --silent run test:json ${args.pattern}`, args.cwd, response => ({
    success: response?.success,
    numPassedTests: response?.numPassedTests,
    numFailedTests: response?.numFailedTests,
    unexpectedResponse: !response?.testResults ? response : undefined,
    testResults: formatTestResults(response?.testResults),
  })),
};
