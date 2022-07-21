const numberWithCommas = (num: number) => {
	return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default numberWithCommas;
