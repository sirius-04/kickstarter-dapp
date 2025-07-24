import ConnectWallet from "../ConnectWallet/ConnectWallet";

export default function Header() {
  return (
    <nav className="bg-primary">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <h1 className="text-primary-foreground">KICKSTARTER</h1>
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
            {/* <li>
              <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
            </li> */}
            <li><ConnectWallet /></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}