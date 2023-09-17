"use client";

export const Loading = () => {
  return (
    <div className="block text-center">
      <img
        src="/fastlog-logo.png"
        className="mx-auto hidden h-10 w-10 animate-ping dark:block"
      ></img>
      <img
        src="/fastlog-logo-dark.png"
        className="mx-auto block h-10 w-10 animate-ping dark:hidden"
      ></img>
    </div>
  );
};
