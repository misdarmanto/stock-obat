import TableStyle from "../../components/tableStyle";
import MainLayout from "../../layout/mainLayout";

const tableData = {
	header: ["title 1", "title 2", "title 3", "title 4", "title 5", "Action"],
	body: [
		["body1", "body2", "body3", "body4", "body5"],
		["body1", "body2", "body3", "body4", "body5"],
	],
};

const StockView = () => {
	return (
		<MainLayout>
			<div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-5">
				<TableStyle tableData={tableData} />
			</div>
		</MainLayout>
	);
};

export default StockView;
