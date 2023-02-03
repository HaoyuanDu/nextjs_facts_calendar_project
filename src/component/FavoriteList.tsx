type Props = {
  favoriteList: Map<string, string[]>;
};

const convertMapToArray = (props: any) => {
  let favoriteList: Map<string, string[]> = props.favoriteList;

  favoriteList.forEach((value: string[], key: string) => {
    for (let j of value) {
      return <li>{j}</li>;
    }
  });

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
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
};
