import { useSearchParams } from "react-router-dom";

function PageComponent({ pageResponse, changePage }) {
    const { pageNumList, prev, next, prevPage, nextPage } = pageResponse;
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;

    const handlePageChange = (page) => {
        setSearchParams({ page });
        changePage(page);
    };

    return (
        <div className="flex justify-center mt-4 sm:mt-auto">
            <nav aria-label="Table navigation">
                <ul className="flex items-center gap-1 sm:gap-2">
                    {prev && (
                        <li>
                            <button
                                className="px-3 py-2 text-sm text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Previous"
                                onClick={() => handlePageChange(prevPage)}
                            >
                                <svg
                                    className="w-4 h-4 fill-current"
                                    aria-hidden="true"
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

                    {pageNumList.map((num) => (
                        <li key={num}>
                            <button
                                className={`px-3 py-2 min-w-[36px] text-sm font-semibold rounded-lg transition-all 
                  ${
                                    currentPage === num
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-blue-600 border border-blue-500 hover:bg-blue-100"
                                } focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-600`}
                                onClick={() => handlePageChange(num)}
                            >
                                {num}
                            </button>
                        </li>
                    ))}

                    {next && (
                        <li>
                            <button
                                className="px-3 py-2 text-sm text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Next"
                                onClick={() => handlePageChange(nextPage)}
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
        </div>
    );
}

export default PageComponent;
