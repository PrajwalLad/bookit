import React, { useEffect, useState } from "react";
import ListCards from "../components/ListCards";
import API from "../api/axios.js";
import Navbar from "../components/Navbar.jsx"

const Homepage = () => {
  const [expArr, setExpArr] = useState([]);
  const fetchExperiences = async () => {
    const res = await API.get("/experiences");
    setExpArr(res.data.data);
  };
  useEffect(() => {
    fetchExperiences();
  }, []);
  return (
    <>
    <Navbar/>
    <div className="px-24 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {expArr.length > 0 &&
          expArr.map((exp) => {
            return <ListCards
              key={exp?._id}
              image={exp?.image}
              title={exp?.title}
              location={exp?.location}
              description={exp?.description}
              price={exp?.price}
              id={exp?._id}
            />;
          })}
      </div>
    </div>
    </>
  );
};

export default Homepage;
