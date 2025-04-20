export const onResponse = (report) => {
  if (!report?.testResults) {
    return report;
  }

  return {
    success: report.success,
    passed: report.numPassedTests,
    failed: report.numFailedTests,
    results: report
      .testResults
      .flatMap(file => file.assertionResults.map(assertion => ({
        file: file.name,
        status: assertion.status,
        test: assertion.fullName,
        message: assertion.failureMessages.join('\n'),
      })))
      .reduce((acc, assertion) => ({
        ...acc,
        [assertion.status]: [
          ...acc[assertion.status],
          assertion,
        ],
      }), { passed: [], failed: [] }),
  };
};
