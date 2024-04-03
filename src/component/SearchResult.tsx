import useFetchFacts, { ErrorProps } from "../hooks/useFetchFacts";

type Props = {
  data: string;
  addFavorite: () => void;
  errors?: ErrorProps | null;
};

export const SearchResult = (props: Props): JSX.Element => {
  return (
    <div className="w-full md:w-[800px] lg:w-[1200px] p-4 flex flex-col text-left  justify-center bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg text-zinc-900 md-overflow-scroll ">
      {props.data ? (
        <div className="inline-flex items-baseline justify-center md:max-w-[1300px] md:px-6 lg:p-6  lg:h-max-[550px]  text-zinc-700 ">
          <span>{props.data}</span>
          <div>
            <button
              className="justify-center block min-w-[110px] rounded-full border border-white  ml-4  text-sm font-bold leading-7 text-gray-600   hover:text-white  "
              onClick={props.addFavorite}
            >
              addFavorite
            </button>
            <label className="label">
              <span className="text-sm text-red-600">
                {props.errors && props.errors.errorType == "duplicateError"
                  ? props.errors.errorMessage
                  : ""}
              </span>
            </label>
          </div>
        </div>
      ) : (
        <div className="inline-flex items-baseline justify-center md:max-w-[1300px] md:px-6 lg:p-6  lg:h-max-[550px]  text-zinc-700 ">
          <span>
            Example: January 1st is the day in 1806 that the French Republican
            Calendar is abolished.
          </span>
          <div>
            <button
              className="justify-center block min-w-[110px] rounded-full border border-white  ml-4  text-sm font-bold leading-7 text-gray-600   hover:text-white  "
              onClick={props.addFavorite}
            >
              addFavorite
            </button>
            <label className="label">
              <span className="text-sm text-red-600">
                {props.errors && props.errors.errorType == "duplicateError"
                  ? props.errors.errorMessage
                  : ""}
              </span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
