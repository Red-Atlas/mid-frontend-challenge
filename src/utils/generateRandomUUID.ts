

export const generateRandomUUID = (): string => {
  const generateSegment = (length: number) => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1, length + 1);
  };

  return `${generateSegment(4)}-${generateSegment(4)}-${generateSegment(4)}-${generateSegment(4)}-${generateSegment(12)}`;
};