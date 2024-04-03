import { useState, useEffect } from "react";
import { dataBase } from "../constants/dataBase";

export type ErrorProps = {
  errorMessage: string;
  errorType?: string;
};
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const useFetchFacts = () => {
  const [data, setData] = useState("");
  const [factDate, setFactDate] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [favoriteList, setFavoriteList] = useState(dataBase);

  const [errors, setErrors] = useState<ErrorProps | null>();
  const BASE_URL = "http://numbersapi.com/";

  useEffect(() => {
    setFavoriteList(dataBase);
  }, [dataBase]);

  const onSubmit = () => {
    console.log("factDate", factDate);
    if (!factDate) return;
    getFact(factDate);
  };
  const getFact = (date: string) => {
    setLoading(true);

    fetch(`${BASE_URL}${date}/date`, {
      mode: "cors",
      headers: {},
    })
      .then((res) => res.text())
      .then(
        (data) => {
          setData(data);
          setLoading(false);
          setErrors(null);
        },
        (error) => {
          console.log("error", error.typeError);
          setLoading(true);
          setErrors({
            errorType: "fetchError",
            errorMessage:
              "Mixed Content: The page at 'https://haoyuandu.github.io/Facts_Calendar_ReactJs/' was loaded over HTTPS, but requested an insecure resource 'http://numbersapi.com/1/5/date'. This request has been blocked; the content must be served over HTTPS.",
          });
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const setDate = (date: string) => {
    console.log("date", date);
    setFactDate(date);
  };

  const addFavorite = () => {
    console.log("data", data);
    if (!data) {
      setErrors({
        errorType: "duplicateError",
        errorMessage: "Please Serach for facts first",
      });
      return;
    }
    if (dataBase.has(factDate)) {
      const facts = dataBase.get(factDate);
      for (let i of facts!) {
        if (i == data) {
          setErrors({
            errorType: "duplicateError",
            errorMessage: "This fact already exist in the list",
          });
          // setError("This fact already exist in the list");
          return;
        }
      }
      facts!.push(data);
      dataBase.set(factDate, facts!);
    } else {
      dataBase.set(factDate, [data]);
    }
    setFavoriteList(new Map(dataBase));
  };

  const convertDayandMonth = (monthitem: string, day: string) => {
    let date = months.indexOf(monthitem) + 1 + "/" + day.match(/\d/g);
    return date;
  };

  const removeFavorite = (item: string) => {
    const splitedArray = item.split(" ");
    let monnth = splitedArray[0];
    let day = splitedArray[1];
    let date = convertDayandMonth(monnth, day);

    const facts = dataBase.get(date);

    let index = facts!.indexOf(item);

    if (index > -1 && facts!.length > 0) {
      facts!.splice(index, 1);
      dataBase.set(date, facts!);
      setFavoriteList(new Map(dataBase));

      return;
    }

    dataBase.delete(factDate);
    setFavoriteList(new Map(dataBase));
  };
  return {
    data,
    isLoading,
    factDate,
    setDate,
    onSubmit,
    addFavorite,
    removeFavorite,
    favoriteList,
    errors,
  };
};

export default useFetchFacts;
