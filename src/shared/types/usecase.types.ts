export type Usecase<Input, Output> = {
  execute(input: Input): Promise<Output>;
};
