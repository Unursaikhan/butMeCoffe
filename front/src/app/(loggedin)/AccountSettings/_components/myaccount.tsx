import { EditPaymentDetails } from "./editPayment";
import { ChangeSuccessMessage } from "./editSuccessMessage";
import { EditProfileForm } from "./PersonalInfo";
import { SetNewPassword } from "./SetANewPassword";

export const MyAccount = () => {
  return (
    <div className="w-[650px] h-[850px] overflow-y-auto px-6 pr-4 flex flex-col gap-8">
      <h1 className="font-semibold text-[24px]">My account</h1>
      <EditProfileForm />
      <SetNewPassword />
      <EditPaymentDetails />
      <ChangeSuccessMessage />
    </div>
  );
};
