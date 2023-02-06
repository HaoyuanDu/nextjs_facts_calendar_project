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
    <div className="">
      <ol className="list-decimal mx-5 ">
        {arrayList.map((item, i) => (
          <li key={i} className="text-left px-1 ">
            <div>
              <span className="inline-flex items-baseline justify-center  rounded drop-shadow-lg ">
                {item}
                <button
                  className=" block min-w-[120px] rounded-full border border-white  px-4 text-sm font-bold leading-7 text-gray-600   hover:text-white  mt-4"
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
