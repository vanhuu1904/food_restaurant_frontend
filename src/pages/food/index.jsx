import { useLocation, useSearchParams } from "react-router-dom";
import ViewDetail from "./ViewDetail";
import { useEffect, useState } from "react";
import { fetchFoodById } from "../../services/api";

const FoodPage = () => {
  let location = useLocation();
  const [dataFood, setDataFood] = useState();
  let params = new URLSearchParams(location.search);
  console;
  const id = params?.get("id"); //* food id
  console.log(">>>> check id: ", id);
  const data = {
    ID: id,
  };
  console.log(">>>> check food id: ", id);
  useEffect(() => {
    fetchFood(data);
  }, [id]);
  const fetchFood = async (foodID) => {
    const res = await fetchFoodById(foodID);
    console.log(">>> check datafood: ", res);
    if (res && res.data) {
      setDataFood(res.data);
    }
  };
  return (
    <>
      <ViewDetail dataFood={dataFood} />
    </>
  );
};

export default FoodPage;
