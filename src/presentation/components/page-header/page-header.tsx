import type { ReactNode } from "react";

type PageHeaderProperties = {
  children?: ReactNode;
  title: string;
};

function PageHeader({ children, title }: PageHeaderProperties) {
  return (
    <div className="flex justify-between">
      <h1 className="font-semibold">{title}</h1>

      {children}
    </div>
  );
}

export { PageHeader };
