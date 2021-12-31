export default function Footer() {
  return (
    <footer className="flex justify-center px-4 text-gray-800 bg-white">
      <div className="container py-6">
        <hr className="h-px mt-6 border-gray-300 border-none" />

        <div className="flex flex-col items-center justify-between mt-6 md:flex-row">
          <div>
            <a
              href="#"
              className="text-xl font-bold text-gray-800  hover:text-gray-700 "
            >
              Brand
            </a>
          </div>

          <div className="flex mt-4 md:m-0">
            <div className="-mx-4">
              <a
                href="#"
                className="px-4 text-sm font-medium text-gray-800  hover:text-gray-700  hover:underline"
              >
                About
              </a>
              <a
                href="#"
                className="px-4 text-sm font-medium text-gray-800  hover:text-gray-700  hover:underline"
              >
                Blog
              </a>
              <a
                href="#"
                className="px-4 text-sm font-medium text-gray-800  hover:text-gray-700  hover:underline"
              >
                News
              </a>
              <a
                href="#"
                className="px-4 text-sm font-medium text-gray-800  hover:text-gray-700  hover:underline"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
