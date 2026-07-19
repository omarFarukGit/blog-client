import { Button } from "@/components/ui/button";
import { getMe } from "@/services/getMe";

const Home =async () => {
  const user =await await getMe();
  console.log(user)
  return (
    <div>
      Home
      <Button>click</Button>
    </div>
  );
};

export default Home;
