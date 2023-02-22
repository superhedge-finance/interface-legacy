import { useState } from "react";
import { Switch } from "@headlessui/react";
import { PrimaryButton } from "../components/basic";
import useToast from "../hooks/useToast";

const Profile = () => {
  const { showToast } = useToast();
  const [enabled, setEnabled] = useState(false);

  return (
    <div className={"py-[84px] flex justify-center"}>
      <div className={"max-w-[650px] w-full"}>
        <div className={"flex flex-col items-center w-full bg-white rounded-[16px]"}>
          <div className={"relative w-full h-[230px] rounded-[16px] bg-dark-gradient"}>
            <img src={"/profile/banner.svg"} alt={"profile banner"} className={"absolute right-0 top-0"} />
            {/*<div className={'bg-conic-gradient w-full h-full rounded-[16px]'} style={{backgroundBlendMode: 'hue, normal', left: '-1px'}}>
                        </div>*/}
            <span className={"text-[44px] leading-[44px] text-whitenew-100 absolute left-[45px] bottom-[40px] max-w-[300px]"}>
              Your profile settings
            </span>
          </div>
          <div className={"flex flex-col w-full px-[80px] py-[56px]"}>
            <span className={"text-grey-80 text-[16px] leading-[16px]"}>Username</span>
            <input className={"mt-2 py-3 px-4 bg-[#FBFBFB] border border-[1px] border-[#E6E6E6] rounded-lg"} placeholder={"Username"} />
            <span className={"mt-2 text-error text-[12px] leading-[12px]"}>This username is already taken. Try other</span>

            <span className={"mt-6 text-grey-80 text-[16px] leading-[16px]"}>Email</span>
            <input className={"mt-2 py-3 px-4 bg-[#FBFBFB] border border-[1px] border-[#E6E6E6] rounded-lg"} placeholder={"Email"} />

            <div className={"flex items-center justify-between mt-7"}>
              <span className={"uppercase text-blacknew-100 text-[16px] leading-[16px]"}>Subscribe for newsletter</span>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? "bg-blue-600" : "bg-gray-200"} relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className='sr-only'>Enable notifications</span>
                <span
                  className={`${
                    enabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>

            <PrimaryButton
              label={"SAVE"}
              className={"mt-10 max-w-[220px]"}
              onClick={() => showToast("PROFILE CHANGES SUCCESSFULLY SAVED")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
