import { NextPage } from "next";
import { useUserIp } from "utils/useUserIp";

const HomePage: NextPage = () => {
  const ip = useUserIp();

  console.log("user ip", ip);

  return (
    <div className="container">
      <p>Your ip: {ip}</p>
    </div>
  );
};

export default HomePage;
