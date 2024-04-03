type Props = {
  favoriteList: Map<string, string[]>;
  removeFavorite: (item: string) => void;
};

const convertMapToArray = (props: any) => {
  let favoriteList: Map<string, string[]> = props.favoriteList;

  let reworkedList: string[] = [];

  favoriteList.forEach((value: string[], key: string) => {
    reworkedList = reworkedList.concat(value);
  });

  return reworkedList;
};

export const FavoriteList = (favoriteList: Props): JSX.Element => {
  const arrayList = convertMapToArray(favoriteList);

  return (
    <div className="w-full md:w-[800px] lg:w-[1200px] p-4 flex flex-col text-left justify-center bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-900 overflow-y-auto h-550">
      <ol className="list-decimal mx-5 min-h-[300px] md:max-h-[550px]">
        {arrayList.map((item, i) => (
          <li key={i} className="text-left px-1 ">
            <div className="inline-flex items-baseline justify-space-between  rounded drop-shadow-lg ">
              <span className="inline-flex items-baseline justify-space-between  rounded drop-shadow-lg ">
                {item}
                <button
                  className=" min-w-[110px] rounded-full border border-white ml-3 px-5 text-sm font-bold leading-7 text-gray-600   hover:text-white  mt-4"
                  onClick={() => favoriteList.removeFavorite(item)}
                >
                  Remove
                </button>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
