import Header from './Header/Header.jsx';
import Mainboard from './Mainboard.jsx';

export default function LoggedInView() {
  return (
    <>
      <Header></Header>
      <Mainboard className="flex-1"></Mainboard>
    </>
  );
}
