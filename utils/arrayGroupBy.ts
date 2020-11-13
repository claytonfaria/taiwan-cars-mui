export const arrayGroupBy = (
  objectArray: any[],
  ...properties: string[]
): any[] => {
  return [
    ...Object.values(
      objectArray.reduce((accumulator, object) => {
        const key = JSON.stringify(properties.map((x) => object[x] || null));

        if (!accumulator[key]) {
          accumulator[key] = [];
        }
        accumulator[key].push(object);
        return accumulator;
      }, {})
    ),
  ];
};
