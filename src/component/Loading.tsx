import React from "react";

type Props = {};

export const LoadingPage = (props: Props) => {
  return (
    <div>
      <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
        <p>Loading...</p>
      </main>
    </div>
  );
};
