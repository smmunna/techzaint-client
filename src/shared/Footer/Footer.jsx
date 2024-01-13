import { Facebook, YouTube } from '@mui/icons-material';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <footer className="bg-neutral-100 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left">
      <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-neutral-500 lg:justify-between">
        <div className="mr-12 hidden lg:block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="flex justify-center">
          <a href="#!" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <Facebook />
          </a>
          <a href="#!" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <TwitterIcon />
          </a>
          <a href="#!" className="mr-6 text-neutral-600 dark:text-neutral-200">
            <YouTube />
          </a>
          {/* Add other social network icons here */}
        </div>
      </div>

      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* TW elements section */}
          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-3 h-4 w-4">
                <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
              </svg>
              Tech Zaint
            </h6>
            <p>
              Our software is a dynamic web platform seamlessly integrating blogging, Q&A, and e-commerce.
            </p>
          </div>
          {/* Add other sections (Products, Useful links, and Contact) */}
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Products
            </h6>
            <p className="mb-4">
              <a href="#!" className="text-neutral-600 dark:text-neutral-200">Software</a>
            </p>
            <p className="mb-4">
              <a href="#!" className="text-neutral-600 dark:text-neutral-200">Books</a>
            </p>
           
          </div>
          {/* Useful links section */}
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Useful links
            </h6>
            <p className="mb-4">
              <a href="#!" className="text-neutral-600 dark:text-neutral-200">Pricing</a>
            </p>
            <p className="mb-4">
              <a href="#!" className="text-neutral-600 dark:text-neutral-200">Shop Now</a>
            </p>
          </div>
          {/* Contact section */}
          <div>
            <h6 className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Contact
            </h6>
            <p className="mb-4 flex items-center justify-center md:justify-start">
              123 Street, City, Country
            </p>
            <p className="mb-4">
              <a href="tel:+123456789" className="text-neutral-600 dark:text-neutral-200">
                +1 234-567-89
              </a>
            </p>
            <p>
              <a href="mailto:info@example.com" className="text-neutral-600 dark:text-neutral-200">
                info@example.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-neutral-200 p-6 text-center dark:bg-neutral-700">
        <span>© 2023 Copyright:</span>
        <a className="font-semibold text-neutral-600 dark:text-neutral-400" href="https://techzaint.com/">
          Tech Zaint
        </a>
      </div>
    </footer>
  );
};

export default Footer;
