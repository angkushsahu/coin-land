import ReactPaginate from "react-paginate";

interface PaginateCoinListProps {
	handleSearch: () => any[];
	handlePageChange: (selectedItem: { selected: number }) => void;
}

const PaginateCoinList = ({ handleSearch, handlePageChange }: PaginateCoinListProps) => {
	return (
		<div className="overflow-x-auto mt-16 flex items-center justify-center">
			<ReactPaginate
				breakLabel=" . . . "
				previousLabel=" < "
				nextLabel=" > "
				pageCount={Number((handleSearch()?.length / 10).toFixed(0))}
				pageRangeDisplayed={1}
				onPageChange={handlePageChange}
				containerClassName={"w-fit flex items-center justify-center sm:gap-4"}
				previousClassName={"paginationLiTags rounded-l-md"}
				nextClassName={"paginationLiTags rounded-r-md"}
				pageClassName={"paginationLiTags"}
				breakClassName={"paginationLiTags"}
				previousLinkClassName={"paginationATags"}
				nextLinkClassName={"paginationATags"}
				breakLinkClassName={"paginationATags"}
				pageLinkClassName={"paginationATags"}
				disabledClassName={"bg-gray-700 border-none cursor-default"}
				disabledLinkClassName={"text-gray-400 cursor-default"}
				activeClassName={"bg-yellow-500"}
				activeLinkClassName={"text-[#001e3c]"}
			/>
		</div>
	);
};

export default PaginateCoinList;
