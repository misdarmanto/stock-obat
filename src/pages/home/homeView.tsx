import { BsDatabase } from "react-icons/bs";
import MainLayout from "../../layout/mainLayout";

const bgColors = ["bg-teal-500", "bg-blue-500", "bg-indigo-500", "bg-rose-500"];
const obatList = ["obatA 343", "obatB 33", "obatC 65", "obatD 676", "obatE 5445"];

const HomeView = () => {
	return (
		<MainLayout>
			<div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-5">
				{obatList.map((item, index) => {
					console.log(bgColors[index]);
					bgColors.push(bgColors[index]);
					return (
						<CardInfo key={index} className={bgColors[index]}>
							<BsDatabase className="text-white group-hover:text-white mr-3 flex-shrink-0 h-6 w-6" />
							<p className="font-extrabold text-white">{item}</p>
						</CardInfo>
					);
				})}
			</div>
		</MainLayout>
	);
};

const CardInfo = ({ children, className }: { children: any; className?: string }) => (
	<div
		className={` bg-blue-500 w-full md:max-w-xs  sm:mr-2 my-2 sm:my-3 flex p-6 border rounded-lg shadow`}
	>
		{children}
	</div>
);

export default HomeView;
