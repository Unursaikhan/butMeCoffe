import { AllDonation } from "./allDonations";
import { MyDontaions } from "./myDonttaions";

export const DonationField = () => {
  return (
    <div className="flex flex-col gap-6 px-6 h-[860px] flex-1">
      <MyDontaions />
      <AllDonation />
    </div>
  );
};
