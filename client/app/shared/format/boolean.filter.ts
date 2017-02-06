export function BooleanFilter() {
  return function (data, truthy, falsy) {
    return data ? truthy : falsy;
  };
}
