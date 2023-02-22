import { SuperHedgeTabs } from "../commons/Tabs";
import { useState } from "react";
import { RecapCard } from "../commons/RecapCard";
import { PrimaryButton } from "../basic";
import ItemBuyConfirmDialog from "./ItemBuyConfirmDialog";
import ItemPositionAddedDialog from "./ItemPositionAddedDialog";

const OfferCard = () => {
  return (
    <div className={"flex items-center space-x-3 bg-white h-[90px] rounded-lg py-4 px-5"}>
      <div className={"flex flex-1 items-center h-full space-x-4"}>
        <div className='relative inline-block pr-4 pb-4'>
          <input type='radio' className='form-radio absolute' id='radio1' name='radio-group' />
        </div>
        <div className={"flex flex-col justify-between h-full"}>
          <span className={"bg-clip-text text-transparent bg-primary-gradient text-[20px] leading-[20px]"}>1,010 USDC</span>
          <span className={"text-grey-60 text-[20px] leading-[20px]"}>3 Lots</span>
        </div>
      </div>
      <RecapCard label={"Offer since since"} value={"29 Nov"} />
      <RecapCard label={"Username"} value={"0xa377...CCA5"} />
    </div>
  );
};

export const ProductOffers = () => {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [addedOpen, setAddedOpen] = useState(false);

  return (
    <div>
      <SuperHedgeTabs labels={["LOWEST PRICE", "HIGHEST PRICE"]} tab={tab} setTab={(tab) => setTab(tab)} />
      <div className={"flex flex-col w-full space-y-4 mt-6"}>
        <OfferCard />
        <OfferCard />
        <OfferCard />
        <OfferCard />
        <OfferCard />
        <OfferCard />
      </div>
      <PrimaryButton label={"BUY THIS PRODUCT FOR 1,010 USDC"} className={"mt-7"} onClick={() => setOpen(true)} />

      <ItemBuyConfirmDialog
        open={open}
        setOpen={(open) => setOpen(open)}
        onConfirm={() => {
          setOpen(false);
          setAddedOpen(true);
        }}
      />
      <ItemPositionAddedDialog open={addedOpen} setOpen={(open) => setAddedOpen(open)} />
    </div>
  );
};
