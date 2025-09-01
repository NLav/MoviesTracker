type NoItemsProperties = {
  article: "a" | "o";
  word: string;
};

function NoItems({ article, word }: NoItemsProperties) {
  const sentence = `Nenhum${article === "a" ? article : ""} ${word} encontrad${article}`;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <span>{sentence}</span>
    </div>
  );
}

export { NoItems };
