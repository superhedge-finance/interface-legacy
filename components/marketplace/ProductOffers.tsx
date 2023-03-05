import { useMemo, useState } from "react";
import { SuperHedgeTabs } from "../commons/Tabs";
import { RecapCard } from "../commons/RecapCard";
import { PrimaryButton } from "../basic";
import ItemBuyConfirmDialog from "./ItemBuyConfirmDialog";
import ItemPositionAddedDialog from "./ItemPositionAddedDialog";
import { OfferType } from "../../types";
import { truncateAddress } from "../../utils/helpers";

const OfferCard = ({ offer, value, onValueChange }: { offer: OfferType; value: number; onValueChange: (id: number) => void }) => {
  return (
    <div className={"flex items-center space-x-3 bg-white h-[90px] rounded-lg py-4 px-5"}>
      <div className={"flex flex-1 items-center h-full space-x-4"}>
        <div className='relative inline-block pr-4 pb-4'>
          <input
            type='radio'
            className='form-radio absolute'
            id='radio1'
            name='radio-group'
            checked={offer.id === value}
            onChange={() => onValueChange(offer.id)}
          />
        </div>
        <div className={"flex flex-col justify-between h-full"}>
          <span className={"bg-clip-text text-transparent bg-primary-gradient text-[20px] leading-[20px]"}>
            {offer.price.toLocaleString()} USDC
          </span>
          <span className={"text-grey-60 text-[20px] leading-[20px]"}>{offer.quantity} Lots</span>
        </div>
      </div>
      <RecapCard
        label={"Offer start since"}
        value={new Date(offer.startingTime * 1000).toLocaleDateString("default", { day: "numeric", month: "short" })}
      />
      <RecapCard label={"Username"} value={truncateAddress(offer.seller, 4)} />
    </div>
  );
};

export const ProductOffers = ({ offers, listingId }: { offers: OfferType[]; listingId: string }) => {
  const [offerId, setOfferId] = useState<number>(0);
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [addedOpen, setAddedOpen] = useState(false);

  const onValueChange = (id: number) => {
    setOfferId(id);
  };

  const offer = useMemo(() => {
    return offers.find((offer) => offer.id === offerId);
  }, [offers, offerId]);

  return (
    <div>
      <SuperHedgeTabs labels={["LOWEST PRICE", "HIGHEST PRICE"]} tab={tab} setTab={(tab) => setTab(tab)} />
      <div className={"flex flex-col w-full space-y-4 mt-6"}>
        {offers.map((offer, index) => {
          return <OfferCard key={index} offer={offer} value={offerId} onValueChange={onValueChange} />;
        })}
      </div>
      <PrimaryButton
        label={`BUY THIS PRODUCT FOR ${offer ? (offer.quantity * offer.price).toLocaleString() : 0} USDC`}
        className={"mt-7"}
        disabled={!offer}
        onClick={() => setOpen(true)}
      />

      {offer && (
        <ItemBuyConfirmDialog
          open={open}
          offer={offer}
          listingId={listingId}
          setOpen={(open) => setOpen(open)}
          afterConfirm={(success) => {
            setOpen(false);
            if (success) setAddedOpen(true);
          }}
        />
      )}
      <ItemPositionAddedDialog open={addedOpen} setOpen={(open) => setAddedOpen(open)} />
    </div>
  );
};
