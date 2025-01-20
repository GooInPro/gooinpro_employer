
const makeArr = (from, to) => {

  let arr = []

  for (let i = from; i <= to ; i++) {
    arr.push(i)
  }

  return arr
}

function PageComponent({ pageResponse, changePage }) {
  const {
    pageNumList,
    prev,
    next,
    prevPage,
    nextPage,
    current
  } = pageResponse;

  return (
      <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
      <nav aria-label="Table navigation">
        <ul className="inline-flex items-center">
          {prev && (
              <li>
                <button
                    className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Previous"
                    onClick={() => changePage(prevPage)}
                >
                  <svg
                      aria-hidden="true"
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                  >
                    <path
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
          )}

          {pageNumList.map(num => (
              <li
                  key={num}
                  className={`mx-1 px-4 py-2 text-sm font-semibold border rounded-md 
                ${current === num
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-green-500 border-green-500 hover:bg-green-600 hover:text-white'
                  } 
              focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out`}
                  onClick={() => changePage(num)}
              >
                {num}
              </li>
          ))}

          {next && (
              <li>
                <button
                    className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                    aria-label="Next"
                    onClick={() => changePage(nextPage)}
                >
                  <svg
                      className="w-4 h-4 fill-current"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                  >
                    <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
          )}
        </ul>
      </nav>
    </span>
  );
}

export default PageComponent;