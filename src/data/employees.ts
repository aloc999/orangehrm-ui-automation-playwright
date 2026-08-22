export function uniqueEmployee() {
  const stamp = Date.now().toString().slice(-7);
  return {
    firstName: `Auto${stamp}`,
    lastName: 'Tester',
    fullName: `Auto${stamp} Tester`,
  };
}
