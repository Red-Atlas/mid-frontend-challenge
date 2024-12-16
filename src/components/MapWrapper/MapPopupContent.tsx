import { MaterialSymbolsCloseSmallRounded } from "../Icons";
import Button from "../ui/button";

interface MapPopupContentProps {
  title: string;
  price: string;
  onClose: () => void;
}

export default function MapPopupContent({
  title,
  price,
  onClose,
}: MapPopupContentProps) {
  return (
    <>
      <header className="flex items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <Button
          onClick={onClose}
          variant="secondary"
          className="p-1 w-16 aspect-square"
        >
          <MaterialSymbolsCloseSmallRounded className="h-full w-full" />
        </Button>
      </header>
      <div>
        <p className="text-sm text-gray-600 mb-2">{price}</p>
      </div>
    </>
  );
}
